
import { Component, ChangeDetectionStrategy, input, output, effect, signal, inject, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './window.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mousedown)': 'onFocus()',
    '[style.zIndex]': 'zIndex()',
    '[style.width.px]': 'size().width',
    '[style.height.px]': 'size().height',
    '[class.is-closing]': 'isClosing()',
    '[class.is-maximized]': 'isMaximized()',
    'class': 'rounded-lg border border-[--panel-border] bg-[--bg-panel] shadow-lg flex flex-col overflow-hidden absolute',
    '[style.top.px]': 'position().y',
    '[style.left.px]': 'position().x',
  }
})
export class WindowComponent implements OnDestroy {
  // Injected services
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);

  // Inputs & Outputs
  title = input<string>('Window');
  initialSize = input<{ width: number, height: number }>();
  initialPosition = input<{ x: number, y: number }>();
  zIndex = input<number>(10);
  isMaximized = input<boolean>(false);
  isClosing = input<boolean>(false);
  positionChange = output<{ x: number; y: number }>();
  close = output<void>();
  focus = output<void>();
  toggleMaximize = output<void>();
  sizeChange = output<{ width: number; height: number }>();

  // State
  size = signal({ width: 500, height: 400 });
  position = signal({ x: 50, y: 50 });
  
  // Interaction state
  private isDragging = false;
  private isResizing = false;
  private dragOffset = { x: 0, y: 0 };
  private resizeStart = { x: 0, y: 0, width: 0, height: 0 };
  private unlistenMouseMove: (() => void) | null = null;
  private unlistenMouseUp: (() => void) | null = null;

  constructor() {
    effect(() => {
      this.size.set(this.initialSize() ?? { width: 500, height: 400 });
    });
    effect(() => {
      this.position.set(this.initialPosition() ?? { x: 50, y: 50 });
    });
  }
  
  ngOnDestroy(): void {
    this.removeGlobalListeners();
  }

  onFocus() {
    this.focus.emit();
  }

  onClose(event: MouseEvent) {
    event.stopPropagation();
    this.close.emit();
  }
  
  onMaximize(event: MouseEvent) {
    event.stopPropagation();
    this.toggleMaximize.emit();
  }

  onDragStart(event: MouseEvent) {
    if (this.isMaximized() || event.button !== 0 || (event.target as HTMLElement).closest('button')) return;
    event.preventDefault();
    this.isDragging = true;
    this.focus.emit();

    const currentPosition = this.position();
    this.dragOffset = {
      x: event.clientX - currentPosition.x,
      y: event.clientY - currentPosition.y
    };

    this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', this.onDragMove.bind(this));
    this.unlistenMouseUp = this.renderer.listen('document', 'mouseup', this.onDragEnd.bind(this));
  }

  private onDragMove(event: MouseEvent) {
    if (!this.isDragging) return;

    const parent = this.elementRef.nativeElement.parentElement;
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const elemRect = this.elementRef.nativeElement.getBoundingClientRect();

    let newX = event.clientX - this.dragOffset.x;
    let newY = event.clientY - this.dragOffset.y;
    
    // Constrain to viewport
    newX = Math.max(12, Math.min(newX, parentRect.width - elemRect.width - 12));
    newY = Math.max(48, Math.min(newY, parentRect.height - elemRect.height));

    this.position.set({ x: newX, y: newY });
  }

  private onDragEnd() {
    this.isDragging = false;
    this.removeGlobalListeners();
    this.positionChange.emit(this.position());
  }
  
  onResizeStart(event: MouseEvent) {
    if (this.isMaximized()) return;
    event.stopPropagation();
    event.preventDefault();
    this.isResizing = true;
    this.focus.emit();

    const currentSize = this.size();
    this.resizeStart = {
      x: event.clientX,
      y: event.clientY,
      width: currentSize.width,
      height: currentSize.height
    };

    this.unlistenMouseMove = this.renderer.listen('document', 'mousemove', this.onResizeMove.bind(this));
    this.unlistenMouseUp = this.renderer.listen('document', 'mouseup', this.onResizeEnd.bind(this));
  }
  
  private onResizeMove(event: MouseEvent) {
    if (!this.isResizing) return;

    const dx = event.clientX - this.resizeStart.x;
    const dy = event.clientY - this.resizeStart.y;
    
    const newWidth = Math.min(window.innerWidth - this.position().x - 12, Math.max(MIN_WIDTH, this.resizeStart.width + dx));
    const newHeight = Math.min(window.innerHeight - this.position().y - 92, Math.max(MIN_HEIGHT, this.resizeStart.height + dy));

    this.size.set({ width: newWidth, height: newHeight });
  }
  
  private onResizeEnd() {
    this.isResizing = false;
    this.removeGlobalListeners();
    this.sizeChange.emit(this.size());
  }
  
  private removeGlobalListeners() {
    if (this.unlistenMouseMove) {
      this.unlistenMouseMove();
      this.unlistenMouseMove = null;
    }
    if (this.unlistenMouseUp) {
      this.unlistenMouseUp();
      this.unlistenMouseUp = null;
    }
  }
}