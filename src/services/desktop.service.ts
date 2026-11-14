import { Injectable, signal, computed, inject, DestroyRef, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LanguageService } from './language.service';

type Point={x:number;y:number};
type Size={width:number;height:number};
export interface WindowInstance {
 id:string;title:string;componentName:string;isOpen:boolean;position:Point;size:Size;zIndex:number;
 isMaximized?:boolean;preMaximizePosition?:Point;preMaximizeSize?:Size;isClosing?:boolean;
}
type WindowState=Omit<WindowInstance,'title'>;
@Injectable({providedIn:'root'})
export class DesktopService {
 private readonly platformId=inject(PLATFORM_ID);
 private readonly language=inject(LanguageService);
 private readonly destroyRef=inject(DestroyRef);
 readonly isMobile=signal(false);
 readonly screenMode=signal<'desktop'|'tablet'|'mobile'>('desktop');
 private readonly state=signal<WindowState[]>([]);
 private readonly closingTimers=new Map<string,ReturnType<typeof setTimeout>>();
 readonly windows=computed(()=>this.state().map(win=>({...win,title:this.language.translations().windowTitles[win.id as keyof ReturnType<typeof this.language.translations>['windowTitles']]})));
 readonly hasOpenWindows=computed(()=>this.state().some(w=>w.isOpen));
 constructor(){
  const definitions=[['about','AboutComponent'],['experience','ExperienceComponent'],['skills','SkillsComponent'],['videogames','ProjectsComponent'],['education','EducationComponent'],['contact','ContactComponent']];
  this.state.set(definitions.map(([id,componentName],i)=>({id,componentName,isOpen:id==='about'||id==='skills',position:{x:24,y:48},size:{width:500,height:500},zIndex:10+i,isMaximized:false,isClosing:false})));
  if(isPlatformBrowser(this.platformId)){
   this.setScreenMode();
   this.state.update(windows=>windows.map(w=>({...w,...this.initialGeometry(w.id)})));
   const resize=()=>{
    const wasMobile=this.isMobile();
    this.setScreenMode();
    if(!this.isMobile()) this.state.update(windows=>windows.map(w=>{
     if(wasMobile)return {...w,...this.initialGeometry(w.id),isMaximized:false};
     const geometry=w.isMaximized
      ?this.clamp(w.preMaximizePosition??w.position,w.preMaximizeSize??w.size)
      :this.clamp(w.position,w.size);
     return w.isMaximized?{...w,preMaximizePosition:geometry.position,preMaximizeSize:geometry.size}:{...w,...geometry};
    }));
   };
   window.addEventListener('resize',resize);
   this.destroyRef.onDestroy(()=>{window.removeEventListener('resize',resize);for(const timer of this.closingTimers.values())clearTimeout(timer);});
  }
 }
 private setScreenMode(){
  this.isMobile.set(window.innerWidth<768);
  this.screenMode.set(window.innerWidth<768?'mobile':window.innerWidth<1200?'tablet':'desktop');
 }
 private initialGeometry(id:string){
  const width=window.innerWidth;
  const height=Math.max(200,window.innerHeight-150);
  const gap=20;
  const leftWidth=Math.floor((width-gap*3)*.46);
  if(id==='about')return this.clamp({x:gap,y:48},{width:leftWidth,height});
  if(id==='skills')return this.clamp({x:gap*2+leftWidth,y:56},{width:width-leftWidth-gap*3,height:Math.max(260,Math.floor(height*.64))});
  const offset=['experience','videogames','education','contact'].indexOf(id)*24;
  return this.clamp({x:Math.max(gap,(width-700)/2)+offset,y:64+offset},{width:Math.min(760,width-80),height:Math.min(660,height-24)});
 }
 private clamp(position:Point,size:Size){
  const maxWidth=Math.max(1,window.innerWidth-24);
  const maxHeight=Math.max(1,window.innerHeight-140);
  const boundedSize={width:Math.min(maxWidth,Math.max(Math.min(300,maxWidth),size.width)),height:Math.min(maxHeight,Math.max(Math.min(200,maxHeight),size.height))};
  return {size:boundedSize,position:{x:Math.max(12,Math.min(position.x,window.innerWidth-boundedSize.width-12)),y:Math.max(48,Math.min(position.y,window.innerHeight-92-boundedSize.height))}};
 }
 private top(){return Math.max(10,...this.state().map(w=>w.zIndex));}
 toggleWindow(id:string){
  const win=this.state().find(w=>w.id===id);
  if(!win)return;
  if(win.isOpen&&!win.isClosing){this.closeWindow(id);return;}
  const timer=this.closingTimers.get(id);if(timer)clearTimeout(timer);this.closingTimers.delete(id);
  const geometry=isPlatformBrowser(this.platformId)&&!this.isMobile()?this.clamp(win.position,win.size):{position:win.position,size:win.size};
  const zIndex=this.top()+1;
  this.state.update(windows=>windows.map(w=>w.id===id?{...w,...geometry,isOpen:true,isClosing:false,isMaximized:false,zIndex}:w));
 }
 closeWindow(id:string){
  if(!this.state().some(w=>w.id===id&&w.isOpen&&!w.isClosing))return;
  this.state.update(windows=>windows.map(w=>w.id===id?{...w,isClosing:true}:w));
  const timer=setTimeout(()=>{
   this.state.update(windows=>windows.map(w=>w.id===id?{...w,isOpen:false,isClosing:false,isMaximized:false}:w));
   this.closingTimers.delete(id);
  },200);this.closingTimers.set(id,timer);
 }
 focusWindow(id:string){const zIndex=this.top()+1;this.state.update(windows=>windows.map(w=>w.id===id&&w.isOpen?{...w,zIndex}:w));}
 toggleMaximize(id:string){
  this.state.update(windows=>windows.map(w=>{
   if(w.id!==id||!w.isOpen)return w;
   return w.isMaximized?{...w,isMaximized:false,...this.clamp(w.preMaximizePosition??w.position,w.preMaximizeSize??w.size)}:{...w,isMaximized:true,preMaximizePosition:{...w.position},preMaximizeSize:{...w.size}};
  }));this.focusWindow(id);
 }
 updateWindowSize(id:string,size:Size){this.state.update(windows=>windows.map(w=>w.id===id?{...w,...this.clamp(w.position,size)}:w));}
 updateWindowPosition(id:string,position:Point){this.state.update(windows=>windows.map(w=>w.id===id?{...w,...this.clamp(position,w.size)}:w));}
}
