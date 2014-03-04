(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function inherit() {}; inherit.prototype = from; var proto = new inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var ApplicationMain = function() { }
$hxClasses["ApplicationMain"] = ApplicationMain;
ApplicationMain.__name__ = ["ApplicationMain"];
ApplicationMain.main = function() {
	ApplicationMain.completed = 0;
	ApplicationMain.loaders = new haxe.ds.StringMap();
	ApplicationMain.urlLoaders = new haxe.ds.StringMap();
	ApplicationMain.total = 0;
	flash.Lib.get_current().loaderInfo = flash.display.LoaderInfo.create(null);
	try {
		if(Reflect.hasField(js.Browser.window,"winParameters")) flash.Lib.get_current().loaderInfo.parameters = (Reflect.field(js.Browser.window,"winParameters"))();
		flash.Lib.get_current().get_stage().loaderInfo = flash.Lib.get_current().loaderInfo;
	} catch( e ) {
	}
	ApplicationMain.preloader = new com.haxepunk.Preloader();
	flash.Lib.get_current().addChild(ApplicationMain.preloader);
	ApplicationMain.preloader.onInit();
	var loader = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/preloader/haxepunk.png",loader);
	ApplicationMain.total++;
	var loader1 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_hidden.png",loader1);
	ApplicationMain.total++;
	var loader2 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_output.png",loader2);
	ApplicationMain.total++;
	var loader3 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_pause.png",loader3);
	ApplicationMain.total++;
	var loader4 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_step.png",loader4);
	ApplicationMain.total++;
	var loader5 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_debug.png",loader5);
	ApplicationMain.total++;
	var loader6 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_logo.png",loader6);
	ApplicationMain.total++;
	var loader7 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_play.png",loader7);
	ApplicationMain.total++;
	var loader8 = new flash.display.Loader();
	ApplicationMain.loaders.set("gfx/debug/console_visible.png",loader8);
	ApplicationMain.total++;
	var loader9 = new flash.display.Loader();
	ApplicationMain.loaders.set("graphics/particle.png",loader9);
	ApplicationMain.total++;
	var resourcePrefix = "__ASSET__:bitmap_";
	var _g = 0, _g1 = haxe.Resource.listNames();
	while(_g < _g1.length) {
		var resourceName = _g1[_g];
		++_g;
		if(StringTools.startsWith(resourceName,resourcePrefix)) {
			var type = Type.resolveClass(StringTools.replace(resourceName.substring(resourcePrefix.length),"_","."));
			if(type != null) {
				ApplicationMain.total++;
				var instance = Type.createInstance(type,[0,0,true,16777215,ApplicationMain.bitmapClass_onComplete]);
			}
		}
	}
	if(ApplicationMain.total == 0) ApplicationMain.begin(); else {
		var $it0 = ApplicationMain.loaders.keys();
		while( $it0.hasNext() ) {
			var path = $it0.next();
			var loader10 = ApplicationMain.loaders.get(path);
			loader10.contentLoaderInfo.addEventListener("complete",ApplicationMain.loader_onComplete);
			loader10.load(new flash.net.URLRequest(path));
		}
		var $it1 = ApplicationMain.urlLoaders.keys();
		while( $it1.hasNext() ) {
			var path = $it1.next();
			var urlLoader = ApplicationMain.urlLoaders.get(path);
			urlLoader.addEventListener("complete",ApplicationMain.loader_onComplete);
			urlLoader.load(new flash.net.URLRequest(path));
		}
	}
}
ApplicationMain.begin = function() {
	ApplicationMain.preloader.addEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	ApplicationMain.preloader.onLoaded();
}
ApplicationMain.bitmapClass_onComplete = function(instance) {
	ApplicationMain.completed++;
	var classType = Type.getClass(instance);
	classType.preload = instance;
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.loader_onComplete = function(event) {
	ApplicationMain.completed++;
	ApplicationMain.preloader.onUpdate(ApplicationMain.completed,ApplicationMain.total);
	if(ApplicationMain.completed == ApplicationMain.total) ApplicationMain.begin();
}
ApplicationMain.preloader_onComplete = function(event) {
	ApplicationMain.preloader.removeEventListener(flash.events.Event.COMPLETE,ApplicationMain.preloader_onComplete);
	flash.Lib.get_current().removeChild(ApplicationMain.preloader);
	ApplicationMain.preloader = null;
	if(Reflect.field(Main,"main") == null) {
		var mainDisplayObj = Type.createInstance(DocumentClass,[]);
		if(js.Boot.__instanceof(mainDisplayObj,flash.display.DisplayObject)) flash.Lib.get_current().addChild(mainDisplayObj);
	} else Reflect.field(Main,"main").apply(Main,[]);
}
var flash = {}
flash.events = {}
flash.events.IEventDispatcher = function() { }
$hxClasses["flash.events.IEventDispatcher"] = flash.events.IEventDispatcher;
flash.events.IEventDispatcher.__name__ = ["flash","events","IEventDispatcher"];
flash.events.IEventDispatcher.prototype = {
	__class__: flash.events.IEventDispatcher
}
flash.events.EventDispatcher = function(target) {
	if(target != null) this.__target = target; else this.__target = this;
	this.__eventMap = [];
};
$hxClasses["flash.events.EventDispatcher"] = flash.events.EventDispatcher;
flash.events.EventDispatcher.__name__ = ["flash","events","EventDispatcher"];
flash.events.EventDispatcher.__interfaces__ = [flash.events.IEventDispatcher];
flash.events.EventDispatcher.compareListeners = function(l1,l2) {
	return l1.mPriority == l2.mPriority?0:l1.mPriority > l2.mPriority?-1:1;
}
flash.events.EventDispatcher.prototype = {
	willTrigger: function(type) {
		return this.hasEventListener(type);
	}
	,toString: function() {
		return "[ " + this.__name__ + " ]";
	}
	,setList: function(type,list) {
		this.__eventMap[type] = list;
	}
	,removeEventListener: function(type,listener,inCapture) {
		if(inCapture == null) inCapture = false;
		if(!this.existList(type)) return;
		var list = this.getList(type);
		var capture = inCapture == null?false:inCapture;
		var _g1 = 0, _g = list.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(list[i].Is(listener,capture)) {
				list.splice(i,1);
				return;
			}
		}
	}
	,hasEventListener: function(type) {
		return this.existList(type);
	}
	,getList: function(type) {
		return this.__eventMap[type];
	}
	,existList: function(type) {
		return this.__eventMap != null && this.__eventMap[type] != undefined;
	}
	,dispatchEvent: function(event) {
		if(event.target == null) event.target = this.__target;
		var capture = event.eventPhase == flash.events.EventPhase.CAPTURING_PHASE;
		if(this.existList(event.type)) {
			var list = this.getList(event.type);
			var idx = 0;
			while(idx < list.length) {
				var listener = list[idx];
				if(listener.mUseCapture == capture) {
					listener.dispatchEvent(event);
					if(event.__getIsCancelledNow()) return true;
				}
				if(idx < list.length && listener != list[idx]) {
				} else idx++;
			}
			return true;
		}
		return false;
	}
	,addEventListener: function(type,inListener,useCapture,inPriority,useWeakReference) {
		if(useWeakReference == null) useWeakReference = false;
		if(inPriority == null) inPriority = 0;
		if(useCapture == null) useCapture = false;
		var capture = useCapture == null?false:useCapture;
		var priority = inPriority == null?0:inPriority;
		var list = this.getList(type);
		if(!this.existList(type)) {
			list = [];
			this.setList(type,list);
		}
		list.push(new flash.events.Listener(inListener,capture,priority));
		list.sort(flash.events.EventDispatcher.compareListeners);
	}
	,__class__: flash.events.EventDispatcher
}
flash.display = {}
flash.display.IBitmapDrawable = function() { }
$hxClasses["flash.display.IBitmapDrawable"] = flash.display.IBitmapDrawable;
flash.display.IBitmapDrawable.__name__ = ["flash","display","IBitmapDrawable"];
flash.display.IBitmapDrawable.prototype = {
	__class__: flash.display.IBitmapDrawable
}
flash.display.DisplayObject = function() {
	flash.events.EventDispatcher.call(this,null);
	this.___id = flash.utils.Uuid.uuid();
	this.set_parent(null);
	this.set_transform(new flash.geom.Transform(this));
	this.__x = 0.0;
	this.__y = 0.0;
	this.__scaleX = 1.0;
	this.__scaleY = 1.0;
	this.__rotation = 0.0;
	this.__width = 0.0;
	this.__height = 0.0;
	this.set_visible(true);
	this.alpha = 1.0;
	this.__filters = new Array();
	this.__boundsRect = new flash.geom.Rectangle();
	this.__scrollRect = null;
	this.__mask = null;
	this.__maskingObj = null;
	this.set___combinedVisible(this.get_visible());
};
$hxClasses["flash.display.DisplayObject"] = flash.display.DisplayObject;
flash.display.DisplayObject.__name__ = ["flash","display","DisplayObject"];
flash.display.DisplayObject.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.DisplayObject.__super__ = flash.events.EventDispatcher;
flash.display.DisplayObject.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__srUpdateDivs: function() {
		var gfx = this.__getGraphics();
		if(gfx == null || this.parent == null) return;
		if(this.__scrollRect == null) {
			if(this._srAxes != null && gfx.__surface.parentNode == this._srAxes && this._srWindow.parentNode != null) this._srWindow.parentNode.replaceChild(gfx.__surface,this._srWindow);
			return;
		}
		if(this._srWindow == null) {
			this._srWindow = js.Browser.document.createElement("div");
			this._srAxes = js.Browser.document.createElement("div");
			this._srWindow.style.setProperty("position","absolute","");
			this._srWindow.style.setProperty("left","0px","");
			this._srWindow.style.setProperty("top","0px","");
			this._srWindow.style.setProperty("width","0px","");
			this._srWindow.style.setProperty("height","0px","");
			this._srWindow.style.setProperty("overflow","hidden","");
			this._srAxes.style.setProperty("position","absolute","");
			this._srAxes.style.setProperty("left","0px","");
			this._srAxes.style.setProperty("top","0px","");
			this._srWindow.appendChild(this._srAxes);
		}
		var pnt = this.parent.localToGlobal(new flash.geom.Point(this.get_x(),this.get_y()));
		this._srWindow.style.left = pnt.x + "px";
		this._srWindow.style.top = pnt.y + "px";
		this._srWindow.style.width = this.__scrollRect.width + "px";
		this._srWindow.style.height = this.__scrollRect.height + "px";
		this._srAxes.style.left = -pnt.x - this.__scrollRect.x + "px";
		this._srAxes.style.top = -pnt.y - this.__scrollRect.y + "px";
		if(gfx.__surface.parentNode != this._srAxes && gfx.__surface.parentNode != null) {
			gfx.__surface.parentNode.insertBefore(this._srWindow,gfx.__surface);
			flash.Lib.__removeSurface(gfx.__surface);
			this._srAxes.appendChild(gfx.__surface);
		}
	}
	,__getSrWindow: function() {
		return this._srWindow;
	}
	,set_width: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var w = this.__boundsRect.width;
		if(this.__scaleX * w != inValue) {
			if(w == 0) {
				this.__scaleX = 1;
				this.__invalidateMatrix(true);
				this.___renderFlags |= 64;
				if(this.parent != null) this.parent.___renderFlags |= 64;
				w = this.__boundsRect.width;
			}
			if(w <= 0) return 0;
			this.__scaleX = inValue / w;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_width: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.__width;
	}
	,set_y: function(inValue) {
		if(this.__y != inValue) {
			this.__y = inValue;
			this.__invalidateMatrix(true);
			if(this.parent != null) this.parent.__invalidateBounds();
		}
		return inValue;
	}
	,get_y: function() {
		return this.__y;
	}
	,set_x: function(inValue) {
		if(this.__x != inValue) {
			this.__x = inValue;
			this.__invalidateMatrix(true);
			if(this.parent != null) this.parent.__invalidateBounds();
		}
		return inValue;
	}
	,get_x: function() {
		return this.__x;
	}
	,set_visible: function(inValue) {
		if(this.__visible != inValue) {
			this.__visible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.__visible;
	}
	,get_visible: function() {
		return this.__visible;
	}
	,set_transform: function(inValue) {
		this.transform = inValue;
		this.__x = this.transform.get_matrix().tx;
		this.__y = this.transform.get_matrix().ty;
		this.__invalidateMatrix(true);
		return inValue;
	}
	,get__topmostSurface: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) return gfx.__surface;
		return null;
	}
	,get_stage: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) return flash.Lib.__getStage();
		return null;
	}
	,set_scrollRect: function(inValue) {
		this.__scrollRect = inValue;
		this.__srUpdateDivs();
		return inValue;
	}
	,get_scrollRect: function() {
		if(this.__scrollRect == null) return null;
		return this.__scrollRect.clone();
	}
	,set_scaleY: function(inValue) {
		if(this.__scaleY != inValue) {
			this.__scaleY = inValue;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleY: function() {
		return this.__scaleY;
	}
	,set_scaleX: function(inValue) {
		if(this.__scaleX != inValue) {
			this.__scaleX = inValue;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_scaleX: function() {
		return this.__scaleX;
	}
	,set_rotation: function(inValue) {
		if(this.__rotation != inValue) {
			this.__rotation = inValue;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_rotation: function() {
		return this.__rotation;
	}
	,set_parent: function(inValue) {
		if(inValue == this.parent) return inValue;
		this.__invalidateMatrix();
		if(this.parent != null) {
			HxOverrides.remove(this.parent.__children,this);
			this.parent.__invalidateBounds();
		}
		if(inValue != null) {
			inValue.___renderFlags |= 64;
			if(inValue.parent != null) inValue.parent.___renderFlags |= 64;
		}
		if(this.parent == null && inValue != null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.ADDED,true,false);
			this.dispatchEvent(evt);
		} else if(this.parent != null && inValue == null) {
			this.parent = inValue;
			var evt = new flash.events.Event(flash.events.Event.REMOVED,true,false);
			this.dispatchEvent(evt);
		} else this.parent = inValue;
		return inValue;
	}
	,set___combinedVisible: function(inValue) {
		if(this.__combinedVisible != inValue) {
			this.__combinedVisible = inValue;
			this.setSurfaceVisible(inValue);
		}
		return this.__combinedVisible;
	}
	,get_mouseY: function() {
		return this.globalToLocal(new flash.geom.Point(0,this.get_stage().get_mouseY())).y;
	}
	,get_mouseX: function() {
		return this.globalToLocal(new flash.geom.Point(this.get_stage().get_mouseX(),0)).x;
	}
	,get__matrixInvalid: function() {
		return (this.___renderFlags & 4) != 0;
	}
	,get__matrixChainInvalid: function() {
		return (this.___renderFlags & 8) != 0;
	}
	,set_mask: function(inValue) {
		if(this.__mask != null) this.__mask.__maskingObj = null;
		this.__mask = inValue;
		if(this.__mask != null) this.__mask.__maskingObj = this;
		return this.__mask;
	}
	,get_mask: function() {
		return this.__mask;
	}
	,set_height: function(inValue) {
		if(this.get__boundsInvalid()) this.validateBounds();
		var h = this.__boundsRect.height;
		if(this.__scaleY * h != inValue) {
			if(h == 0) {
				this.__scaleY = 1;
				this.__invalidateMatrix(true);
				this.___renderFlags |= 64;
				if(this.parent != null) this.parent.___renderFlags |= 64;
				h = this.__boundsRect.height;
			}
			if(h <= 0) return 0;
			this.__scaleY = inValue / h;
			this.__invalidateMatrix(true);
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
		}
		return inValue;
	}
	,get_height: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.__height;
	}
	,set_filters: function(filters) {
		var oldFilterCount = this.__filters == null?0:this.__filters.length;
		if(filters == null) {
			this.__filters = null;
			if(oldFilterCount > 0) this.invalidateGraphics();
		} else {
			this.__filters = new Array();
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				this.__filters.push(filter.clone());
			}
			this.invalidateGraphics();
		}
		return filters;
	}
	,get__boundsInvalid: function() {
		var gfx = this.__getGraphics();
		if(gfx == null) return (this.___renderFlags & 64) != 0; else return (this.___renderFlags & 64) != 0 || gfx.boundsDirty;
	}
	,get_filters: function() {
		if(this.__filters == null) return [];
		var result = new Array();
		var _g = 0, _g1 = this.__filters;
		while(_g < _g1.length) {
			var filter = _g1[_g];
			++_g;
			result.push(filter.clone());
		}
		return result;
	}
	,get__bottommostSurface: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) return gfx.__surface;
		return null;
	}
	,__validateMatrix: function() {
		var parentMatrixInvalid = (this.___renderFlags & 8) != 0 && this.parent != null;
		if((this.___renderFlags & 4) != 0 || parentMatrixInvalid) {
			if(parentMatrixInvalid) this.parent.__validateMatrix();
			var m = this.transform.get_matrix();
			if((this.___renderFlags & 16) != 0) this.___renderFlags &= -5;
			if((this.___renderFlags & 4) != 0) {
				m.identity();
				m.scale(this.__scaleX,this.__scaleY);
				var rad = this.__rotation * flash.geom.Transform.DEG_TO_RAD;
				if(rad != 0.0) m.rotate(rad);
				m.translate(this.__x,this.__y);
				this.transform._matrix.copy(m);
				m;
			}
			var cm = this.transform.__getFullMatrix(null);
			var fm = this.parent == null?m:this.parent.transform.__getFullMatrix(m);
			this._fullScaleX = fm._sx;
			this._fullScaleY = fm._sy;
			if(cm.a != fm.a || cm.b != fm.b || cm.c != fm.c || cm.d != fm.d || cm.tx != fm.tx || cm.ty != fm.ty) {
				this.transform.__setFullMatrix(fm);
				this.___renderFlags |= 32;
			}
			this.___renderFlags &= -29;
		}
	}
	,__unifyChildrenWithDOM: function(lastMoveObj) {
		var gfx = this.__getGraphics();
		if(gfx != null && lastMoveObj != null && this != lastMoveObj) {
			var ogfx = lastMoveObj.__getGraphics();
			if(ogfx != null) flash.Lib.__setSurfaceZIndexAfter(this.__scrollRect == null?gfx.__surface:this._srWindow,lastMoveObj.__scrollRect == null?ogfx.__surface:lastMoveObj == this.parent?ogfx.__surface:lastMoveObj._srWindow);
		}
		if(gfx == null) return lastMoveObj; else return this;
	}
	,__testFlag: function(mask) {
		return (this.___renderFlags & mask) != 0;
	}
	,__setMatrix: function(inValue) {
		this.transform._matrix.copy(inValue);
		return inValue;
	}
	,__setFullMatrix: function(inValue) {
		return this.transform.__setFullMatrix(inValue);
	}
	,__setFlagToValue: function(mask,value) {
		if(value) this.___renderFlags |= mask; else this.___renderFlags &= ~mask;
	}
	,__setFlag: function(mask) {
		this.___renderFlags |= mask;
	}
	,__setDimensions: function() {
		if(this.scale9Grid != null) {
			this.__boundsRect.width *= this.__scaleX;
			this.__boundsRect.height *= this.__scaleY;
			this.__width = this.__boundsRect.width;
			this.__height = this.__boundsRect.height;
		} else {
			this.__width = this.__boundsRect.width * this.__scaleX;
			this.__height = this.__boundsRect.height * this.__scaleY;
		}
	}
	,__render: function(inMask,clipRect) {
		if(!this.__combinedVisible) return;
		var gfx = this.__getGraphics();
		if(gfx == null) return;
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if(gfx.__render(inMask,this.__filters,1,1)) {
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
			this.__applyFilters(gfx.__surface);
			this.___renderFlags |= 32;
		}
		var fullAlpha = (this.parent != null?this.parent.__combinedAlpha:1) * this.alpha;
		if(inMask != null) {
			var m = this.getSurfaceTransform(gfx);
			flash.Lib.__drawToSurface(gfx.__surface,inMask,m,fullAlpha,clipRect);
		} else {
			if((this.___renderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(gfx);
				flash.Lib.__setSurfaceTransform(gfx.__surface,m);
				this.___renderFlags &= -33;
				this.__srUpdateDivs();
			}
			flash.Lib.__setSurfaceOpacity(gfx.__surface,fullAlpha);
		}
	}
	,__removeFromStage: function() {
		var gfx = this.__getGraphics();
		if(gfx != null && flash.Lib.__isOnStage(gfx.__surface)) {
			flash.Lib.__removeSurface(gfx.__surface);
			var evt = new flash.events.Event(flash.events.Event.REMOVED_FROM_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,__matrixOverridden: function() {
		this.__x = this.transform.get_matrix().tx;
		this.__y = this.transform.get_matrix().ty;
		this.___renderFlags |= 16;
		this.___renderFlags |= 4;
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
	}
	,__isOnStage: function() {
		var gfx = this.__getGraphics();
		if(gfx != null && flash.Lib.__isOnStage(gfx.__surface)) return true;
		return false;
	}
	,__invalidateMatrix: function(local) {
		if(local == null) local = false;
		if(local) this.___renderFlags |= 4; else this.___renderFlags |= 8;
	}
	,__invalidateBounds: function() {
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
	}
	,__getSurface: function() {
		var gfx = this.__getGraphics();
		var surface = null;
		if(gfx != null) surface = gfx.__surface;
		return surface;
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var gfx = this.__getGraphics();
		if(gfx != null) {
			gfx.__render();
			var extX = gfx.__extent.x;
			var extY = gfx.__extent.y;
			var local = this.globalToLocal(point);
			if(local.x - extX <= 0 || local.y - extY <= 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return null;
			if(gfx.__hitTest(local.x,local.y)) return this;
		}
		return null;
	}
	,__getMatrix: function() {
		return this.transform.get_matrix();
	}
	,__getInteractiveObjectStack: function(outStack) {
		var io = this;
		if(io != null) outStack.push(io);
		if(this.parent != null) this.parent.__getInteractiveObjectStack(outStack);
	}
	,__getGraphics: function() {
		return null;
	}
	,__getFullMatrix: function(localMatrix) {
		return this.transform.__getFullMatrix(localMatrix);
	}
	,__fireEvent: function(event) {
		var stack = [];
		if(this.parent != null) this.parent.__getInteractiveObjectStack(stack);
		var l = stack.length;
		if(l > 0) {
			event.__setPhase(flash.events.EventPhase.CAPTURING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.__dispatchEvent(event);
				if(event.__getIsCancelled()) return;
			}
		}
		event.__setPhase(flash.events.EventPhase.AT_TARGET);
		event.currentTarget = this;
		this.__dispatchEvent(event);
		if(event.__getIsCancelled()) return;
		if(event.bubbles) {
			event.__setPhase(flash.events.EventPhase.BUBBLING_PHASE);
			stack.reverse();
			var _g = 0;
			while(_g < stack.length) {
				var obj = stack[_g];
				++_g;
				event.currentTarget = obj;
				obj.__dispatchEvent(event);
				if(event.__getIsCancelled()) return;
			}
		}
	}
	,__dispatchEvent: function(event) {
		if(event.target == null) event.target = this;
		event.currentTarget = this;
		return flash.events.EventDispatcher.prototype.dispatchEvent.call(this,event);
	}
	,__contains: function(child) {
		return false;
	}
	,__clearFlag: function(mask) {
		this.___renderFlags &= ~mask;
	}
	,__broadcast: function(event) {
		this.__dispatchEvent(event);
	}
	,__applyFilters: function(surface) {
		if(this.__filters != null) {
			var _g = 0, _g1 = this.__filters;
			while(_g < _g1.length) {
				var filter = _g1[_g];
				++_g;
				filter.__applyFilter(surface);
			}
		}
	}
	,__addToStage: function(newParent,beforeSibling) {
		var gfx = this.__getGraphics();
		if(gfx == null) return;
		if(newParent.__getGraphics() != null) {
			flash.Lib.__setSurfaceId(gfx.__surface,this.___id);
			if(beforeSibling != null && beforeSibling.__getGraphics() != null) flash.Lib.__appendSurface(gfx.__surface,beforeSibling.get__bottommostSurface()); else {
				var stageChildren = [];
				var _g = 0, _g1 = newParent.__children;
				while(_g < _g1.length) {
					var child = _g1[_g];
					++_g;
					if(child.get_stage() != null) stageChildren.push(child);
				}
				if(stageChildren.length < 1) flash.Lib.__appendSurface(gfx.__surface,null,newParent.get__topmostSurface()); else {
					var nextSibling = stageChildren[stageChildren.length - 1];
					var container;
					while(js.Boot.__instanceof(nextSibling,flash.display.DisplayObjectContainer)) {
						container = js.Boot.__cast(nextSibling , flash.display.DisplayObjectContainer);
						if(container.__children.length > 0) nextSibling = container.__children[container.__children.length - 1]; else break;
					}
					if(nextSibling.__getGraphics() != gfx) flash.Lib.__appendSurface(gfx.__surface,null,nextSibling.get__topmostSurface()); else flash.Lib.__appendSurface(gfx.__surface);
				}
			}
			flash.Lib.__setSurfaceTransform(gfx.__surface,this.getSurfaceTransform(gfx));
		} else if(newParent.name == "Stage") flash.Lib.__appendSurface(gfx.__surface);
		if(this.__isOnStage()) {
			this.__srUpdateDivs();
			var evt = new flash.events.Event(flash.events.Event.ADDED_TO_STAGE,false,false);
			this.dispatchEvent(evt);
		}
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			var gfx = this.__getGraphics();
			if(gfx == null) {
				this.__boundsRect.x = this.get_x();
				this.__boundsRect.y = this.get_y();
				this.__boundsRect.width = 0;
				this.__boundsRect.height = 0;
			} else {
				this.__boundsRect = gfx.__extent.clone();
				if(this.scale9Grid != null) {
					this.__boundsRect.width *= this.__scaleX;
					this.__boundsRect.height *= this.__scaleY;
					this.__width = this.__boundsRect.width;
					this.__height = this.__boundsRect.height;
				} else {
					this.__width = this.__boundsRect.width * this.__scaleX;
					this.__height = this.__boundsRect.height * this.__scaleY;
				}
				gfx.boundsDirty = false;
			}
			this.___renderFlags &= -65;
		}
	}
	,toString: function() {
		return "[DisplayObject name=" + this.name + " id=" + this.___id + "]";
	}
	,setSurfaceVisible: function(inValue) {
		var gfx = this.__getGraphics();
		if(gfx != null && gfx.__surface != null) flash.Lib.__setSurfaceVisible(gfx.__surface,inValue);
	}
	,localToGlobal: function(point) {
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		return this.transform.__getFullMatrix(null).transformPoint(point);
	}
	,invalidateGraphics: function() {
		var gfx = this.__getGraphics();
		if(gfx != null) {
			gfx.__changed = true;
			gfx.__clearNextCycle = true;
		}
	}
	,hitTestPoint: function(x,y,shapeFlag) {
		if(shapeFlag == null) shapeFlag = false;
		var boundingBox = shapeFlag == null?true:!shapeFlag;
		if(!boundingBox) return this.__getObjectUnderPoint(new flash.geom.Point(x,y)) != null; else {
			var gfx = this.__getGraphics();
			if(gfx != null) {
				var extX = gfx.__extent.x;
				var extY = gfx.__extent.y;
				var local = this.globalToLocal(new flash.geom.Point(x,y));
				if(local.x - extX < 0 || local.y - extY < 0 || (local.x - extX) * this.get_scaleX() > this.get_width() || (local.y - extY) * this.get_scaleY() > this.get_height()) return false; else return true;
			}
			return false;
		}
	}
	,hitTestObject: function(obj) {
		if(obj != null && obj.parent != null && this.parent != null) {
			var currentBounds = this.getBounds(this);
			var targetBounds = obj.getBounds(this);
			return currentBounds.intersects(targetBounds);
		}
		return false;
	}
	,handleGraphicsUpdated: function(gfx) {
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		this.__applyFilters(gfx.__surface);
		this.___renderFlags |= 32;
	}
	,globalToLocal: function(inPos) {
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		return this.transform.__getFullMatrix(null).invert().transformPoint(inPos);
	}
	,getSurfaceTransform: function(gfx) {
		var extent = gfx.__extentWithFilters;
		var fm = this.transform.__getFullMatrix(null);
		fm.__translateTransformed(extent.get_topLeft());
		return fm;
	}
	,getScreenBounds: function() {
		if(this.get__boundsInvalid()) this.validateBounds();
		return this.__boundsRect.clone();
	}
	,getRect: function(targetCoordinateSpace) {
		return this.getBounds(targetCoordinateSpace);
	}
	,getBounds: function(targetCoordinateSpace) {
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if(this.get__boundsInvalid()) this.validateBounds();
		var m = this.transform.__getFullMatrix(null);
		if(targetCoordinateSpace != null) m.concat(targetCoordinateSpace.transform.__getFullMatrix(null).invert());
		var rect = this.__boundsRect.transform(m);
		return rect;
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		var oldAlpha = this.alpha;
		this.alpha = 1;
		this.__render(inSurface,clipRect);
		this.alpha = oldAlpha;
	}
	,dispatchEvent: function(event) {
		var result = this.__dispatchEvent(event);
		if(event.__getIsCancelled()) return true;
		if(event.bubbles && this.parent != null) this.parent.dispatchEvent(event);
		return result;
	}
	,__class__: flash.display.DisplayObject
	,__properties__: {set_filters:"set_filters",get_filters:"get_filters",set_height:"set_height",get_height:"get_height",set_mask:"set_mask",get_mask:"get_mask",get_mouseX:"get_mouseX",get_mouseY:"get_mouseY",set_parent:"set_parent",set_rotation:"set_rotation",get_rotation:"get_rotation",set_scaleX:"set_scaleX",get_scaleX:"get_scaleX",set_scaleY:"set_scaleY",get_scaleY:"get_scaleY",set_scrollRect:"set_scrollRect",get_scrollRect:"get_scrollRect",get_stage:"get_stage",set_transform:"set_transform",set_visible:"set_visible",get_visible:"get_visible",set_width:"set_width",get_width:"get_width",set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set___combinedVisible:"set___combinedVisible",get__bottommostSurface:"get__bottommostSurface",get__boundsInvalid:"get__boundsInvalid",get__matrixChainInvalid:"get__matrixChainInvalid",get__matrixInvalid:"get__matrixInvalid",get__topmostSurface:"get__topmostSurface"}
});
flash.display.InteractiveObject = function() {
	flash.display.DisplayObject.call(this);
	this.tabEnabled = false;
	this.mouseEnabled = true;
	this.doubleClickEnabled = true;
	this.set_tabIndex(0);
};
$hxClasses["flash.display.InteractiveObject"] = flash.display.InteractiveObject;
flash.display.InteractiveObject.__name__ = ["flash","display","InteractiveObject"];
flash.display.InteractiveObject.__super__ = flash.display.DisplayObject;
flash.display.InteractiveObject.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_tabIndex: function(inIndex) {
		return this.__tabIndex = inIndex;
	}
	,get_tabIndex: function() {
		return this.__tabIndex;
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.mouseEnabled) return null; else return flash.display.DisplayObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,toString: function() {
		return "[InteractiveObject name=" + this.name + " id=" + this.___id + "]";
	}
	,__class__: flash.display.InteractiveObject
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_tabIndex:"set_tabIndex",get_tabIndex:"get_tabIndex"})
});
flash.display.DisplayObjectContainer = function() {
	this.__children = new Array();
	this.mouseChildren = true;
	this.tabChildren = true;
	flash.display.InteractiveObject.call(this);
	this.__combinedAlpha = this.alpha;
};
$hxClasses["flash.display.DisplayObjectContainer"] = flash.display.DisplayObjectContainer;
flash.display.DisplayObjectContainer.__name__ = ["flash","display","DisplayObjectContainer"];
flash.display.DisplayObjectContainer.__super__ = flash.display.InteractiveObject;
flash.display.DisplayObjectContainer.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_scrollRect: function(inValue) {
		inValue = flash.display.InteractiveObject.prototype.set_scrollRect.call(this,inValue);
		this.__unifyChildrenWithDOM();
		return inValue;
	}
	,set_visible: function(inVal) {
		this.set___combinedVisible(this.parent != null?this.parent.__combinedVisible && inVal:inVal);
		return flash.display.InteractiveObject.prototype.set_visible.call(this,inVal);
	}
	,get_numChildren: function() {
		return this.__children.length;
	}
	,set___combinedVisible: function(inVal) {
		if(inVal != this.__combinedVisible) {
			var _g = 0, _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.set___combinedVisible(child.get_visible() && inVal);
			}
		}
		return flash.display.InteractiveObject.prototype.set___combinedVisible.call(this,inVal);
	}
	,set_filters: function(filters) {
		flash.display.InteractiveObject.prototype.set_filters.call(this,filters);
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.set_filters(filters);
		}
		return filters;
	}
	,__unifyChildrenWithDOM: function(lastMoveObj) {
		var obj = flash.display.InteractiveObject.prototype.__unifyChildrenWithDOM.call(this,lastMoveObj);
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			obj = child.__unifyChildrenWithDOM(obj);
			if(child.get_scrollRect() != null) obj = child;
		}
		return obj;
	}
	,__swapSurface: function(c1,c2) {
		if(this.__children[c1] == null) throw "Null element at index " + c1 + " length " + this.__children.length;
		if(this.__children[c2] == null) throw "Null element at index " + c2 + " length " + this.__children.length;
		var gfx1 = this.__children[c1].__getGraphics();
		var gfx2 = this.__children[c2].__getGraphics();
		if(gfx1 != null && gfx2 != null) {
			var surface1 = this.__children[c1].__scrollRect == null?gfx1.__surface:this.__children[c1].__getSrWindow();
			var surface2 = this.__children[c2].__scrollRect == null?gfx2.__surface:this.__children[c2].__getSrWindow();
			if(surface1 != null && surface2 != null) flash.Lib.__swapSurface(surface1,surface2);
		}
	}
	,__render: function(inMask,clipRect) {
		if(!this.__visible) return;
		if(clipRect == null && this.__scrollRect != null) clipRect = this.__scrollRect;
		flash.display.InteractiveObject.prototype.__render.call(this,inMask,clipRect);
		this.__combinedAlpha = this.parent != null?this.parent.__combinedAlpha * this.alpha:this.alpha;
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.__visible) {
				if(clipRect != null) {
					if((child.___renderFlags & 4) != 0 || (child.___renderFlags & 8) != 0) child.__validateMatrix();
				}
				child.__render(inMask,clipRect);
			}
		}
		if(this.__addedChildren) {
			this.__unifyChildrenWithDOM();
			this.__addedChildren = false;
		}
	}
	,__removeFromStage: function() {
		flash.display.InteractiveObject.prototype.__removeFromStage.call(this);
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__removeFromStage();
		}
	}
	,__removeChild: function(child) {
		HxOverrides.remove(this.__children,child);
		child.__removeFromStage();
		child.set_parent(null);
		return child;
	}
	,__invalidateMatrix: function(local) {
		if(local == null) local = false;
		if(!((this.___renderFlags & 8) != 0) && !((this.___renderFlags & 4) != 0)) {
			var _g = 0, _g1 = this.__children;
			while(_g < _g1.length) {
				var child = _g1[_g];
				++_g;
				child.__invalidateMatrix();
			}
		}
		flash.display.InteractiveObject.prototype.__invalidateMatrix.call(this,local);
	}
	,__getObjectsUnderPoint: function(point,stack) {
		var l = this.__children.length - 1;
		var _g1 = 0, _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = this.__children[l - i].__getObjectUnderPoint(point);
			if(result != null) stack.push(result);
		}
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null;
		var l = this.__children.length - 1;
		var _g1 = 0, _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			var result = null;
			if(this.mouseEnabled) result = this.__children[l - i].__getObjectUnderPoint(point);
			if(result != null) return this.mouseChildren?result:this;
		}
		return flash.display.InteractiveObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,__contains: function(child) {
		if(child == null) return false;
		if(this == child) return true;
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c == child || c.__contains(child)) return true;
		}
		return false;
	}
	,__broadcast: function(event) {
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			child.__broadcast(event);
		}
		this.dispatchEvent(event);
	}
	,__addToStage: function(newParent,beforeSibling) {
		flash.display.InteractiveObject.prototype.__addToStage.call(this,newParent,beforeSibling);
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.__getGraphics() == null || !child.__isOnStage()) child.__addToStage(this);
		}
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.InteractiveObject.prototype.validateBounds.call(this);
			var _g = 0, _g1 = this.__children;
			while(_g < _g1.length) {
				var obj = _g1[_g];
				++_g;
				if(obj.get_visible()) {
					var r = obj.getBounds(this);
					if(r.width != 0 || r.height != 0) {
						if(this.__boundsRect.width == 0 && this.__boundsRect.height == 0) this.__boundsRect = r.clone(); else this.__boundsRect.extendBounds(r);
					}
				}
			}
			if(this.scale9Grid != null) {
				this.__boundsRect.width *= this.__scaleX;
				this.__boundsRect.height *= this.__scaleY;
				this.__width = this.__boundsRect.width;
				this.__height = this.__boundsRect.height;
			} else {
				this.__width = this.__boundsRect.width * this.__scaleX;
				this.__height = this.__boundsRect.height * this.__scaleY;
			}
		}
	}
	,toString: function() {
		return "[DisplayObjectContainer name=" + this.name + " id=" + this.___id + "]";
	}
	,swapChildrenAt: function(child1,child2) {
		var swap = this.__children[child1];
		this.__children[child1] = this.__children[child2];
		this.__children[child2] = swap;
		swap = null;
	}
	,swapChildren: function(child1,child2) {
		var c1 = -1;
		var c2 = -1;
		var swap;
		var _g1 = 0, _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__children[i] == child1) c1 = i; else if(this.__children[i] == child2) c2 = i;
		}
		if(c1 != -1 && c2 != -1) {
			swap = this.__children[c1];
			this.__children[c1] = this.__children[c2];
			this.__children[c2] = swap;
			swap = null;
			this.__swapSurface(c1,c2);
			child1.__unifyChildrenWithDOM();
			child2.__unifyChildrenWithDOM();
		}
	}
	,setChildIndex: function(child,index) {
		if(index > this.__children.length) throw "Invalid index position " + index;
		var oldIndex = this.getChildIndex(child);
		if(oldIndex < 0) {
			var msg = "setChildIndex : object " + child.name + " not found.";
			if(child.parent == this) {
				var realindex = -1;
				var _g1 = 0, _g = this.__children.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(this.__children[i] == child) {
						realindex = i;
						break;
					}
				}
				if(realindex != -1) msg += "Internal error: Real child index was " + Std.string(realindex); else msg += "Internal error: Child was not in __children array!";
			}
			throw msg;
		}
		if(index < oldIndex) {
			var i = oldIndex;
			while(i > index) {
				this.swapChildren(this.__children[i],this.__children[i - 1]);
				i--;
			}
		} else if(oldIndex < index) {
			var i = oldIndex;
			while(i < index) {
				this.swapChildren(this.__children[i],this.__children[i + 1]);
				i++;
			}
		}
	}
	,removeChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__removeChild(this.__children[index]);
		throw "removeChildAt(" + index + ") : none found?";
	}
	,removeChild: function(inChild) {
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child == inChild) return (function($this) {
				var $r;
				HxOverrides.remove($this.__children,child);
				child.__removeFromStage();
				child.set_parent(null);
				$r = child;
				return $r;
			}(this));
		}
		throw "removeChild : none found?";
	}
	,getObjectsUnderPoint: function(point) {
		var result = new Array();
		this.__getObjectsUnderPoint(point,result);
		return result;
	}
	,getChildIndex: function(inChild) {
		var _g1 = 0, _g = this.__children.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__children[i] == inChild) return i;
		}
		return -1;
	}
	,getChildByName: function(inName) {
		var _g = 0, _g1 = this.__children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.name == inName) return child;
		}
		return null;
	}
	,getChildAt: function(index) {
		if(index >= 0 && index < this.__children.length) return this.__children[index];
		throw "getChildAt : index out of bounds " + index + "/" + this.__children.length;
		return null;
	}
	,contains: function(child) {
		return this.__contains(child);
	}
	,addChildAt: function(object,index) {
		if(index > this.__children.length || index < 0) throw "Invalid index position " + index;
		this.__addedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,index);
			return object;
		}
		if(index == this.__children.length) return this.addChild(object); else {
			if(this.__isOnStage()) object.__addToStage(this,this.__children[index]);
			this.__children.splice(index,0,object);
			object.set_parent(this);
		}
		return object;
	}
	,addChild: function(object) {
		if(object == null) throw "DisplayObjectContainer asked to add null child object";
		if(object == this) throw "Adding to self";
		this.__addedChildren = true;
		if(object.parent == this) {
			this.setChildIndex(object,this.__children.length - 1);
			return object;
		}
		object.set_parent(this);
		if(this.__isOnStage()) object.__addToStage(this);
		if(this.__children == null) this.__children = new Array();
		this.__children.push(object);
		return object;
	}
	,__class__: flash.display.DisplayObjectContainer
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{get_numChildren:"get_numChildren"})
});
flash.display.Sprite = function() {
	flash.display.DisplayObjectContainer.call(this);
	this.__graphics = new flash.display.Graphics();
	this.buttonMode = false;
};
$hxClasses["flash.display.Sprite"] = flash.display.Sprite;
flash.display.Sprite.__name__ = ["flash","display","Sprite"];
flash.display.Sprite.__super__ = flash.display.DisplayObjectContainer;
flash.display.Sprite.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	set_useHandCursor: function(cursor) {
		if(cursor == this.useHandCursor) return cursor;
		if(this.__cursorCallbackOver != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OVER,this.__cursorCallbackOver);
		if(this.__cursorCallbackOut != null) this.removeEventListener(flash.events.MouseEvent.ROLL_OUT,this.__cursorCallbackOut);
		if(!cursor) flash.Lib.__setCursor(flash._Lib.CursorType.Default); else {
			this.__cursorCallbackOver = function(_) {
				flash.Lib.__setCursor(flash._Lib.CursorType.Pointer);
			};
			this.__cursorCallbackOut = function(_) {
				flash.Lib.__setCursor(flash._Lib.CursorType.Default);
			};
			this.addEventListener(flash.events.MouseEvent.ROLL_OVER,this.__cursorCallbackOver);
			this.addEventListener(flash.events.MouseEvent.ROLL_OUT,this.__cursorCallbackOut);
		}
		this.useHandCursor = cursor;
		return cursor;
	}
	,get_graphics: function() {
		return this.__graphics;
	}
	,get_dropTarget: function() {
		return this.__dropTarget;
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,toString: function() {
		return "[Sprite name=" + this.name + " id=" + this.___id + "]";
	}
	,stopDrag: function() {
		if(this.__isOnStage()) {
			this.get_stage().__stopDrag(this);
			var l = this.parent.__children.length - 1;
			var obj = this.get_stage();
			var _g1 = 0, _g = this.parent.__children.length;
			while(_g1 < _g) {
				var i = _g1++;
				var result = this.parent.__children[l - i].__getObjectUnderPoint(new flash.geom.Point(this.get_stage().get_mouseX(),this.get_stage().get_mouseY()));
				if(result != null) obj = result;
			}
			if(obj != this) this.__dropTarget = obj; else this.__dropTarget = this.get_stage();
		}
	}
	,startDrag: function(lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		if(this.__isOnStage()) this.get_stage().__startDrag(this,lockCenter,bounds);
	}
	,__class__: flash.display.Sprite
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{get_dropTarget:"get_dropTarget",get_graphics:"get_graphics",set_useHandCursor:"set_useHandCursor"})
});
var com = {}
com.haxepunk = {}
com.haxepunk.Engine = function(width,height,frameRate,fixed,renderMode) {
	if(fixed == null) fixed = false;
	if(frameRate == null) frameRate = 60;
	if(height == null) height = 0;
	if(width == null) width = 0;
	flash.display.Sprite.call(this);
	com.haxepunk.HXP.bounds = new flash.geom.Rectangle(0,0,width,height);
	com.haxepunk.HXP.assignedFrameRate = frameRate;
	com.haxepunk.HXP.fixed = fixed;
	com.haxepunk.HXP.engine = this;
	com.haxepunk.HXP.width = width;
	com.haxepunk.HXP.height = height;
	if(renderMode != null) {
		com.haxepunk.HXP.renderMode = renderMode;
		if(com.haxepunk.HXP.screen == null) com.haxepunk.HXP.screen = new com.haxepunk.Screen(); else com.haxepunk.HXP.screen.init();
		renderMode;
	} else com.haxepunk.HXP.set_renderMode(com.haxepunk.RenderMode.BUFFER);
	if(com.haxepunk.HXP.randomSeed == 0) {
		com.haxepunk.HXP._seed = com.haxepunk.HXP.clamp(2147483646 * Math.random() | 0,1.0,2147483646) | 0;
		com.haxepunk.HXP.randomSeed = com.haxepunk.HXP._seed;
		com.haxepunk.HXP._seed;
	}
	com.haxepunk.HXP.entity = new com.haxepunk.Entity();
	com.haxepunk.HXP._time = flash.Lib.getTimer();
	com.haxepunk.HXP._time;
	this.paused = false;
	this.maxElapsed = 0.0333;
	this.maxFrameSkip = 5;
	this.tickRate = 4;
	this._frameList = new Array();
	this._systemTime = this._delta = this._frameListSum = 0;
	this._frameLast = 0;
	this.addEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.onStage));
	flash.Lib.get_current().addChild(this);
};
$hxClasses["com.haxepunk.Engine"] = com.haxepunk.Engine;
com.haxepunk.Engine.__name__ = ["com","haxepunk","Engine"];
com.haxepunk.Engine.__super__ = flash.display.Sprite;
com.haxepunk.Engine.prototype = $extend(flash.display.Sprite.prototype,{
	checkScene: function() {
		if(com.haxepunk.HXP._goto == null) return;
		if(com.haxepunk.HXP._scene != null) {
			com.haxepunk.HXP._scene.end();
			com.haxepunk.HXP._scene.updateLists();
			if(com.haxepunk.HXP._scene.autoClear && com.haxepunk.HXP._scene.get_hasTween()) com.haxepunk.HXP._scene.clearTweens();
			if(this.contains(com.haxepunk.HXP._scene._sprite)) this.removeChild(com.haxepunk.HXP._scene._sprite);
			com.haxepunk.HXP._scene = com.haxepunk.HXP._goto;
			com.haxepunk.HXP._goto = null;
			this.addChild(com.haxepunk.HXP._scene._sprite);
			com.haxepunk.HXP.camera = com.haxepunk.HXP._scene.camera;
			com.haxepunk.HXP._scene.updateLists();
			com.haxepunk.HXP._scene.begin();
			com.haxepunk.HXP._scene.updateLists();
		}
	}
	,onTimer: function() {
		this._time = flash.Lib.getTimer();
		this._delta += this._time - this._last;
		this._last = this._time;
		if(this._delta < this._rate) return;
		this._gameTime = this._time | 0;
		com.haxepunk.HXP._systemTime = this._time - this._systemTime;
		if(this._delta > this._skip) this._delta = this._skip;
		while(this._delta >= this._rate) {
			com.haxepunk.HXP.elapsed = this._rate * com.haxepunk.HXP.rate * 0.001;
			this._updateTime = this._time;
			this._delta -= this._rate;
			this._prev = this._time;
			if(!this.paused) this.update();
			if(com.haxepunk.HXP.consoleEnabled()) ((function($this) {
				var $r;
				if(com.haxepunk.HXP._console == null) com.haxepunk.HXP._console = new com.haxepunk.debug.Console();
				$r = com.haxepunk.HXP._console;
				return $r;
			}(this))).update();
			com.haxepunk.utils.Input.update();
			this._time = flash.Lib.getTimer();
			com.haxepunk.HXP._updateTime = this._time - this._updateTime;
		}
		this._renderTime = this._time;
		if(!this.paused) this.render();
		this._time = this._systemTime = flash.Lib.getTimer();
		com.haxepunk.HXP._renderTime = this._time - this._renderTime;
		com.haxepunk.HXP._gameTime = this._time - this._gameTime;
	}
	,onEnterFrame: function(e) {
		this._time = this._gameTime = flash.Lib.getTimer();
		com.haxepunk.HXP._systemTime = this._time - this._systemTime;
		this._updateTime = this._time;
		com.haxepunk.HXP.elapsed = (this._time - this._last) / 1000;
		if(com.haxepunk.HXP.elapsed > this.maxElapsed) com.haxepunk.HXP.elapsed = this.maxElapsed;
		com.haxepunk.HXP.elapsed *= com.haxepunk.HXP.rate;
		this._last = this._time;
		if(!this.paused) this.update();
		if(com.haxepunk.HXP.consoleEnabled()) ((function($this) {
			var $r;
			if(com.haxepunk.HXP._console == null) com.haxepunk.HXP._console = new com.haxepunk.debug.Console();
			$r = com.haxepunk.HXP._console;
			return $r;
		}(this))).update();
		com.haxepunk.utils.Input.update();
		this._time = this._renderTime = flash.Lib.getTimer();
		com.haxepunk.HXP._updateTime = this._time - this._updateTime;
		if(!this.paused) this.render();
		this._time = this._systemTime = flash.Lib.getTimer();
		com.haxepunk.HXP._renderTime = this._time - this._renderTime;
		com.haxepunk.HXP._gameTime = this._time - this._gameTime;
	}
	,onStage: function(e) {
		this.removeEventListener(flash.events.Event.ADDED_TO_STAGE,$bind(this,this.onStage));
		com.haxepunk.HXP.stage = this.get_stage();
		this.setStageProperties();
		com.haxepunk.utils.Input.enable();
		if(!(com.haxepunk.HXP._goto == null)) this.checkScene();
		com.haxepunk.utils.Draw.init();
		this.init();
		this._rate = 1000 / com.haxepunk.HXP.assignedFrameRate;
		if(com.haxepunk.HXP.fixed) {
			this._skip = this._rate * (this.maxFrameSkip + 1);
			this._last = this._prev = flash.Lib.getTimer();
			this._timer = new haxe.Timer(this.tickRate);
			this._timer.run = $bind(this,this.onTimer);
		} else {
			this._last = flash.Lib.getTimer();
			this.addEventListener(flash.events.Event.ENTER_FRAME,$bind(this,this.onEnterFrame));
		}
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		} else {
		}
	}
	,resize: function() {
		if(com.haxepunk.HXP.width == 0) com.haxepunk.HXP.width = com.haxepunk.HXP.stage.get_stageWidth();
		if(com.haxepunk.HXP.height == 0) com.haxepunk.HXP.height = com.haxepunk.HXP.stage.get_stageHeight();
		com.haxepunk.HXP.windowWidth = com.haxepunk.HXP.stage.get_stageWidth();
		com.haxepunk.HXP.windowHeight = com.haxepunk.HXP.stage.get_stageHeight();
		com.haxepunk.HXP.screen.set_scaleX(com.haxepunk.HXP.stage.get_stageWidth() / com.haxepunk.HXP.width);
		com.haxepunk.HXP.screen.set_scaleY(com.haxepunk.HXP.stage.get_stageHeight() / com.haxepunk.HXP.height);
		com.haxepunk.HXP.resize(com.haxepunk.HXP.stage.get_stageWidth(),com.haxepunk.HXP.stage.get_stageHeight());
	}
	,setStageProperties: function() {
		var _g = this;
		com.haxepunk.HXP.stage.set_frameRate(com.haxepunk.HXP.assignedFrameRate);
		com.haxepunk.HXP.stage.align = flash.display.StageAlign.TOP_LEFT;
		com.haxepunk.HXP.stage.set_quality(flash.display.StageQuality.HIGH);
		com.haxepunk.HXP.stage.scaleMode = flash.display.StageScaleMode.NO_SCALE;
		com.haxepunk.HXP.stage.set_displayState(flash.display.StageDisplayState.NORMAL);
		com.haxepunk.HXP.windowWidth = com.haxepunk.HXP.stage.get_stageWidth();
		com.haxepunk.HXP.windowHeight = com.haxepunk.HXP.stage.get_stageHeight();
		this.resize();
		com.haxepunk.HXP.stage.addEventListener(flash.events.Event.RESIZE,function(e) {
			_g.resize();
		});
		com.haxepunk.HXP.stage.addEventListener(flash.events.Event.ACTIVATE,function(e) {
			com.haxepunk.HXP.focused = true;
			_g.focusGained();
			com.haxepunk.HXP._scene.focusGained();
		});
		com.haxepunk.HXP.stage.addEventListener(flash.events.Event.DEACTIVATE,function(e) {
			com.haxepunk.HXP.focused = false;
			_g.focusLost();
			com.haxepunk.HXP._scene.focusLost();
		});
	}
	,render: function() {
		if(com.haxepunk.HXP.screen.needsResize) com.haxepunk.HXP.resize(com.haxepunk.HXP.windowWidth,com.haxepunk.HXP.windowHeight);
		var t = flash.Lib.getTimer();
		if(this._frameLast == 0) this._frameLast = t | 0;
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
			com.haxepunk.HXP.screen.swap();
			com.haxepunk.HXP.screen.refresh();
		}
		com.haxepunk.utils.Draw.resetTarget();
		if(com.haxepunk.HXP._scene.visible) com.haxepunk.HXP._scene.render();
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) com.haxepunk.HXP.screen.redraw();
		t = flash.Lib.getTimer();
		this._frameListSum += this._frameList[this._frameList.length] = t - this._frameLast | 0;
		if(this._frameList.length > 10) this._frameListSum -= this._frameList.shift();
		com.haxepunk.HXP.frameRate = 1000 / (this._frameListSum / this._frameList.length);
		this._frameLast = t;
	}
	,update: function() {
		com.haxepunk.HXP._scene.updateLists();
		if(!(com.haxepunk.HXP._goto == null)) this.checkScene();
		if(com.haxepunk.HXP.tweener.active && com.haxepunk.HXP.tweener.get_hasTween()) com.haxepunk.HXP.tweener.updateTweens();
		if(com.haxepunk.HXP._scene.active) {
			if(com.haxepunk.HXP._scene.get_hasTween()) com.haxepunk.HXP._scene.updateTweens();
			com.haxepunk.HXP._scene.update();
		}
		com.haxepunk.HXP._scene.updateLists(false);
	}
	,focusLost: function() {
	}
	,focusGained: function() {
	}
	,init: function() {
	}
	,__class__: com.haxepunk.Engine
});
var Main = function(width,height,frameRate,fixed,renderMode) {
	com.haxepunk.Engine.call(this,width,height,frameRate,fixed,renderMode);
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.main = function() {
	new Main();
}
Main.__super__ = com.haxepunk.Engine;
Main.prototype = $extend(com.haxepunk.Engine.prototype,{
	init: function() {
		com.haxepunk.HXP.set_scene(new MainScene());
	}
	,__class__: Main
});
var DocumentClass = function(width,height,frameRate,fixed,renderMode) {
	Main.call(this,width,height,frameRate,fixed,renderMode);
};
$hxClasses["DocumentClass"] = DocumentClass;
DocumentClass.__name__ = ["DocumentClass"];
DocumentClass.__super__ = Main;
DocumentClass.prototype = $extend(Main.prototype,{
	get_stage: function() {
		return flash.Lib.get_current().get_stage();
	}
	,__class__: DocumentClass
});
var openfl = {}
openfl.AssetLibrary = function() {
};
$hxClasses["openfl.AssetLibrary"] = openfl.AssetLibrary;
openfl.AssetLibrary.__name__ = ["openfl","AssetLibrary"];
openfl.AssetLibrary.prototype = {
	loadSound: function(id,handler) {
		handler(this.getSound(id));
	}
	,loadMusic: function(id,handler) {
		handler(this.getMusic(id));
	}
	,loadMovieClip: function(id,handler) {
		handler(this.getMovieClip(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadBytes: function(id,handler) {
		handler(this.getBytes(id));
	}
	,loadBitmapData: function(id,handler) {
		handler(this.getBitmapData(id));
	}
	,load: function(handler) {
		handler(this);
	}
	,isLocal: function(id,type) {
		return true;
	}
	,getSound: function(id) {
		return null;
	}
	,getPath: function(id) {
		return null;
	}
	,getMusic: function(id) {
		return this.getSound(id);
	}
	,getMovieClip: function(id) {
		return null;
	}
	,getFont: function(id) {
		return null;
	}
	,getBytes: function(id) {
		return null;
	}
	,getBitmapData: function(id) {
		return null;
	}
	,exists: function(id,type) {
		return false;
	}
	,__class__: openfl.AssetLibrary
}
var DefaultAssetLibrary = function() {
	openfl.AssetLibrary.call(this);
	DefaultAssetLibrary.path.set("gfx/preloader/haxepunk.png","gfx/preloader/haxepunk.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/preloader/haxepunk.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_hidden.png","gfx/debug/console_hidden.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_hidden.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_output.png","gfx/debug/console_output.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_output.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_pause.png","gfx/debug/console_pause.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_pause.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_step.png","gfx/debug/console_step.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_step.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_debug.png","gfx/debug/console_debug.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_debug.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_logo.png","gfx/debug/console_logo.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_logo.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_play.png","gfx/debug/console_play.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_play.png",value);
	DefaultAssetLibrary.path.set("gfx/debug/console_visible.png","gfx/debug/console_visible.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("gfx/debug/console_visible.png",value);
	DefaultAssetLibrary.className.set("font/04B_03__.ttf",__ASSET__font_04b_03___ttf);
	var value = Reflect.field(openfl.AssetType,"font".toUpperCase());
	DefaultAssetLibrary.type.set("font/04B_03__.ttf",value);
	DefaultAssetLibrary.path.set("graphics/particle.png","graphics/particle.png");
	var value = Reflect.field(openfl.AssetType,"image".toUpperCase());
	DefaultAssetLibrary.type.set("graphics/particle.png",value);
	DefaultAssetLibrary.className.set("font/04B_03__.ttf",__ASSET__font_5);
	var value = Reflect.field(openfl.AssetType,"font".toUpperCase());
	DefaultAssetLibrary.type.set("font/04B_03__.ttf",value);
};
$hxClasses["DefaultAssetLibrary"] = DefaultAssetLibrary;
DefaultAssetLibrary.__name__ = ["DefaultAssetLibrary"];
DefaultAssetLibrary.__super__ = openfl.AssetLibrary;
DefaultAssetLibrary.prototype = $extend(openfl.AssetLibrary.prototype,{
	loadSound: function(id,handler) {
		handler(this.getSound(id));
	}
	,loadMusic: function(id,handler) {
		handler(this.getMusic(id));
	}
	,loadFont: function(id,handler) {
		handler(this.getFont(id));
	}
	,loadBytes: function(id,handler) {
		if(DefaultAssetLibrary.path.exists(id)) {
			var loader = new flash.net.URLLoader();
			loader.addEventListener(flash.events.Event.COMPLETE,function(event) {
				var bytes = new flash.utils.ByteArray();
				bytes.writeUTFBytes(event.currentTarget.data);
				bytes.position = 0;
				handler(bytes);
			});
			loader.load(new flash.net.URLRequest(DefaultAssetLibrary.path.get(id)));
		} else handler(this.getBytes(id));
	}
	,loadBitmapData: function(id,handler) {
		if(DefaultAssetLibrary.path.exists(id)) {
			var loader = new flash.display.Loader();
			loader.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,function(event) {
				handler((js.Boot.__cast(event.currentTarget.content , flash.display.Bitmap)).bitmapData);
			});
			loader.load(new flash.net.URLRequest(DefaultAssetLibrary.path.get(id)));
		} else handler(this.getBitmapData(id));
	}
	,isLocal: function(id,type) {
		return true;
	}
	,getSound: function(id) {
		return new flash.media.Sound(new flash.net.URLRequest(DefaultAssetLibrary.path.get(id)));
	}
	,getPath: function(id) {
		return DefaultAssetLibrary.path.get(id);
	}
	,getMusic: function(id) {
		return new flash.media.Sound(new flash.net.URLRequest(DefaultAssetLibrary.path.get(id)));
	}
	,getFont: function(id) {
		return js.Boot.__cast(Type.createInstance(DefaultAssetLibrary.className.get(id),[]) , flash.text.Font);
	}
	,getBytes: function(id) {
		var bytes = null;
		var data = ApplicationMain.urlLoaders.get(DefaultAssetLibrary.path.get(id)).data;
		if(js.Boot.__instanceof(data,String)) {
			bytes = new flash.utils.ByteArray();
			bytes.writeUTFBytes(data);
		} else if(js.Boot.__instanceof(data,flash.utils.ByteArray)) bytes = data; else bytes = null;
		if(bytes != null) {
			bytes.position = 0;
			return bytes;
		} else return null;
	}
	,getBitmapData: function(id) {
		return (js.Boot.__cast(ApplicationMain.loaders.get(DefaultAssetLibrary.path.get(id)).contentLoaderInfo.content , flash.display.Bitmap)).bitmapData;
	}
	,exists: function(id,type) {
		var assetType = DefaultAssetLibrary.type.get(id);
		if(assetType != null) {
			if(assetType == type || (type == openfl.AssetType.SOUND || type == openfl.AssetType.MUSIC) && (assetType == openfl.AssetType.MUSIC || assetType == openfl.AssetType.SOUND)) return true;
			if(type == openfl.AssetType.BINARY || type == null) return true;
		}
		return false;
	}
	,__class__: DefaultAssetLibrary
});
flash.text = {}
flash.text.Font = function() {
	this.__metrics = [];
	this.__fontScale = 9.0;
	var className = Type.getClassName(Type.getClass(this));
	if(flash.text.Font.__fontData == null) {
		flash.text.Font.__fontData = [];
		flash.text.Font.__fontData["Bitstream_Vera_Sans"] = haxe.Unserializer.run(flash.text.Font.DEFAULT_FONT_DATA);
	}
	if(className == "flash.text.Font") this.set_fontName("Bitstream_Vera_Sans"); else this.set_fontName(className.split(".").pop());
};
$hxClasses["flash.text.Font"] = flash.text.Font;
flash.text.Font.__name__ = ["flash","text","Font"];
flash.text.Font.enumerateFonts = function(enumerateDeviceFonts) {
	if(enumerateDeviceFonts == null) enumerateDeviceFonts = false;
	return flash.text.Font.__registeredFonts.slice();
}
flash.text.Font.__ofResource = function(resourceName,fontName) {
	if(fontName == null) fontName = "";
	var data = haxe.Unserializer.run(haxe.Resource.getString(resourceName));
	if(data == null) {
	} else {
		if(fontName == "") {
			flash.text.Font.__fontData[resourceName] = data.hash;
			fontName = data.fontName;
		}
		flash.text.Font.__fontData[data.fontName] = data.hash;
	}
	return fontName;
}
flash.text.Font.registerFont = function(font) {
	var instance = js.Boot.__cast(Type.createInstance(font,[]) , flash.text.Font);
	if(instance != null) {
		if(Reflect.hasField(font,"resourceName")) instance.set_fontName(flash.text.Font.__ofResource(Reflect.field(font,"resourceName")));
		flash.text.Font.__registeredFonts.push(instance);
	}
}
flash.text.Font.prototype = {
	set_fontName: function(name) {
		if(name == "_sans" || name == "_serif" || name == "_typewriter") name = "Bitstream_Vera_Sans";
		this.fontName = name;
		if(flash.text.Font.__fontData[this.fontName] == null) try {
			flash.text.Font.__ofResource(name);
		} catch( e ) {
			this.fontName = "Bitstream_Vera_Sans";
		}
		if(flash.text.Font.__fontData[this.fontName] != null) try {
			this.__glyphData = flash.text.Font.__fontData[this.fontName];
		} catch( e ) {
			this.fontName = "Bitstream_Vera_Sans";
		}
		return name;
	}
	,__setScale: function(scale) {
		this.__fontScale = scale / 1024;
	}
	,__render: function(graphics,inChar,inX,inY,inOutline) {
		var index = 0;
		var glyph = this.__glyphData.get(inChar);
		if(glyph == null) return;
		var commands = glyph.commands;
		var data = glyph.data;
		var _g = 0;
		while(_g < commands.length) {
			var c = commands[_g];
			++_g;
			switch(c) {
			case 1:
				graphics.moveTo(inX + data[index++] * this.__fontScale,inY + data[index++] * this.__fontScale);
				break;
			case 2:
				graphics.lineTo(inX + data[index++] * this.__fontScale,inY + data[index++] * this.__fontScale);
				break;
			case 3:
				graphics.curveTo(inX + data[index++] * this.__fontScale,inY + data[index++] * this.__fontScale,inX + data[index++] * this.__fontScale,inY + data[index++] * this.__fontScale);
				break;
			}
		}
	}
	,__getAdvance: function(inGlyph,height) {
		var m = this.__metrics[inGlyph];
		if(m == null) {
			var glyph = this.__glyphData.get(inGlyph);
			if(glyph == null) return 0;
			this.__metrics[inGlyph] = m = glyph._width * this.__fontScale | 0;
		}
		if(m == null) return 0;
		return m;
	}
	,hasGlyph: function(str) {
		return this.__glyphData.exists(HxOverrides.cca(str,0));
	}
	,__class__: flash.text.Font
	,__properties__: {set_fontName:"set_fontName"}
}
var __ASSET__font_04b_03___ttf = function() {
	flash.text.Font.call(this);
};
$hxClasses["__ASSET__font_04b_03___ttf"] = __ASSET__font_04b_03___ttf;
__ASSET__font_04b_03___ttf.__name__ = ["__ASSET__font_04b_03___ttf"];
__ASSET__font_04b_03___ttf.__super__ = flash.text.Font;
__ASSET__font_04b_03___ttf.prototype = $extend(flash.text.Font.prototype,{
	__class__: __ASSET__font_04b_03___ttf
});
var __ASSET__font_5 = function() {
	flash.text.Font.call(this);
};
$hxClasses["__ASSET__font_5"] = __ASSET__font_5;
__ASSET__font_5.__name__ = ["__ASSET__font_5"];
__ASSET__font_5.__super__ = flash.text.Font;
__ASSET__font_5.prototype = $extend(flash.text.Font.prototype,{
	__class__: __ASSET__font_5
});
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,matchedPos: function() {
		if(this.r.m == null) throw "No string matched";
		return { pos : this.r.m.index, len : this.r.m[0].length};
	}
	,matchedRight: function() {
		if(this.r.m == null) throw "No string matched";
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	,matched: function(n) {
		return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
			var $r;
			throw "EReg::matched";
			return $r;
		}(this));
	}
	,match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
}
com.haxepunk.Tweener = function() {
	this.active = true;
	this.autoClear = false;
};
$hxClasses["com.haxepunk.Tweener"] = com.haxepunk.Tweener;
com.haxepunk.Tweener.__name__ = ["com","haxepunk","Tweener"];
com.haxepunk.Tweener.prototype = {
	get_hasTween: function() {
		return this._tween != null;
	}
	,updateTweens: function() {
		var t, ft = this._tween;
		while(ft != null) {
			t = js.Boot.__cast(ft , com.haxepunk.Tween);
			if(t.active) {
				t.update();
				if(ft._finish) ft.finish();
			}
			ft = ft._next;
		}
	}
	,clearTweens: function() {
		var t, ft = this._tween;
		var fn;
		while(ft != null) {
			fn = ft._next;
			this.removeTween(js.Boot.__cast(ft , com.haxepunk.Tween));
			ft = fn;
		}
	}
	,removeTween: function(t) {
		var ft = t;
		if(ft._parent != this) throw "Core object does not contain Tween.";
		if(ft._next != null) ft._next._prev = ft._prev;
		if(ft._prev != null) ft._prev._next = ft._next; else this._tween = ft._next == null?null:js.Boot.__cast(ft._next , com.haxepunk.Tween);
		ft._next = ft._prev = null;
		ft._parent = null;
		t.active = false;
		return t;
	}
	,addTween: function(t,start) {
		if(start == null) start = false;
		var ft = t;
		if(ft._parent != null) throw "Cannot add a Tween object more than once.";
		ft._parent = this;
		ft._next = this._tween;
		var friendTween = this._tween;
		if(this._tween != null) friendTween._prev = t;
		this._tween = t;
		if(start) this._tween.start();
		return t;
	}
	,update: function() {
	}
	,__class__: com.haxepunk.Tweener
	,__properties__: {get_hasTween:"get_hasTween"}
}
com.haxepunk.Entity = function(x,y,graphic,mask) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.Tweener.call(this);
	this.visible = true;
	this.collidable = true;
	this.followCamera = false;
	this.x = x;
	this.y = y;
	this.originX = this.originY = 0;
	this.width = this.height = 0;
	this._moveX = this._moveY = 0;
	this._type = "";
	this._name = "";
	this.HITBOX = new com.haxepunk.Mask();
	this._point = com.haxepunk.HXP.point;
	this._camera = com.haxepunk.HXP.point2;
	this.set_layer(0);
	if(graphic != null) this.set_graphic(graphic);
	if(mask != null) this.set_mask(mask);
	this.HITBOX.assignTo(this);
	this._class = Type.getClassName(Type.getClass(this));
};
$hxClasses["com.haxepunk.Entity"] = com.haxepunk.Entity;
com.haxepunk.Entity.__name__ = ["com","haxepunk","Entity"];
com.haxepunk.Entity.__super__ = com.haxepunk.Tweener;
com.haxepunk.Entity.prototype = $extend(com.haxepunk.Tweener.prototype,{
	centerGraphicInRect: function() {
		if(this._graphic != null) {
			this._graphic.x = this.width / 2;
			this._graphic.y = this.height / 2;
		}
	}
	,clampVertical: function(top,bottom,padding) {
		if(padding == null) padding = 0;
		if((this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY < top + padding) this.y = top + this.originY + padding;
		if((this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY + this.height > bottom - padding) this.y = bottom - this.height + this.originY - padding;
	}
	,clampHorizontal: function(left,right,padding) {
		if(padding == null) padding = 0;
		if((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX < left + padding) this.x = left + this.originX + padding;
		if((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX + this.width > right - padding) this.x = right - this.width + this.originX - padding;
	}
	,moveCollideY: function(e) {
		return true;
	}
	,moveCollideX: function(e) {
		return true;
	}
	,moveAtAngle: function(angle,amount,solidType,sweep) {
		if(sweep == null) sweep = false;
		angle *= Math.PI / -180;
		this.moveBy(Math.cos(angle) * amount,Math.sin(angle) * amount,solidType,sweep);
	}
	,moveTowards: function(x,y,amount,solidType,sweep) {
		if(sweep == null) sweep = false;
		this._point.x = x - (this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x);
		this._point.y = y - (this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y);
		if(this._point.x * this._point.x + this._point.y * this._point.y > amount * amount) this._point.normalize(amount);
		this.moveBy(this._point.x,this._point.y,solidType,sweep);
	}
	,moveTo: function(x,y,solidType,sweep) {
		if(sweep == null) sweep = false;
		this.moveBy(x - (this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x),y - (this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y),solidType,sweep);
	}
	,moveBy: function(x,y,solidType,sweep) {
		if(sweep == null) sweep = false;
		this._moveX += x;
		this._moveY += y;
		x = Math.round(this._moveX);
		y = Math.round(this._moveY);
		this._moveX -= x;
		this._moveY -= y;
		if(solidType != null) {
			var sign, e;
			if(x != 0) {
				if(this.collidable && (sweep || this.collideTypes(solidType,(this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) + x,this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) != null)) {
					sign = x > 0?1:-1;
					while(x != 0) {
						if((e = this.collideTypes(solidType,(this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) + sign,this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y)) != null) {
							if(this.moveCollideX(e)) break; else {
								var _g = this;
								_g.x = (_g.followCamera?_g.x + com.haxepunk.HXP.camera.x:_g.x) + sign;
							}
						} else {
							var _g = this;
							_g.x = (_g.followCamera?_g.x + com.haxepunk.HXP.camera.x:_g.x) + sign;
						}
						x -= sign;
					}
				} else {
					var _g = this;
					_g.x = (_g.followCamera?_g.x + com.haxepunk.HXP.camera.x:_g.x) + x;
				}
			}
			if(y != 0) {
				if(this.collidable && (sweep || this.collideTypes(solidType,this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x,(this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) + y) != null)) {
					sign = y > 0?1:-1;
					while(y != 0) {
						if((e = this.collideTypes(solidType,this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x,(this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) + sign)) != null) {
							if(this.moveCollideY(e)) break; else {
								var _g = this;
								_g.y = (_g.followCamera?_g.y + com.haxepunk.HXP.camera.y:_g.y) + sign;
							}
						} else {
							var _g = this;
							_g.y = (_g.followCamera?_g.y + com.haxepunk.HXP.camera.y:_g.y) + sign;
						}
						y -= sign;
					}
				} else {
					var _g = this;
					_g.y = (_g.followCamera?_g.y + com.haxepunk.HXP.camera.y:_g.y) + y;
				}
			}
		} else {
			var _g = this;
			_g.x = (_g.followCamera?_g.x + com.haxepunk.HXP.camera.x:_g.x) + x;
			var _g = this;
			_g.y = (_g.followCamera?_g.y + com.haxepunk.HXP.camera.y:_g.y) + y;
		}
	}
	,toString: function() {
		return this._class;
	}
	,distanceToRect: function(rx,ry,rwidth,rheight) {
		return com.haxepunk.HXP.distanceRects(rx,ry,rwidth,rheight,(this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX,(this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY,this.width,this.height);
	}
	,distanceToPoint: function(px,py,useHitbox) {
		if(useHitbox == null) useHitbox = false;
		if(!useHitbox) return Math.sqrt(((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - px) * ((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - px) + ((this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - py) * ((this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - py)); else return com.haxepunk.HXP.distanceRectPoint(px,py,(this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX,(this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY,this.width,this.height);
	}
	,distanceFrom: function(e,useHitboxes) {
		if(useHitboxes == null) useHitboxes = false;
		if(!useHitboxes) return Math.sqrt(((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x)) * ((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x)) + ((this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y)) * ((this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y))); else return com.haxepunk.HXP.distanceRects((this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX,(this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY,this.width,this.height,(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX,(e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY,e.width,e.height);
	}
	,centerOrigin: function() {
		this.originX = this.width / 2 | 0;
		this.originY = this.height / 2 | 0;
	}
	,setOrigin: function(x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		this.originX = x;
		this.originY = y;
	}
	,setHitboxTo: function(o) {
		this.width = Reflect.getProperty(o,"width");
		this.height = Reflect.getProperty(o,"height");
		if(Reflect.hasField(o,"originX") && Reflect.hasField(o,"originY")) {
			this.originX = Reflect.getProperty(o,"originX");
			this.originY = Reflect.getProperty(o,"originY");
		} else {
			this.originX = Reflect.getProperty(o,"x");
			this.originY = Reflect.getProperty(o,"y");
			this.originX = -this.originX;
			this.originY = -this.originY;
		}
	}
	,setHitbox: function(width,height,originX,originY) {
		if(originY == null) originY = 0;
		if(originX == null) originX = 0;
		if(height == null) height = 0;
		if(width == null) width = 0;
		this.width = width;
		this.height = height;
		this.originX = originX;
		this.originY = originY;
	}
	,addGraphic: function(g) {
		if(this._graphic == null) this.set_graphic(g); else if(js.Boot.__instanceof(this._graphic,com.haxepunk.graphics.Graphiclist)) (js.Boot.__cast(this._graphic , com.haxepunk.graphics.Graphiclist)).add(g); else {
			var list = new com.haxepunk.graphics.Graphiclist();
			list.add(this._graphic);
			list.add(g);
			this.set_graphic(list);
		}
		return g;
	}
	,set_name: function(value) {
		if(this._name == value) return this._name;
		if(this._scene == null) {
			this._name = value;
			return this._name;
		}
		if(this._name != "") this._scene.unregisterName(this);
		this._name = value;
		if(value != "") this._scene.registerName(this);
		return this._name;
	}
	,get_name: function() {
		return this._name;
	}
	,set_graphic: function(value) {
		if(this._graphic == value) return value;
		if(this._graphic != null) this._graphic.destroy();
		this._graphic = value;
		return this._graphic;
	}
	,get_graphic: function() {
		return this._graphic;
	}
	,set_mask: function(value) {
		if(this._mask == value) return value;
		if(this._mask != null) this._mask.assignTo(null);
		this._mask = value;
		if(value != null) this._mask.assignTo(this);
		return this._mask;
	}
	,get_mask: function() {
		return this._mask;
	}
	,set_type: function(value) {
		if(this._type == value) return this._type;
		if(this._scene == null) {
			this._type = value;
			return this._type;
		}
		if(this._type != "") this._scene.removeType(this);
		this._type = value;
		if(value != "") this._scene.addType(this);
		return this._type;
	}
	,get_type: function() {
		return this._type;
	}
	,set_layer: function(value) {
		if(this._layer == value) return this._layer;
		if(this._scene == null) {
			this._layer = value;
			return this._layer;
		}
		this._scene.removeRender(this);
		this._layer = value;
		this._scene.addRender(this);
		return this._layer;
	}
	,get_layer: function() {
		return this._layer;
	}
	,get_bottom: function() {
		return (this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY + this.height;
	}
	,get_top: function() {
		return (this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY;
	}
	,get_right: function() {
		return (this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX + this.width;
	}
	,get_left: function() {
		return (this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX;
	}
	,get_centerY: function() {
		return (this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y) - this.originY + this.height / 2;
	}
	,get_centerX: function() {
		return (this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x) - this.originX + this.width / 2;
	}
	,get_halfHeight: function() {
		return this.height / 2;
	}
	,get_halfWidth: function() {
		return this.width / 2;
	}
	,get_scene: function() {
		return this._scene;
	}
	,get_world: function() {
		com.haxepunk.HXP.log("Entity.world is deprecated, please use scene instead");
		return this._scene;
	}
	,get_onCamera: function() {
		if(this._scene == null) return false; else return this.collideRect(this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x,this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y,this._scene.camera.x,this._scene.camera.y,com.haxepunk.HXP.width,com.haxepunk.HXP.height);
	}
	,collideTypesInto: function(types,x,y,array) {
		if(this._scene == null) return;
		var _g = 0;
		while(_g < types.length) {
			var type = types[_g];
			++_g;
			this.collideInto(type,x,y,array);
		}
	}
	,collideInto: function(type,x,y,array) {
		if(this._scene == null) return;
		var e, fe = this._scene._typeFirst.get(type);
		if(!this.collidable || fe == null) return;
		this._x = this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x;
		this._y = this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y;
		this.x = x;
		this.y = y;
		var n = array.length;
		if(this._mask == null) {
			while(fe != null) {
				e = fe;
				if(e.collidable && e != this && x - this.originX + this.width > (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX && y - this.originY + this.height > (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY && x - this.originX < (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX + e.width && y - this.originY < (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY + e.height) {
					if(e._mask == null || e._mask.collide(this.HITBOX)) array[n++] = e;
				}
				fe = fe._typeNext;
			}
			this.x = this._x;
			this.y = this._y;
			return;
		}
		while(fe != null) {
			e = fe;
			if(e.collidable && e != this && x - this.originX + this.width > (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX && y - this.originY + this.height > (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY && x - this.originX < (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX + e.width && y - this.originY < (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY + e.height) {
				if(this._mask.collide(e._mask != null?e._mask:e.HITBOX)) array[n++] = e;
			}
			fe = fe._typeNext;
		}
		this.x = this._x;
		this.y = this._y;
		return;
	}
	,collidePoint: function(x,y,pX,pY) {
		if(pX >= x - this.originX && pY >= y - this.originY && pX < x - this.originX + this.width && pY < y - this.originY + this.height) {
			if(this._mask == null) return true;
			this._x = this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x;
			this._y = this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y;
			this.x = x;
			this.y = y;
			com.haxepunk.HXP.entity.x = pX;
			com.haxepunk.HXP.entity.y = pY;
			com.haxepunk.HXP.entity.width = 1;
			com.haxepunk.HXP.entity.height = 1;
			if(this._mask.collide(com.haxepunk.HXP.entity.HITBOX)) {
				this.x = this._x;
				this.y = this._y;
				return true;
			}
			this.x = this._x;
			this.y = this._y;
			return false;
		}
		return false;
	}
	,collideRect: function(x,y,rX,rY,rWidth,rHeight) {
		if(x - this.originX + this.width >= rX && y - this.originY + this.height >= rY && x - this.originX <= rX + rWidth && y - this.originY <= rY + rHeight) {
			if(this._mask == null) return true;
			this._x = this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x;
			this._y = this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y;
			this.x = x;
			this.y = y;
			com.haxepunk.HXP.entity.x = rX;
			com.haxepunk.HXP.entity.y = rY;
			com.haxepunk.HXP.entity.width = rWidth | 0;
			com.haxepunk.HXP.entity.height = rHeight | 0;
			if(this._mask.collide(com.haxepunk.HXP.entity.HITBOX)) {
				this.x = this._x;
				this.y = this._y;
				return true;
			}
			this.x = this._x;
			this.y = this._y;
			return false;
		}
		return false;
	}
	,collideWith: function(e,x,y) {
		this._x = this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x;
		this._y = this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y;
		this.x = x;
		this.y = y;
		if(this.collidable && e.collidable && x - this.originX + this.width > (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX && y - this.originY + this.height > (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY && x - this.originX < (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX + e.width && y - this.originY < (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY + e.height) {
			if(this._mask == null) {
				if(e._mask == null || e._mask.collide(this.HITBOX)) {
					this.x = this._x;
					this.y = this._y;
					return e;
				}
				this.x = this._x;
				this.y = this._y;
				return null;
			}
			if(this._mask.collide(e._mask != null?e._mask:e.HITBOX)) {
				this.x = this._x;
				this.y = this._y;
				return e;
			}
		}
		this.x = this._x;
		this.y = this._y;
		return null;
	}
	,collideTypes: function(types,x,y) {
		if(this._scene == null) return null;
		if(js.Boot.__instanceof(types,String)) return this.collide(types,x,y); else {
			var a = types;
			if(a != null) {
				var e;
				var _g = 0;
				while(_g < a.length) {
					var type = a[_g];
					++_g;
					e = this.collide(type,x,y);
					if(e != null) return e;
				}
			}
		}
		return null;
	}
	,collide: function(type,x,y) {
		if(this._scene == null) return null;
		var e, fe = this._scene._typeFirst.get(type);
		if(!this.collidable || fe == null) return null;
		this._x = this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x;
		this._y = this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y;
		this.x = x;
		this.y = y;
		if(this._mask == null) {
			while(fe != null) {
				e = js.Boot.__cast(fe , com.haxepunk.Entity);
				if(e.collidable && e != this && x - this.originX + this.width > (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX && y - this.originY + this.height > (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY && x - this.originX < (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX + e.width && y - this.originY < (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY + e.height) {
					if(e._mask == null || e._mask.collide(this.HITBOX)) {
						this.x = this._x;
						this.y = this._y;
						return e;
					}
				}
				fe = fe._typeNext;
			}
			this.x = this._x;
			this.y = this._y;
			return null;
		}
		while(fe != null) {
			e = js.Boot.__cast(fe , com.haxepunk.Entity);
			if(e.collidable && e != this && x - this.originX + this.width > (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX && y - this.originY + this.height > (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY && x - this.originX < (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX + e.width && y - this.originY < (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY + e.height) {
				if(this._mask.collide(e._mask != null?e._mask:e.HITBOX)) {
					this.x = this._x;
					this.y = this._y;
					return e;
				}
			}
			fe = fe._typeNext;
		}
		this.x = this._x;
		this.y = this._y;
		return null;
	}
	,render: function() {
		if(this._graphic != null && this._graphic.get_visible()) {
			if(this._graphic.relative) {
				this._point.x = this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x;
				this._point.y = this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y;
			} else this._point.x = this._point.y = 0;
			this._camera.x = this._scene == null?com.haxepunk.HXP.camera.x:this._scene.camera.x;
			this._camera.y = this._scene == null?com.haxepunk.HXP.camera.y:this._scene.camera.y;
			if(this._graphic.blit) this._graphic.render(this.renderTarget != null?this.renderTarget:com.haxepunk.HXP.buffer,this._point,this._camera); else this._graphic.renderAtlas(this._layer,this._point,this._camera);
		}
	}
	,update: function() {
	}
	,removed: function() {
	}
	,added: function() {
	}
	,set_y: function(v) {
		return this.y = v;
	}
	,get_y: function() {
		if(this.followCamera) return this.y + com.haxepunk.HXP.camera.y; else return this.y;
	}
	,set_x: function(v) {
		return this.x = v;
	}
	,get_x: function() {
		if(this.followCamera) return this.x + com.haxepunk.HXP.camera.x; else return this.x;
	}
	,__class__: com.haxepunk.Entity
	,__properties__: $extend(com.haxepunk.Tweener.prototype.__properties__,{set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",get_onCamera:"get_onCamera",get_world:"get_world",get_scene:"get_scene",get_halfWidth:"get_halfWidth",get_halfHeight:"get_halfHeight",get_centerX:"get_centerX",get_centerY:"get_centerY",get_left:"get_left",get_right:"get_right",get_top:"get_top",get_bottom:"get_bottom",set_layer:"set_layer",get_layer:"get_layer",set_type:"set_type",get_type:"get_type",set_mask:"set_mask",get_mask:"get_mask",set_graphic:"set_graphic",get_graphic:"get_graphic",set_name:"set_name",get_name:"get_name"})
});
var Explosion = function() {
	com.haxepunk.Entity.call(this,this.followCamera?this.x + com.haxepunk.HXP.camera.x:this.x,this.followCamera?this.y + com.haxepunk.HXP.camera.y:this.y);
	this._emitter = new com.haxepunk.graphics.Emitter("graphics/particle.png",4,4);
	this._emitter.newType("explode",[0]);
	this._emitter.setMotion("explode",0,100,2,360,-40,1,com.haxepunk.utils.Ease.quadOut);
	this._emitter.setAlpha("explode",20,0.1);
	this._emitter.setGravity("explode",5,1);
	this.set_graphic(this._emitter);
	this.set_layer(-1);
};
$hxClasses["Explosion"] = Explosion;
Explosion.__name__ = ["Explosion"];
Explosion.__super__ = com.haxepunk.Entity;
Explosion.prototype = $extend(com.haxepunk.Entity.prototype,{
	explode: function(x,y) {
		var _g = 0;
		while(_g < 20) {
			var i = _g++;
			this._emitter.emit("explode",x,y);
		}
	}
	,__class__: Explosion
});
var HxOverrides = function() { }
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	switch(s.length) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k = s.split("-");
		return new Date(k[0],k[1] - 1,k[2],0,0,0);
	case 19:
		var k = s.split(" ");
		var y = k[0].split("-");
		var t = k[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
}
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
}
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
}
HxOverrides.remove = function(a,obj) {
	var i = 0;
	var l = a.length;
	while(i < l) {
		if(a[i] == obj) {
			a.splice(i,1);
			return true;
		}
		i++;
	}
	return false;
}
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
}
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,isEmpty: function() {
		return this.h == null;
	}
	,pop: function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		if(this.h == null) this.q = null;
		this.length--;
		return x;
	}
	,first: function() {
		return this.h == null?null:this.h[0];
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
}
com.haxepunk.Scene = function() {
	com.haxepunk.Tweener.call(this);
	this.visible = true;
	this.camera = new flash.geom.Point();
	this._count = 0;
	this._layerList = new Array();
	this._layerCount = new haxe.ds.IntMap();
	this._sprite = new flash.display.Sprite();
	this._add = new Array();
	this._remove = new Array();
	this._recycle = new Array();
	this._layerDisplay = new haxe.ds.IntMap();
	this._renderFirst = new haxe.ds.IntMap();
	this._renderLast = new haxe.ds.IntMap();
	this._typeFirst = new haxe.ds.StringMap();
	this._classCount = new haxe.ds.StringMap();
	this._typeCount = new haxe.ds.StringMap();
	this._recycled = new haxe.ds.StringMap();
	this._entityNames = new haxe.ds.StringMap();
};
$hxClasses["com.haxepunk.Scene"] = com.haxepunk.Scene;
com.haxepunk.Scene.__name__ = ["com","haxepunk","Scene"];
com.haxepunk.Scene.squareRects = function(x1,y1,w1,h1,x2,y2,w2,h2) {
	if(x1 < x2 + w2 && x2 < x1 + w1) {
		if(y1 < y2 + h2 && y2 < y1 + h1) return 0;
		if(y1 > y2) return (y1 - (y2 + h2)) * (y1 - (y2 + h2));
		return (y2 - (y1 + h1)) * (y2 - (y1 + h1));
	}
	if(y1 < y2 + h2 && y2 < y1 + h1) {
		if(x1 > x2) return (x1 - (x2 + w2)) * (x1 - (x2 + w2));
		return (x2 - (x1 + w1)) * (x2 - (x1 + w1));
	}
	if(x1 > x2) {
		if(y1 > y2) return com.haxepunk.Scene.squarePoints(x1,y1,x2 + w2,y2 + h2);
		return com.haxepunk.Scene.squarePoints(x1,y1 + h1,x2 + w2,y2);
	}
	if(y1 > y2) return com.haxepunk.Scene.squarePoints(x1 + w1,y1,x2,y2 + h2);
	return com.haxepunk.Scene.squarePoints(x1 + w1,y1 + h1,x2,y2);
}
com.haxepunk.Scene.squarePoints = function(x1,y1,x2,y2) {
	return (x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2);
}
com.haxepunk.Scene.squarePointRect = function(px,py,rx,ry,rw,rh) {
	if(px >= rx && px <= rx + rw) {
		if(py >= ry && py <= ry + rh) return 0;
		if(py > ry) return (py - (ry + rh)) * (py - (ry + rh));
		return (ry - py) * (ry - py);
	}
	if(py >= ry && py <= ry + rh) {
		if(px > rx) return (px - (rx + rw)) * (px - (rx + rw));
		return (rx - px) * (rx - px);
	}
	if(px > rx) {
		if(py > ry) return com.haxepunk.Scene.squarePoints(px,py,rx + rw,ry + rh);
		return com.haxepunk.Scene.squarePoints(px,py,rx + rw,ry);
	}
	if(py > ry) return com.haxepunk.Scene.squarePoints(px,py,rx,ry + rh);
	return com.haxepunk.Scene.squarePoints(px,py,rx,ry);
}
com.haxepunk.Scene.__super__ = com.haxepunk.Tweener;
com.haxepunk.Scene.prototype = $extend(com.haxepunk.Tweener.prototype,{
	unregisterName: function(e) {
		var fe = e;
		this._entityNames.remove(fe._name);
	}
	,registerName: function(e) {
		var fe = e;
		this._entityNames.set(fe._name,e);
	}
	,removeType: function(e) {
		var fe = e;
		if(this._typeFirst.get(fe._type) == e) this._typeFirst.set(fe._type,fe._typeNext);
		if(fe._typeNext != null) fe._typeNext._typePrev = fe._typePrev;
		if(fe._typePrev != null) fe._typePrev._typeNext = fe._typeNext;
		fe._typeNext = fe._typePrev = null;
		this._typeCount.set(fe._type,this._typeCount.get(fe._type) - 1);
	}
	,addType: function(e) {
		var fe = e;
		if(this._typeFirst.get(fe._type) != null) {
			this._typeFirst.get(fe._type)._typePrev = e;
			fe._typeNext = this._typeFirst.get(fe._type);
			this._typeCount.set(fe._type,this._typeCount.get(fe._type) + 1);
		} else {
			fe._typeNext = null;
			this._typeCount.set(fe._type,1);
		}
		fe._typePrev = null;
		this._typeFirst.set(fe._type,e);
	}
	,removeRender: function(e) {
		var fe = e;
		if(fe._renderNext != null) fe._renderNext._renderPrev = fe._renderPrev; else this._renderLast.set(fe._layer,fe._renderPrev);
		if(fe._renderPrev != null) fe._renderPrev._renderNext = fe._renderNext; else {
			this._renderFirst.set(fe._layer,fe._renderNext);
			if(fe._renderNext == null) {
				if(this._layerList.length > 1) {
					this._layerList[this._layerList.indexOf(fe._layer)] = this._layerList[this._layerList.length - 1];
					this._layerSort = true;
				}
				this._layerList.pop();
			}
		}
		if(e._graphic != null) e._graphic.destroy();
		var newLayerCount = this._layerCount.get(fe._layer) - 1;
		if(newLayerCount > 0) {
			this._layerCount.set(fe._layer,newLayerCount);
			newLayerCount;
		} else {
			this._layerCount.remove(fe._layer);
			this._renderFirst.remove(fe._layer);
			this._renderLast.remove(fe._layer);
		}
		fe._renderNext = fe._renderPrev = null;
	}
	,addRender: function(e) {
		var fe = e;
		var f = this._renderFirst.get(fe._layer);
		if(f != null) {
			fe._renderNext = f;
			f._renderPrev = e;
			var v = this._layerCount.get(fe._layer) + 1;
			this._layerCount.set(fe._layer,v);
			v;
		} else {
			this._renderLast.set(fe._layer,e);
			this._layerList[this._layerList.length] = fe._layer;
			this._layerSort = true;
			fe._renderNext = null;
			this._layerCount.set(fe._layer,1);
			1;
		}
		this._renderFirst.set(fe._layer,e);
		fe._renderPrev = null;
	}
	,removeUpdate: function(e) {
		var fe = e;
		if(this._updateFirst == e) this._updateFirst = fe._updateNext;
		if(fe._updateNext != null) fe._updateNext._updatePrev = fe._updatePrev;
		if(fe._updatePrev != null) fe._updatePrev._updateNext = fe._updateNext;
		fe._updateNext = fe._updatePrev = null;
		this._count--;
		this._classCount.set(fe._class,this._classCount.get(fe._class) - 1);
	}
	,addUpdate: function(e) {
		var fe = e;
		if(this._updateFirst != null) {
			this._updateFirst._updatePrev = e;
			fe._updateNext = this._updateFirst;
		} else fe._updateNext = null;
		fe._updatePrev = null;
		this._updateFirst = e;
		this._count++;
		if(this._classCount.get(fe._class) != 0) this._classCount.set(fe._class,0);
		this._classCount.set(fe._class,this._classCount.get(fe._class) + 1);
	}
	,updateLists: function(shouldAdd) {
		if(shouldAdd == null) shouldAdd = true;
		var e;
		var fe;
		if(this._remove.length > 0) {
			var _g = 0, _g1 = this._remove;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				fe = e1;
				if(fe._scene == null) {
					var idx = this._add.indexOf(e1);
					if(idx >= 0) this._add.splice(idx,1);
					continue;
				}
				if(fe._scene != this) continue;
				e1.removed();
				fe._scene = null;
				this.removeUpdate(e1);
				this.removeRender(e1);
				if(fe._type != "") this.removeType(e1);
				if(fe._name != "") this.unregisterName(e1);
				if(e1.autoClear && e1.get_hasTween()) e1.clearTweens();
			}
			this._remove.length = 0;
		}
		if(shouldAdd && this._add.length > 0) {
			var _g = 0, _g1 = this._add;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				fe = e1;
				if(fe._scene != null) continue;
				fe._scene = this;
				this.addUpdate(e1);
				this.addRender(e1);
				if(fe._type != "") this.addType(e1);
				if(fe._name != "") this.registerName(e1);
				e1.added();
			}
			this._add.length = 0;
		}
		if(this._recycle.length > 0) {
			var _g = 0, _g1 = this._recycle;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				fe = e1;
				if(fe._scene != null || fe._recycleNext != null) continue;
				fe._recycleNext = this._recycled.get(fe._class);
				this._recycled.set(fe._class,e1);
			}
			this._recycle.length = 0;
		}
	}
	,getInstance: function(name) {
		return this._entityNames.get(name);
	}
	,getAll: function(into) {
		var e, fe = this._updateFirst, n = into.length;
		while(fe != null) {
			e = fe;
			into[n++] = e;
			fe = fe._updateNext;
		}
	}
	,getLayer: function(layer,into) {
		var e, fe = this._renderLast.get(layer), n = into.length;
		while(fe != null) {
			e = fe;
			into[n++] = e;
			fe = fe._updatePrev;
		}
	}
	,getClass: function(c,into) {
		var fe = this._updateFirst, n = into.length;
		while(fe != null) {
			if(js.Boot.__instanceof(fe,c)) into[n++] = fe;
			fe = fe._updateNext;
		}
	}
	,getType: function(type,into) {
		var fe = this._typeFirst.get(type), n = into.length;
		while(fe != null) {
			into[n++] = fe;
			fe = fe._typeNext;
		}
	}
	,get_uniqueTypes: function() {
		var i = 0;
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this._typeCount))();
		while( $it0.hasNext() ) {
			var type = $it0.next();
			i++;
		}
		return i;
	}
	,get_layerNearest: function() {
		if(this._updateFirst == null) return 0;
		return this._layerList[0];
	}
	,get_layerFarthest: function() {
		if(this._updateFirst == null) return 0;
		return this._layerList[this._layerList.length - 1];
	}
	,get_nearest: function() {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._renderFirst.get(this._layerList[0]) , com.haxepunk.Entity);
	}
	,get_farthest: function() {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._renderLast.get(this._layerList[this._layerList.length - 1]) , com.haxepunk.Entity);
	}
	,layerLast: function(layer) {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._renderLast.get(layer) , com.haxepunk.Entity);
	}
	,layerFirst: function(layer) {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._renderFirst.get(layer) , com.haxepunk.Entity);
	}
	,classFirst: function(c) {
		if(this._updateFirst == null) return null;
		var fe = this._updateFirst;
		while(fe != null) {
			if(js.Boot.__instanceof(fe,c)) return fe;
			fe = fe._updateNext;
		}
		return null;
	}
	,typeFirst: function(type) {
		if(this._updateFirst == null) return null;
		return js.Boot.__cast(this._typeFirst.get(type) , com.haxepunk.Entity);
	}
	,get_layers: function() {
		return this._layerList.length;
	}
	,get_first: function() {
		return js.Boot.__cast(this._updateFirst , com.haxepunk.Entity);
	}
	,layerCount: function(layer) {
		return this._layerCount.get(layer);
	}
	,classCount: function(c) {
		return this._classCount.get(c);
	}
	,typeCount: function(type) {
		return this._typeCount.get(type);
	}
	,get_count: function() {
		return this._count;
	}
	,nearestToPoint: function(type,x,y,useHitboxes) {
		if(useHitboxes == null) useHitboxes = false;
		var n, fe = this._typeFirst.get(type), nearDist = 179 * Math.pow(10,306), near = null, dist;
		if(useHitboxes) {
			while(fe != null) {
				n = js.Boot.__cast(fe , com.haxepunk.Entity);
				dist = com.haxepunk.Scene.squarePointRect(x,y,(n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x) - n.originX,(n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y) - n.originY,n.width,n.height);
				if(dist < nearDist) {
					nearDist = dist;
					near = n;
				}
				fe = fe._typeNext;
			}
			return near;
		}
		while(fe != null) {
			n = js.Boot.__cast(fe , com.haxepunk.Entity);
			dist = (x - (n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x)) * (x - (n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x)) + (y - (n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y)) * (y - (n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y));
			if(dist < nearDist) {
				nearDist = dist;
				near = n;
			}
			fe = fe._typeNext;
		}
		return near;
	}
	,nearestToClass: function(type,e,classType,useHitboxes) {
		if(useHitboxes == null) useHitboxes = false;
		if(useHitboxes) return this.nearestToRect(type,(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX,(e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY,e.width,e.height);
		var n, fe = this._typeFirst.get(type), nearDist = 179 * Math.pow(10,306), near = null, dist, x = (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX, y = (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY;
		while(fe != null) {
			n = js.Boot.__cast(fe , com.haxepunk.Entity);
			dist = (x - (n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x)) * (x - (n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x)) + (y - (n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y)) * (y - (n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y));
			if(dist < nearDist && js.Boot.__instanceof(e,classType)) {
				nearDist = dist;
				near = n;
			}
			fe = fe._typeNext;
		}
		return near;
	}
	,nearestToEntity: function(type,e,useHitboxes) {
		if(useHitboxes == null) useHitboxes = false;
		if(useHitboxes) return this.nearestToRect(type,(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX,(e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY,e.width,e.height);
		var n, fe = this._typeFirst.get(type), nearDist = 179 * Math.pow(10,306), near = null, dist, x = (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX, y = (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY;
		while(fe != null) {
			n = js.Boot.__cast(fe , com.haxepunk.Entity);
			dist = (x - (n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x)) * (x - (n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x)) + (y - (n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y)) * (y - (n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y));
			if(dist < nearDist) {
				nearDist = dist;
				near = n;
			}
			fe = fe._typeNext;
		}
		return near;
	}
	,nearestToRect: function(type,x,y,width,height) {
		var n, fe = this._typeFirst.get(type), nearDist = 179 * Math.pow(10,306), near = null, dist;
		while(fe != null) {
			n = js.Boot.__cast(fe , com.haxepunk.Entity);
			dist = com.haxepunk.Scene.squareRects(x,y,width,height,(n.followCamera?n.x + com.haxepunk.HXP.camera.x:n.x) - n.originX,(n.followCamera?n.y + com.haxepunk.HXP.camera.y:n.y) - n.originY,n.width,n.height);
			if(dist < nearDist) {
				nearDist = dist;
				near = n;
			}
			fe = fe._typeNext;
		}
		return near;
	}
	,collidePointInto: function(type,pX,pY,into) {
		var e, fe = this._typeFirst.get(type), n = into.length;
		while(fe != null) {
			e = fe;
			if(e.collidable && e.collidePoint(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x,e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y,pX,pY)) into[n++] = e;
			fe = fe._typeNext;
		}
	}
	,collideCircleInto: function(type,circleX,circleY,radius,into) {
		var e, fe = this._typeFirst.get(type), n = into.length;
		radius *= radius;
		while(fe != null) {
			e = fe;
			if(com.haxepunk.HXP.distanceSquared(circleX,circleY,e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x,e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) < radius) into[n++] = e;
			fe = fe._typeNext;
		}
	}
	,collideRectInto: function(type,rX,rY,rWidth,rHeight,into) {
		var e, fe = this._typeFirst.get(type), n = into.length;
		while(fe != null) {
			e = fe;
			if(e.collidable && e.collideRect(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x,e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y,rX,rY,rWidth,rHeight)) into[n++] = e;
			fe = fe._typeNext;
		}
	}
	,collideLine: function(type,fromX,fromY,toX,toY,precision,p) {
		if(precision == null) precision = 1;
		if(precision < 1) precision = 1;
		if(Math.sqrt((toX - fromX) * (toX - fromX) + (toY - fromY) * (toY - fromY)) < precision) {
			if(p != null) {
				if(fromX == toX && fromY == toY) {
					p.x = toX;
					p.y = toY;
					return this.collidePoint(type,toX,toY);
				}
				return this.collideLine(type,fromX,fromY,toX,toY,1,p);
			} else return this.collidePoint(type,fromX,toY);
		}
		var xDelta = Math.abs(toX - fromX) | 0, yDelta = Math.abs(toY - fromY) | 0, xSign = toX > fromX?precision:-precision, ySign = toY > fromY?precision:-precision, x = fromX, y = fromY, e;
		if(xDelta > yDelta) {
			ySign *= yDelta / xDelta;
			if(xSign > 0) while(x < toX) {
				if((e = this.collidePoint(type,x,y)) != null) {
					if(p == null) return e;
					if(precision < 2) {
						p.x = x - xSign;
						p.y = y - ySign;
						return e;
					}
					return this.collideLine(type,x - xSign | 0,y - ySign | 0,toX,toY,1,p);
				}
				x += xSign;
				y += ySign;
			} else while(x > toX) {
				if((e = this.collidePoint(type,x,y)) != null) {
					if(p == null) return e;
					if(precision < 2) {
						p.x = x - xSign;
						p.y = y - ySign;
						return e;
					}
					return this.collideLine(type,x - xSign | 0,y - ySign | 0,toX,toY,1,p);
				}
				x += xSign;
				y += ySign;
			}
		} else {
			xSign *= xDelta / yDelta;
			if(ySign > 0) while(y < toY) {
				if((e = this.collidePoint(type,x,y)) != null) {
					if(p == null) return e;
					if(precision < 2) {
						p.x = x - xSign;
						p.y = y - ySign;
						return e;
					}
					return this.collideLine(type,x - xSign | 0,y - ySign | 0,toX,toY,1,p);
				}
				x += xSign;
				y += ySign;
			} else while(y > toY) {
				if((e = this.collidePoint(type,x,y)) != null) {
					if(p == null) return e;
					if(precision < 2) {
						p.x = x - xSign;
						p.y = y - ySign;
						return e;
					}
					return this.collideLine(type,x - xSign | 0,y - ySign | 0,toX,toY,1,p);
				}
				x += xSign;
				y += ySign;
			}
		}
		if(precision > 1) {
			if(p == null) return this.collidePoint(type,toX,toY);
			if(this.collidePoint(type,toX,toY) != null) return this.collideLine(type,x - xSign | 0,y - ySign | 0,toX,toY,1,p);
		}
		if(p != null) {
			p.x = toX;
			p.y = toY;
		}
		return null;
	}
	,collidePoint: function(type,pX,pY) {
		var e, fe = this._typeFirst.get(type), result = null;
		while(fe != null) {
			e = js.Boot.__cast(fe , com.haxepunk.Entity);
			if(e.collidable && e.collidePoint(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x,e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y,pX,pY)) {
				if(result == null) result = e; else if(e._layer < result._layer) result = e;
			}
			fe = fe._typeNext;
		}
		return result;
	}
	,collideRect: function(type,rX,rY,rWidth,rHeight) {
		var e, fe = this._typeFirst.get(type);
		while(fe != null) {
			e = js.Boot.__cast(fe , com.haxepunk.Entity);
			if(e.collidable && e.collideRect(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x,e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y,rX,rY,rWidth,rHeight)) return e;
			fe = fe._typeNext;
		}
		return null;
	}
	,isAtBack: function(e) {
		var fe = e;
		return fe._renderNext == null;
	}
	,isAtFront: function(e) {
		var fe = e;
		return fe._renderPrev == null;
	}
	,sendBackward: function(e) {
		var fe = e;
		if(fe._scene != this || fe._renderNext == null) return false;
		fe._renderNext._renderPrev = fe._renderPrev;
		if(fe._renderPrev != null) fe._renderPrev._renderNext = fe._renderNext; else this._renderFirst.set(fe._layer,fe._renderNext);
		fe._renderPrev = fe._renderNext;
		fe._renderNext = fe._renderNext._renderNext;
		fe._renderPrev._renderNext = e;
		if(fe._renderNext != null) fe._renderNext._renderPrev = e; else this._renderLast.set(fe._layer,e);
		return true;
	}
	,bringForward: function(e) {
		var fe = e;
		if(fe._scene != this || fe._renderPrev == null) return false;
		fe._renderPrev._renderNext = fe._renderNext;
		if(fe._renderNext != null) fe._renderNext._renderPrev = fe._renderPrev; else this._renderLast.set(fe._layer,fe._renderPrev);
		fe._renderNext = fe._renderPrev;
		fe._renderPrev = fe._renderPrev._renderPrev;
		fe._renderNext._renderPrev = e;
		if(fe._renderPrev != null) fe._renderPrev._renderNext = e; else this._renderFirst.set(fe._layer,e);
		return true;
	}
	,sendToBack: function(e) {
		var fe = e;
		if(fe._scene != this || fe._renderNext == null) return false;
		fe._renderNext._renderPrev = fe._renderPrev;
		if(fe._renderPrev != null) fe._renderPrev._renderNext = fe._renderNext; else this._renderFirst.set(fe._layer,fe._renderNext);
		fe._renderPrev = this._renderLast.get(fe._layer);
		fe._renderPrev._renderNext = e;
		this._renderLast.set(fe._layer,e);
		fe._renderNext = null;
		return true;
	}
	,bringToFront: function(e) {
		var fe = e;
		if(fe._scene != this || fe._renderPrev == null) return false;
		fe._renderPrev._renderNext = fe._renderNext;
		if(fe._renderNext != null) fe._renderNext._renderPrev = fe._renderPrev; else this._renderLast.set(fe._layer,fe._renderPrev);
		fe._renderNext = this._renderFirst.get(fe._layer);
		fe._renderNext._renderPrev = e;
		this._renderFirst.set(fe._layer,e);
		fe._renderPrev = null;
		return true;
	}
	,clearRecycledAll: function() {
		var e, fe;
		var $it0 = ((function(_e) {
			return function() {
				return _e.iterator();
			};
		})(this._recycled))();
		while( $it0.hasNext() ) {
			var e1 = $it0.next();
			fe = e1;
			this.clearRecycled(fe._class);
		}
	}
	,clearRecycled: function(classType) {
		var e = this._recycled.get(classType), fe, n;
		while(e != null) {
			fe = e;
			n = fe._recycleNext;
			fe._recycleNext = null;
			e = n;
		}
		this._recycled.set(classType,null);
	}
	,recycle: function(e) {
		this._recycle[this._recycle.length] = e;
		return this.remove(e);
	}
	,create: function(classType,addToScene,constructorsArgs) {
		if(addToScene == null) addToScene = true;
		var className = Type.getClassName(classType);
		var fe = this._recycled.get(className);
		if(fe != null) {
			this._recycled.set(className,fe._recycleNext);
			fe._recycleNext = null;
		} else if(constructorsArgs != null) fe = Type.createInstance(classType,constructorsArgs); else fe = Type.createInstance(classType,[]);
		var e = fe;
		if(addToScene) return this.add(e);
		return e;
	}
	,addMask: function(mask,type,x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		var e = new com.haxepunk.Entity(x,y,null,mask);
		if(type != "") e.set_type(type);
		e.active = e.visible = false;
		return this.add(e);
	}
	,addGraphic: function(graphic,layer,x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		if(layer == null) layer = 0;
		var e = new com.haxepunk.Entity(x,y,graphic);
		e.set_layer(layer);
		e.active = false;
		return this.add(e);
	}
	,removeList: function(list) {
		var $it0 = $iterator(list)();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			this.remove(e);
		}
	}
	,addList: function(list) {
		var $it0 = $iterator(list)();
		while( $it0.hasNext() ) {
			var e = $it0.next();
			this.add(e);
		}
	}
	,removeAll: function() {
		var fe = this._updateFirst;
		while(fe != null) {
			this._remove[this._remove.length] = js.Boot.__cast(fe , com.haxepunk.Entity);
			fe = fe._updateNext;
		}
	}
	,remove: function(e) {
		this._remove[this._remove.length] = e;
		return e;
	}
	,add: function(e) {
		this._add[this._add.length] = e;
		return e;
	}
	,get_sprite: function() {
		return this._sprite;
	}
	,get_mouseY: function() {
		return com.haxepunk.HXP.screen.get_mouseY() + this.camera.y | 0;
	}
	,get_mouseX: function() {
		return com.haxepunk.HXP.screen.get_mouseX() + this.camera.x | 0;
	}
	,render: function() {
		if(this._layerSort) {
			if(this._layerList.length > 1) this._layerList.sort($bind(this,this.layerSort));
			this._layerSort = false;
		}
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) {
			com.haxepunk.graphics.atlas.AtlasData._scene = this;
			com.haxepunk.graphics.atlas.AtlasData._scene._sprite.get_graphics().clear();
		}
		var e, fe;
		var _g = 0, _g1 = this._layerList;
		while(_g < _g1.length) {
			var layer = _g1[_g];
			++_g;
			if(!(!this._layerDisplay.exists(layer) || this._layerDisplay.get(layer))) continue;
			fe = this._renderLast.get(layer);
			while(fe != null) {
				e = js.Boot.__cast(fe , com.haxepunk.Entity);
				if(e.visible) e.render();
				fe = fe._renderPrev;
			}
		}
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) {
			if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != null) com.haxepunk.graphics.atlas.AtlasData._lastAtlas.flush();
			com.haxepunk.graphics.atlas.AtlasData._lastAtlas = null;
		}
	}
	,layerSort: function(a,b) {
		return b - a;
	}
	,layerVisible: function(layer) {
		return !this._layerDisplay.exists(layer) || this._layerDisplay.get(layer);
	}
	,showLayer: function(layer,show) {
		if(show == null) show = true;
		this._layerDisplay.set(layer,show);
	}
	,update: function() {
		var e, fe = this._updateFirst;
		while(fe != null) {
			e = js.Boot.__cast(fe , com.haxepunk.Entity);
			if(e.active) {
				if(e.get_hasTween()) e.updateTweens();
				e.update();
			}
			if(e._graphic != null && e._graphic.active) e._graphic.update();
			fe = fe._updateNext;
		}
	}
	,focusLost: function() {
	}
	,focusGained: function() {
	}
	,end: function() {
	}
	,begin: function() {
	}
	,__class__: com.haxepunk.Scene
	,__properties__: $extend(com.haxepunk.Tweener.prototype.__properties__,{get_mouseX:"get_mouseX",get_mouseY:"get_mouseY",get_sprite:"get_sprite",get_count:"get_count",get_first:"get_first",get_layers:"get_layers",get_farthest:"get_farthest",get_nearest:"get_nearest",get_layerFarthest:"get_layerFarthest",get_layerNearest:"get_layerNearest",get_uniqueTypes:"get_uniqueTypes"})
});
var MainScene = function() {
	com.haxepunk.Scene.call(this);
};
$hxClasses["MainScene"] = MainScene;
MainScene.__name__ = ["MainScene"];
MainScene.__super__ = com.haxepunk.Scene;
MainScene.prototype = $extend(com.haxepunk.Scene.prototype,{
	update: function() {
		com.haxepunk.Scene.prototype.update.call(this);
		this.explosion.explode(30,40);
	}
	,begin: function() {
		this.explosion = new Explosion();
		this.add(this.explosion);
	}
	,__class__: MainScene
});
var IMap = function() { }
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
var NMEPreloader = function() {
	flash.display.Sprite.call(this);
	var backgroundColor = this.getBackgroundColor();
	var r = backgroundColor >> 16 & 255;
	var g = backgroundColor >> 8 & 255;
	var b = backgroundColor & 255;
	var perceivedLuminosity = 0.299 * r + 0.587 * g + 0.114 * b;
	var color = 0;
	if(perceivedLuminosity < 70) color = 16777215;
	var x = 30;
	var height = 9;
	var y = this.getHeight() / 2 - height / 2;
	var width = this.getWidth() - x * 2;
	var padding = 3;
	this.outline = new flash.display.Sprite();
	this.outline.get_graphics().lineStyle(1,color,0.15,true);
	this.outline.get_graphics().drawRoundRect(0,0,width,height,padding * 2,padding * 2);
	this.outline.set_x(x);
	this.outline.set_y(y);
	this.addChild(this.outline);
	this.progress = new flash.display.Sprite();
	this.progress.get_graphics().beginFill(color,0.35);
	this.progress.get_graphics().drawRect(0,0,width - padding * 2,height - padding * 2);
	this.progress.set_x(x + padding);
	this.progress.set_y(y + padding);
	this.progress.set_scaleX(0);
	this.addChild(this.progress);
};
$hxClasses["NMEPreloader"] = NMEPreloader;
NMEPreloader.__name__ = ["NMEPreloader"];
NMEPreloader.__super__ = flash.display.Sprite;
NMEPreloader.prototype = $extend(flash.display.Sprite.prototype,{
	onUpdate: function(bytesLoaded,bytesTotal) {
		var percentLoaded = bytesLoaded / bytesTotal;
		if(percentLoaded > 1) percentLoaded == 1;
		this.progress.set_scaleX(percentLoaded);
	}
	,onLoaded: function() {
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	}
	,onInit: function() {
	}
	,getWidth: function() {
		var width = 640;
		if(width > 0) return width; else return flash.Lib.get_current().get_stage().get_stageWidth();
	}
	,getHeight: function() {
		var height = 480;
		if(height > 0) return height; else return flash.Lib.get_current().get_stage().get_stageHeight();
	}
	,getBackgroundColor: function() {
		return 3355443;
	}
	,__class__: NMEPreloader
});
var Reflect = function() { }
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
}
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
}
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && v.__enum__ == null || t == "function" && (v.__name__ || v.__ename__) != null;
}
Reflect.deleteField = function(o,field) {
	if(!Reflect.hasField(o,field)) return false;
	delete(o[field]);
	return true;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
}
var Std = function() { }
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	addSub: function(s,pos,len) {
		this.b += len == null?HxOverrides.substr(s,pos,null):HxOverrides.substr(s,pos,len);
	}
	,__class__: StringBuf
}
var StringTools = function() { }
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && HxOverrides.substr(s,0,start.length) == start;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
var Type = function() { }
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	return o.__class__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
}
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
}
var XmlType = $hxClasses["XmlType"] = { __ename__ : true, __constructs__ : [] }
var Xml = function() {
};
$hxClasses["Xml"] = Xml;
Xml.__name__ = ["Xml"];
Xml.parse = function(str) {
	return haxe.xml.Parser.parse(str);
}
Xml.createElement = function(name) {
	var r = new Xml();
	r.nodeType = Xml.Element;
	r._children = new Array();
	r._attributes = new haxe.ds.StringMap();
	r.set_nodeName(name);
	return r;
}
Xml.createPCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.PCData;
	r.set_nodeValue(data);
	return r;
}
Xml.createCData = function(data) {
	var r = new Xml();
	r.nodeType = Xml.CData;
	r.set_nodeValue(data);
	return r;
}
Xml.createComment = function(data) {
	var r = new Xml();
	r.nodeType = Xml.Comment;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocType = function(data) {
	var r = new Xml();
	r.nodeType = Xml.DocType;
	r.set_nodeValue(data);
	return r;
}
Xml.createProcessingInstruction = function(data) {
	var r = new Xml();
	r.nodeType = Xml.ProcessingInstruction;
	r.set_nodeValue(data);
	return r;
}
Xml.createDocument = function() {
	var r = new Xml();
	r.nodeType = Xml.Document;
	r._children = new Array();
	return r;
}
Xml.prototype = {
	addChild: function(x) {
		if(this._children == null) throw "bad nodetype";
		if(x._parent != null) HxOverrides.remove(x._parent._children,x);
		x._parent = this;
		this._children.push(x);
	}
	,firstElement: function() {
		if(this._children == null) throw "bad nodetype";
		var cur = 0;
		var l = this._children.length;
		while(cur < l) {
			var n = this._children[cur];
			if(n.nodeType == Xml.Element) return n;
			cur++;
		}
		return null;
	}
	,elements: function() {
		if(this._children == null) throw "bad nodetype";
		return { cur : 0, x : this._children, hasNext : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				if(this.x[k].nodeType == Xml.Element) break;
				k += 1;
			}
			this.cur = k;
			return k < l;
		}, next : function() {
			var k = this.cur;
			var l = this.x.length;
			while(k < l) {
				var n = this.x[k];
				k += 1;
				if(n.nodeType == Xml.Element) {
					this.cur = k;
					return n;
				}
			}
			return null;
		}};
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.exists(att);
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		this._attributes.set(att,value);
	}
	,get: function(att) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._attributes.get(att);
	}
	,set_nodeValue: function(v) {
		if(this.nodeType == Xml.Element || this.nodeType == Xml.Document) throw "bad nodeType";
		return this._nodeValue = v;
	}
	,set_nodeName: function(n) {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName = n;
	}
	,get_nodeName: function() {
		if(this.nodeType != Xml.Element) throw "bad nodeType";
		return this._nodeName;
	}
	,__class__: Xml
}
com.haxepunk.Graphic = function() {
	this.active = false;
	this.set_visible(true);
	this.x = this.y = 0;
	this.scrollX = this.scrollY = 1;
	this.relative = true;
	this._scroll = true;
	this._point = new flash.geom.Point();
};
$hxClasses["com.haxepunk.Graphic"] = com.haxepunk.Graphic;
com.haxepunk.Graphic.__name__ = ["com","haxepunk","Graphic"];
com.haxepunk.Graphic.prototype = {
	resume: function() {
		this.active = true;
	}
	,pause: function() {
		this.active = false;
	}
	,renderAtlas: function(layer,point,camera) {
	}
	,render: function(target,point,camera) {
	}
	,destroy: function() {
	}
	,update: function() {
	}
	,set_visible: function(value) {
		return this._visible = value;
	}
	,get_visible: function() {
		return this._visible;
	}
	,__class__: com.haxepunk.Graphic
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible"}
}
flash.geom = {}
flash.geom.Point = function(inX,inY) {
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
};
$hxClasses["flash.geom.Point"] = flash.geom.Point;
flash.geom.Point.__name__ = ["flash","geom","Point"];
flash.geom.Point.distance = function(pt1,pt2) {
	var dx = pt1.x - pt2.x;
	var dy = pt1.y - pt2.y;
	return Math.sqrt(dx * dx + dy * dy);
}
flash.geom.Point.interpolate = function(pt1,pt2,f) {
	return new flash.geom.Point(pt2.x + f * (pt1.x - pt2.x),pt2.y + f * (pt1.y - pt2.y));
}
flash.geom.Point.polar = function(len,angle) {
	return new flash.geom.Point(len * Math.cos(angle),len * Math.sin(angle));
}
flash.geom.Point.prototype = {
	get_length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	,subtract: function(v) {
		return new flash.geom.Point(this.x - v.x,this.y - v.y);
	}
	,setTo: function(xa,ya) {
		this.x = xa;
		this.y = ya;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,normalize: function(thickness) {
		if(this.x == 0 && this.y == 0) return; else {
			var norm = thickness / Math.sqrt(this.x * this.x + this.y * this.y);
			this.x *= norm;
			this.y *= norm;
		}
	}
	,equals: function(toCompare) {
		return toCompare.x == this.x && toCompare.y == this.y;
	}
	,clone: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,add: function(v) {
		return new flash.geom.Point(v.x + this.x,v.y + this.y);
	}
	,__class__: flash.geom.Point
	,__properties__: {get_length:"get_length"}
}
flash.display.Graphics = function(inSurface) {
	flash.Lib.__bootstrap();
	if(inSurface == null) {
		this.__surface = js.Browser.document.createElement("canvas");
		this.__surface.width = 0;
		this.__surface.height = 0;
	} else this.__surface = inSurface;
	this.mLastMoveID = 0;
	this.mPenX = 0.0;
	this.mPenY = 0.0;
	this.mDrawList = new Array();
	this.mPoints = [];
	this.mSolidGradient = null;
	this.mBitmap = null;
	this.mFilling = false;
	this.mFillColour = 0;
	this.mFillAlpha = 0.0;
	this.mLastMoveID = 0;
	this.boundsDirty = true;
	this.__clearLine();
	this.mLineJobs = [];
	this.__changed = true;
	this.nextDrawIndex = 0;
	this.__extent = new flash.geom.Rectangle();
	this.__extentWithFilters = new flash.geom.Rectangle();
	this._padding = 0.0;
	this.__clearNextCycle = true;
};
$hxClasses["flash.display.Graphics"] = flash.display.Graphics;
flash.display.Graphics.__name__ = ["flash","display","Graphics"];
flash.display.Graphics.__detectIsPointInPathMode = function() {
	var canvas = js.Browser.document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	if(ctx.isPointInPath == null) return flash.display.PointInPathMode.USER_SPACE;
	ctx.save();
	ctx.translate(1,0);
	ctx.beginPath();
	ctx.rect(0,0,1,1);
	var rv = ctx.isPointInPath(0.3,0.3)?flash.display.PointInPathMode.USER_SPACE:flash.display.PointInPathMode.DEVICE_SPACE;
	ctx.restore();
	return rv;
}
flash.display.Graphics.prototype = {
	__render: function(maskHandle,filters,sx,sy,clip0,clip1,clip2,clip3) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(!this.__changed) return false;
		this.closePolygon(true);
		var padding = this._padding;
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(Reflect.hasField(filter,"blurX")) padding += Math.max(Reflect.field(filter,"blurX"),Reflect.field(filter,"blurY")) * 4;
			}
		}
		this.__expandFilteredExtent(-(padding * sx) / 2,-(padding * sy) / 2);
		if(this.__clearNextCycle) {
			this.nextDrawIndex = 0;
			this.__clearCanvas();
			this.__clearNextCycle = false;
		}
		if(this.__extentWithFilters.width - this.__extentWithFilters.x > this.__surface.width || this.__extentWithFilters.height - this.__extentWithFilters.y > this.__surface.height) this.__adjustSurface(sx,sy);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.__surface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(clip0 != null) {
			ctx.beginPath();
			ctx.moveTo(clip0.x * sx,clip0.y * sy);
			ctx.lineTo(clip1.x * sx,clip1.y * sy);
			ctx.lineTo(clip2.x * sx,clip2.y * sy);
			ctx.lineTo(clip3.x * sx,clip3.y * sy);
			ctx.closePath();
			ctx.clip();
		}
		if(filters != null) {
			var _g = 0;
			while(_g < filters.length) {
				var filter = filters[_g];
				++_g;
				if(js.Boot.__instanceof(filter,flash.filters.DropShadowFilter)) filter.__applyFilter(this.__surface,null,true);
			}
		}
		var len = this.mDrawList.length;
		ctx.save();
		if(this.__extentWithFilters.x != 0 || this.__extentWithFilters.y != 0) ctx.translate(-this.__extentWithFilters.x * sx,-this.__extentWithFilters.y * sy);
		if(sx != 1 || sy != 0) ctx.scale(sx,sy);
		var doStroke = false;
		var _g = this.nextDrawIndex;
		while(_g < len) {
			var i = _g++;
			var d = this.mDrawList[len - 1 - i];
			if(d.tileJob != null) this.__drawTiles(d.tileJob.sheet,d.tileJob.drawList,d.tileJob.flags); else {
				if(d.lineJobs.length > 0) {
					var _g1 = 0, _g2 = d.lineJobs;
					while(_g1 < _g2.length) {
						var lj = _g2[_g1];
						++_g1;
						ctx.lineWidth = lj.thickness;
						switch(lj.joints) {
						case 0:
							ctx.lineJoin = "round";
							break;
						case 4096:
							ctx.lineJoin = "miter";
							break;
						case 8192:
							ctx.lineJoin = "bevel";
							break;
						}
						switch(lj.caps) {
						case 256:
							ctx.lineCap = "round";
							break;
						case 512:
							ctx.lineCap = "square";
							break;
						case 0:
							ctx.lineCap = "butt";
							break;
						}
						ctx.miterLimit = lj.miter_limit;
						if(lj.grad != null) ctx.strokeStyle = this.createCanvasGradient(ctx,lj.grad); else ctx.strokeStyle = this.createCanvasColor(lj.colour,lj.alpha);
						ctx.beginPath();
						var _g4 = lj.point_idx0, _g3 = lj.point_idx1 + 1;
						while(_g4 < _g3) {
							var i1 = _g4++;
							var p = d.points[i1];
							switch(p.type) {
							case 0:
								ctx.moveTo(p.x,p.y);
								break;
							case 2:
								ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
								break;
							default:
								ctx.lineTo(p.x,p.y);
							}
						}
						ctx.closePath();
						doStroke = true;
					}
				} else {
					ctx.beginPath();
					var _g1 = 0, _g2 = d.points;
					while(_g1 < _g2.length) {
						var p = _g2[_g1];
						++_g1;
						switch(p.type) {
						case 0:
							ctx.moveTo(p.x,p.y);
							break;
						case 2:
							ctx.quadraticCurveTo(p.cx,p.cy,p.x,p.y);
							break;
						default:
							ctx.lineTo(p.x,p.y);
						}
					}
					ctx.closePath();
				}
				var fillColour = d.fillColour;
				var fillAlpha = d.fillAlpha;
				var g = d.solidGradient;
				var bitmap = d.bitmap;
				if(g != null) ctx.fillStyle = this.createCanvasGradient(ctx,g); else if(bitmap != null && (bitmap.flags & 16) > 0) {
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					if((bitmap.flags & 65536) == 0) {
						ctx.mozImageSmoothingEnabled = false;
						ctx.webkitImageSmoothingEnabled = false;
					}
					ctx.fillStyle = ctx.createPattern(bitmap.texture_buffer,"repeat");
				} else ctx.fillStyle = this.createCanvasColor(fillColour,Math.min(1.0,Math.max(0.0,fillAlpha)));
				ctx.fill();
				if(doStroke) ctx.stroke();
				ctx.save();
				if(bitmap != null && (bitmap.flags & 16) == 0) {
					ctx.clip();
					var img = bitmap.texture_buffer;
					var m = bitmap.matrix;
					if(m != null) ctx.transform(m.a,m.b,m.c,m.d,m.tx,m.ty);
					ctx.drawImage(img,0,0);
				}
				ctx.restore();
			}
		}
		ctx.restore();
		this.__changed = false;
		this.nextDrawIndex = len > 0?len - 1:0;
		this.mDrawList = [];
		return true;
	}
	,__mediaSurface: function(surface) {
		this.__surface = surface;
	}
	,__invalidate: function() {
		this.__changed = true;
		this.__clearNextCycle = true;
	}
	,__hitTest: function(inX,inY) {
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.__surface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx == null) return false;
		if(ctx.isPointInPath(inX,inY)) return true; else if(this.mDrawList.length == 0 && this.__extent.width > 0 && this.__extent.height > 0) return true;
		return false;
	}
	,__expandStandardExtent: function(x,y,thickness) {
		if(thickness == null) thickness = 0;
		if(this._padding > 0) {
			this.__extent.width -= this._padding;
			this.__extent.height -= this._padding;
		}
		if(thickness != null && thickness > this._padding) this._padding = thickness;
		var maxX, minX, maxY, minY;
		minX = this.__extent.x;
		minY = this.__extent.y;
		maxX = this.__extent.width + minX;
		maxY = this.__extent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.__extent.x = minX;
		this.__extent.y = minY;
		this.__extent.width = maxX - minX + this._padding;
		this.__extent.height = maxY - minY + this._padding;
		this.boundsDirty = true;
	}
	,__expandFilteredExtent: function(x,y) {
		var maxX, minX, maxY, minY;
		minX = this.__extent.x;
		minY = this.__extent.y;
		maxX = this.__extent.width + minX;
		maxY = this.__extent.height + minY;
		maxX = x > maxX?x:maxX;
		minX = x < minX?x:minX;
		maxY = y > maxY?y:maxY;
		minY = y < minY?y:minY;
		this.__extentWithFilters.x = minX;
		this.__extentWithFilters.y = minY;
		this.__extentWithFilters.width = maxX - minX;
		this.__extentWithFilters.height = maxY - minY;
	}
	,__drawTiles: function(sheet,tileData,flags) {
		if(flags == null) flags = 0;
		var useScale = (flags & 1) > 0;
		var useRotation = (flags & 2) > 0;
		var useTransform = (flags & 16) > 0;
		var useRGB = (flags & 4) > 0;
		var useAlpha = (flags & 8) > 0;
		if(useTransform) {
			useScale = false;
			useRotation = false;
		}
		var scaleIndex = 0;
		var rotationIndex = 0;
		var rgbIndex = 0;
		var alphaIndex = 0;
		var transformIndex = 0;
		var numValues = 3;
		if(useScale) {
			scaleIndex = numValues;
			numValues++;
		}
		if(useRotation) {
			rotationIndex = numValues;
			numValues++;
		}
		if(useTransform) {
			transformIndex = numValues;
			numValues += 4;
		}
		if(useRGB) {
			rgbIndex = numValues;
			numValues += 3;
		}
		if(useAlpha) {
			alphaIndex = numValues;
			numValues++;
		}
		var totalCount = tileData.length;
		var itemCount = totalCount / numValues | 0;
		var index = 0;
		var rect = null;
		var center = null;
		var previousTileID = -1;
		var surface = sheet.__bitmap.___textureBuffer;
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.__surface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) while(index < totalCount) {
			var tileID = tileData[index + 2] | 0;
			if(tileID != previousTileID) {
				rect = sheet.__tileRects[tileID];
				center = sheet.__centerPoints[tileID];
				previousTileID = tileID;
			}
			if(rect != null && center != null) {
				ctx.save();
				ctx.translate(tileData[index],tileData[index + 1]);
				if(useRotation) ctx.rotate(tileData[index + rotationIndex]);
				var scale = 1.0;
				if(useScale) scale = tileData[index + scaleIndex];
				if(useTransform) ctx.transform(tileData[index + transformIndex],tileData[index + transformIndex + 1],tileData[index + transformIndex + 2],tileData[index + transformIndex + 3],0,0);
				if(useAlpha) ctx.globalAlpha = tileData[index + alphaIndex];
				ctx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,-center.x * scale,-center.y * scale,rect.width * scale,rect.height * scale);
				ctx.restore();
			}
			index += numValues;
		}
	}
	,__drawEllipse: function(x,y,rx,ry) {
		this.moveTo(x + rx,y);
		this.curveTo(rx + x,-0.4142 * ry + y,0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(0.4142 * rx + x,-ry + y,x,-ry + y);
		this.curveTo(-0.4142 * rx + x,-ry + y,-0.7071 * rx + x,-0.7071 * ry + y);
		this.curveTo(-rx + x,-0.4142 * ry + y,-rx + x,y);
		this.curveTo(-rx + x,0.4142 * ry + y,-0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(-0.4142 * rx + x,ry + y,x,ry + y);
		this.curveTo(0.4142 * rx + x,ry + y,0.7071 * rx + x,0.7071 * ry + y);
		this.curveTo(rx + x,0.4142 * ry + y,rx + x,y);
	}
	,__clearLine: function() {
		this.mCurrentLine = new flash.display.LineJob(null,-1,-1,0.0,0.0,0,1,0,256,3,3.0);
	}
	,__clearCanvas: function() {
		if(this.__surface != null) {
			var ctx = (function($this) {
				var $r;
				try {
					$r = $this.__surface.getContext("2d");
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(ctx != null) ctx.clearRect(0,0,this.__surface.width,this.__surface.height);
		}
	}
	,__adjustSurface: function(sx,sy) {
		if(sy == null) sy = 1.0;
		if(sx == null) sx = 1.0;
		if(Reflect.field(this.__surface,"getContext") != null) {
			var width = Math.ceil((this.__extentWithFilters.width - this.__extentWithFilters.x) * sx);
			var height = Math.ceil((this.__extentWithFilters.height - this.__extentWithFilters.y) * sy);
			if(width <= 5000 && height <= 5000) {
				var dstCanvas = js.Browser.document.createElement("canvas");
				dstCanvas.width = width;
				dstCanvas.height = height;
				flash.Lib.__drawToSurface(this.__surface,dstCanvas);
				if(flash.Lib.__isOnStage(this.__surface)) {
					flash.Lib.__appendSurface(dstCanvas);
					flash.Lib.__copyStyle(this.__surface,dstCanvas);
					flash.Lib.__swapSurface(this.__surface,dstCanvas);
					flash.Lib.__removeSurface(this.__surface);
					if(this.__surface.id != null) flash.Lib.__setSurfaceId(dstCanvas,this.__surface.id);
				}
				this.__surface = dstCanvas;
			}
		}
	}
	,moveTo: function(inX,inY) {
		this.mPenX = inX;
		this.mPenY = inY;
		this.__expandStandardExtent(inX,inY);
		if(!this.mFilling) this.closePolygon(false); else {
			this.addLineSegment();
			this.mLastMoveID = this.mPoints.length;
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
		}
	}
	,lineTo: function(inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.__expandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,1));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
		if(!this.mFilling) this.closePolygon(false);
	}
	,lineStyle: function(thickness,color,alpha,pixelHinting,scaleMode,caps,joints,miterLimit) {
		this.addLineSegment();
		if(thickness == null) {
			this.__clearLine();
			return;
		} else {
			this.mCurrentLine.grad = null;
			this.mCurrentLine.thickness = thickness;
			this.mCurrentLine.colour = color == null?0:color;
			this.mCurrentLine.alpha = alpha == null?1.0:alpha;
			this.mCurrentLine.miter_limit = miterLimit == null?3.0:miterLimit;
			this.mCurrentLine.pixel_hinting = pixelHinting == null || !pixelHinting?0:16384;
		}
		if(caps != null) {
			switch( (caps)[1] ) {
			case 1:
				this.mCurrentLine.caps = 256;
				break;
			case 2:
				this.mCurrentLine.caps = 512;
				break;
			case 0:
				this.mCurrentLine.caps = 0;
				break;
			}
		}
		this.mCurrentLine.scale_mode = 3;
		if(scaleMode != null) {
			switch( (scaleMode)[1] ) {
			case 2:
				this.mCurrentLine.scale_mode = 3;
				break;
			case 3:
				this.mCurrentLine.scale_mode = 1;
				break;
			case 0:
				this.mCurrentLine.scale_mode = 2;
				break;
			case 1:
				this.mCurrentLine.scale_mode = 0;
				break;
			}
		}
		this.mCurrentLine.joints = 0;
		if(joints != null) {
			switch( (joints)[1] ) {
			case 1:
				this.mCurrentLine.joints = 0;
				break;
			case 0:
				this.mCurrentLine.joints = 4096;
				break;
			case 2:
				this.mCurrentLine.joints = 8192;
				break;
			}
		}
	}
	,lineGradientStyle: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.mCurrentLine.grad = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,getContext: function() {
		try {
			return this.__surface.getContext("2d");
		} catch( e ) {
			return null;
		}
	}
	,flush: function() {
		this.closePolygon(true);
	}
	,endFill: function() {
		this.closePolygon(true);
	}
	,drawTiles: function(sheet,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		this.__expandStandardExtent(flash.Lib.get_current().get_stage().get_stageWidth(),flash.Lib.get_current().get_stage().get_stageHeight());
		this.addDrawable(new flash.display.Drawable(null,null,null,null,null,null,new flash.display.TileJob(sheet,tileData,flags)));
		this.__changed = true;
	}
	,drawRoundRect: function(x,y,width,height,rx,ry) {
		if(ry == null) ry = -1;
		if(ry == -1) ry = rx;
		rx *= 0.5;
		ry *= 0.5;
		var w = width * 0.5;
		x += w;
		if(rx > w) rx = w;
		var lw = w - rx;
		var w_ = lw + rx * Math.sin(Math.PI / 4);
		var cw_ = lw + rx * Math.tan(Math.PI / 8);
		var h = height * 0.5;
		y += h;
		if(ry > h) ry = h;
		var lh = h - ry;
		var h_ = lh + ry * Math.sin(Math.PI / 4);
		var ch_ = lh + ry * Math.tan(Math.PI / 8);
		this.closePolygon(false);
		this.moveTo(x + w,y + lh);
		this.curveTo(x + w,y + ch_,x + w_,y + h_);
		this.curveTo(x + cw_,y + h,x + lw,y + h);
		this.lineTo(x - lw,y + h);
		this.curveTo(x - cw_,y + h,x - w_,y + h_);
		this.curveTo(x - w,y + ch_,x - w,y + lh);
		this.lineTo(x - w,y - lh);
		this.curveTo(x - w,y - ch_,x - w_,y - h_);
		this.curveTo(x - cw_,y - h,x - lw,y - h);
		this.lineTo(x + lw,y - h);
		this.curveTo(x + cw_,y - h,x + w_,y - h_);
		this.curveTo(x + w,y - ch_,x + w,y - lh);
		this.lineTo(x + w,y + lh);
		this.closePolygon(false);
	}
	,drawRect: function(x,y,width,height) {
		this.closePolygon(false);
		this.moveTo(x,y);
		this.lineTo(x + width,y);
		this.lineTo(x + width,y + height);
		this.lineTo(x,y + height);
		this.lineTo(x,y);
		this.closePolygon(false);
	}
	,drawGraphicsData: function(points) {
		var $it0 = ((function(_e) {
			return function() {
				return $iterator(flash._Vector.Vector_Impl_)(_e);
			};
		})(points))();
		while( $it0.hasNext() ) {
			var data = $it0.next();
			if(data == null) this.mFilling = true; else switch(data.__graphicsDataType) {
			case flash.display.GraphicsDataType.STROKE:
				var stroke = data;
				if(stroke.fill == null) this.lineStyle(stroke.thickness,0,1.,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit); else switch(stroke.fill.__graphicsFillType) {
				case flash.display.GraphicsFillType.SOLID_FILL:
					var fill = stroke.fill;
					this.lineStyle(stroke.thickness,fill.color,fill.alpha,stroke.pixelHinting,stroke.scaleMode,stroke.caps,stroke.joints,stroke.miterLimit);
					break;
				case flash.display.GraphicsFillType.GRADIENT_FILL:
					var fill = stroke.fill;
					this.lineGradientStyle(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
					break;
				}
				break;
			case flash.display.GraphicsDataType.PATH:
				var path = data;
				var j = 0;
				var _g1 = 0, _g = flash._Vector.Vector_Impl_.get_length(path.commands);
				while(_g1 < _g) {
					var i = _g1++;
					var command = path.commands[i];
					switch(command) {
					case 1:
						this.moveTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 2:
						this.lineTo(path.data[j],path.data[j + 1]);
						j = j + 2;
						break;
					case 3:
						this.curveTo(path.data[j],path.data[j + 1],path.data[j + 2],path.data[j + 3]);
						j = j + 4;
						break;
					}
				}
				break;
			case flash.display.GraphicsDataType.SOLID:
				var fill = data;
				this.beginFill(fill.color,fill.alpha);
				break;
			case flash.display.GraphicsDataType.GRADIENT:
				var fill = data;
				this.beginGradientFill(fill.type,fill.colors,fill.alphas,fill.ratios,fill.matrix,fill.spreadMethod,fill.interpolationMethod,fill.focalPointRatio);
				break;
			}
		}
	}
	,drawEllipse: function(x,y,rx,ry) {
		this.closePolygon(false);
		rx /= 2;
		ry /= 2;
		this.__drawEllipse(x + rx,y + ry,rx,ry);
		this.closePolygon(false);
	}
	,drawCircle: function(x,y,rad) {
		this.closePolygon(false);
		this.__drawEllipse(x,y,rad,rad);
		this.closePolygon(false);
	}
	,curveTo: function(inCX,inCY,inX,inY) {
		var pid = this.mPoints.length;
		if(pid == 0) {
			this.mPoints.push(new flash.display.GfxPoint(this.mPenX,this.mPenY,0.0,0.0,0));
			pid++;
		}
		this.mPenX = inX;
		this.mPenY = inY;
		this.__expandStandardExtent(inX,inY,this.mCurrentLine.thickness);
		this.mPoints.push(new flash.display.GfxPoint(inX,inY,inCX,inCY,2));
		if(this.mCurrentLine.grad != null || this.mCurrentLine.alpha > 0) {
			if(this.mCurrentLine.point_idx0 < 0) this.mCurrentLine.point_idx0 = pid - 1;
			this.mCurrentLine.point_idx1 = pid;
		}
	}
	,createGradient: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		var points = new Array();
		var _g1 = 0, _g = colors.length;
		while(_g1 < _g) {
			var i = _g1++;
			points.push(new flash.display.GradPoint(colors[i],alphas[i],ratios[i]));
		}
		var flags = 0;
		if(type == flash.display.GradientType.RADIAL) flags |= 1;
		if(spreadMethod == flash.display.SpreadMethod.REPEAT) flags |= 2; else if(spreadMethod == flash.display.SpreadMethod.REFLECT) flags |= 4;
		if(matrix == null) {
			matrix = new flash.geom.Matrix();
			matrix.createGradientBox(25,25);
		} else matrix = matrix.clone();
		var focal = focalPointRatio == null?0:focalPointRatio;
		return new flash.display.Grad(points,matrix,flags,focal);
	}
	,createCanvasGradient: function(ctx,g) {
		var gradient;
		var matrix = g.matrix;
		if((g.flags & 1) == 0) {
			var p1 = matrix.transformPoint(new flash.geom.Point(-819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(819.2,0));
			gradient = ctx.createLinearGradient(p1.x,p1.y,p2.x,p2.y);
		} else {
			var p1 = matrix.transformPoint(new flash.geom.Point(g.focal * 819.2,0));
			var p2 = matrix.transformPoint(new flash.geom.Point(0,819.2));
			gradient = ctx.createRadialGradient(p1.x,p1.y,0,p2.x,p1.y,p2.y);
		}
		var _g = 0, _g1 = g.points;
		while(_g < _g1.length) {
			var point = _g1[_g];
			++_g;
			var color = this.createCanvasColor(point.col,point.alpha);
			var pos = point.ratio / 255;
			gradient.addColorStop(pos,color);
		}
		return gradient;
	}
	,createCanvasColor: function(color,alpha) {
		var r = (16711680 & color) >> 16;
		var g = (65280 & color) >> 8;
		var b = 255 & color;
		return "rgba" + "(" + r + "," + g + "," + b + "," + alpha + ")";
	}
	,closePolygon: function(inCancelFill) {
		var l = this.mPoints.length;
		if(l > 0) {
			if(l > 1) {
				if(this.mFilling && l > 2) {
					if(this.mPoints[this.mLastMoveID].x != this.mPoints[l - 1].x || this.mPoints[this.mLastMoveID].y != this.mPoints[l - 1].y) this.lineTo(this.mPoints[this.mLastMoveID].x,this.mPoints[this.mLastMoveID].y);
				}
				this.addLineSegment();
				var drawable = new flash.display.Drawable(this.mPoints,this.mFillColour,this.mFillAlpha,this.mSolidGradient,this.mBitmap,this.mLineJobs,null);
				this.addDrawable(drawable);
			}
			this.mLineJobs = [];
			this.mPoints = [];
		}
		if(inCancelFill) {
			this.mFillAlpha = 0;
			this.mSolidGradient = null;
			this.mBitmap = null;
			this.mFilling = false;
		}
		this.__changed = true;
	}
	,clear: function() {
		this.__clearLine();
		this.mPenX = 0.0;
		this.mPenY = 0.0;
		this.mDrawList = new Array();
		this.nextDrawIndex = 0;
		this.mPoints = [];
		this.mSolidGradient = null;
		this.mFilling = false;
		this.mFillColour = 0;
		this.mFillAlpha = 0.0;
		this.mLastMoveID = 0;
		this.__clearNextCycle = true;
		this.boundsDirty = true;
		this.__extent.x = 0.0;
		this.__extent.y = 0.0;
		this.__extent.width = 0.0;
		this.__extent.height = 0.0;
		this._padding = 0.0;
		this.mLineJobs = [];
	}
	,blit: function(inTexture) {
		this.closePolygon(true);
		var ctx = (function($this) {
			var $r;
			try {
				$r = $this.__surface.getContext("2d");
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(ctx != null) ctx.drawImage(inTexture.___textureBuffer,this.mPenX,this.mPenY);
	}
	,beginGradientFill: function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
		this.closePolygon(true);
		this.mFilling = true;
		this.mBitmap = null;
		this.mSolidGradient = this.createGradient(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio);
	}
	,beginFill: function(color,alpha) {
		this.closePolygon(true);
		this.mFillColour = color;
		this.mFillAlpha = alpha == null?1.0:alpha;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.mBitmap = null;
	}
	,beginBitmapFill: function(bitmap,matrix,in_repeat,in_smooth) {
		if(in_smooth == null) in_smooth = false;
		if(in_repeat == null) in_repeat = true;
		this.closePolygon(true);
		var repeat = in_repeat == null?true:in_repeat;
		var smooth = in_smooth == null?false:in_smooth;
		this.mFilling = true;
		this.mSolidGradient = null;
		this.__expandStandardExtent(bitmap.___textureBuffer != null?bitmap.___textureBuffer.width:0,bitmap.___textureBuffer != null?bitmap.___textureBuffer.height:0);
		this.mBitmap = { texture_buffer : bitmap.___textureBuffer, matrix : matrix == null?matrix:matrix.clone(), flags : (repeat?16:0) | (smooth?65536:0)};
	}
	,addLineSegment: function() {
		if(this.mCurrentLine.point_idx1 > 0) this.mLineJobs.push(new flash.display.LineJob(this.mCurrentLine.grad,this.mCurrentLine.point_idx0,this.mCurrentLine.point_idx1,this.mCurrentLine.thickness,this.mCurrentLine.alpha,this.mCurrentLine.colour,this.mCurrentLine.pixel_hinting,this.mCurrentLine.joints,this.mCurrentLine.caps,this.mCurrentLine.scale_mode,this.mCurrentLine.miter_limit));
		this.mCurrentLine.point_idx0 = this.mCurrentLine.point_idx1 = -1;
	}
	,addDrawable: function(inDrawable) {
		if(inDrawable == null) return;
		this.mDrawList.unshift(inDrawable);
	}
	,__class__: flash.display.Graphics
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
}
haxe.Timer.prototype = {
	run: function() {
		haxe.Log.trace("run",{ fileName : "Timer.hx", lineNumber : 98, className : "haxe.Timer", methodName : "run"});
	}
	,__class__: haxe.Timer
}
flash.Lib = function(rootElement,width,height) {
	this.mKilled = false;
	this.__scr = rootElement;
	if(this.__scr == null) throw "Root element not found";
	this.__scr.style.setProperty("overflow","hidden","");
	this.__scr.style.setProperty("position","absolute","");
	if(this.__scr.style.getPropertyValue("width") != "100%") this.__scr.style.width = width + "px";
	if(this.__scr.style.getPropertyValue("height") != "100%") this.__scr.style.height = height + "px";
};
$hxClasses["flash.Lib"] = flash.Lib;
flash.Lib.__name__ = ["flash","Lib"];
flash.Lib.__properties__ = {get_current:"get_current"}
flash.Lib.addCallback = function(functionName,closure) {
	flash.Lib.mMe.__scr[functionName] = closure;
}
flash.Lib["as"] = function(v,c) {
	return js.Boot.__instanceof(v,c)?v:null;
}
flash.Lib.attach = function(name) {
	return new flash.display.MovieClip();
}
flash.Lib.getTimer = function() {
	return (haxe.Timer.stamp() - flash.Lib.starttime) * 1000 | 0;
}
flash.Lib.getURL = function(request,target) {
	if(target == null) target = "_blank";
	window.open(request.url,target);
}
flash.Lib.preventDefaultTouchMove = function() {
	js.Browser.document.addEventListener("touchmove",function(evt) {
		evt.preventDefault();
	},false);
}
flash.Lib.Run = function(tgt,width,height) {
	flash.Lib.mMe = new flash.Lib(tgt,width,height);
	var _g1 = 0, _g = tgt.attributes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var attr = tgt.attributes.item(i);
		if(StringTools.startsWith(attr.name,"data-")) {
			if(attr.name == "data-" + "framerate") flash.Lib.__getStage().set_frameRate(Std.parseFloat(attr.value));
		}
	}
	var _g = 0, _g1 = flash.Lib.HTML_TOUCH_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	}
	var _g = 0, _g1 = flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	}
	var _g = 0, _g1 = flash.Lib.HTML_DIV_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		tgt.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	}
	if(Reflect.hasField(js.Browser.window,"on" + "devicemotion")) js.Browser.window.addEventListener("devicemotion",($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	if(Reflect.hasField(js.Browser.window,"on" + "orientationchange")) js.Browser.window.addEventListener("orientationchange",($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),true);
	var _g = 0, _g1 = flash.Lib.HTML_WINDOW_EVENT_TYPES;
	while(_g < _g1.length) {
		var type = _g1[_g];
		++_g;
		js.Browser.window.addEventListener(type,($_=flash.Lib.__getStage(),$bind($_,$_.__queueStageEvent)),false);
	}
	if(tgt.style.backgroundColor != null && tgt.style.backgroundColor != "") flash.Lib.__getStage().set_backgroundColor(flash.Lib.__parseColor(tgt.style.backgroundColor,function(res,pos,cur) {
		return pos == 0?res | cur << 16:pos == 1?res | cur << 8:pos == 2?res | cur:(function($this) {
			var $r;
			throw "pos should be 0-2";
			return $r;
		}(this));
	})); else flash.Lib.__getStage().set_backgroundColor(16777215);
	flash.Lib.get_current().get_graphics().beginFill(flash.Lib.__getStage().get_backgroundColor());
	flash.Lib.get_current().get_graphics().drawRect(0,0,width,height);
	flash.Lib.__setSurfaceId(flash.Lib.get_current().get_graphics().__surface,"Root MovieClip");
	flash.Lib.__getStage().__updateNextWake();
	return flash.Lib.mMe;
}
flash.Lib.setUserScalable = function(isScalable) {
	if(isScalable == null) isScalable = true;
	var meta = js.Browser.document.createElement("meta");
	meta.name = "viewport";
	meta.content = "user-scalable=" + (isScalable?"yes":"no");
}
flash.Lib.trace = function(arg) {
	if(window.console != null) window.console.log(arg);
}
flash.Lib.__appendSurface = function(surface,before,after) {
	if(flash.Lib.mMe.__scr != null) {
		surface.style.setProperty("position","absolute","");
		surface.style.setProperty("left","0px","");
		surface.style.setProperty("top","0px","");
		surface.style.setProperty("transform-origin","0 0","");
		surface.style.setProperty("-moz-transform-origin","0 0","");
		surface.style.setProperty("-webkit-transform-origin","0 0","");
		surface.style.setProperty("-o-transform-origin","0 0","");
		surface.style.setProperty("-ms-transform-origin","0 0","");
		try {
			if(surface.localName == "canvas") surface.onmouseover = surface.onselectstart = function() {
				return false;
			};
		} catch( e ) {
		}
		if(before != null) before.parentNode.insertBefore(surface,before); else if(after != null && after.nextSibling != null) after.parentNode.insertBefore(surface,after.nextSibling); else flash.Lib.mMe.__scr.appendChild(surface);
	}
}
flash.Lib.__appendText = function(surface,container,text,wrap,isHtml) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		surface.removeChild(surface.childNodes[i]);
	}
	if(isHtml) container.innerHTML = text; else container.appendChild(js.Browser.document.createTextNode(text));
	container.style.setProperty("position","relative","");
	container.style.setProperty("cursor","default","");
	if(!wrap) container.style.setProperty("white-space","nowrap","");
	surface.appendChild(container);
}
flash.Lib.__bootstrap = function() {
	if(flash.Lib.mMe == null) {
		var target = js.Browser.document.getElementById("haxe:openfl");
		if(target == null) target = js.Browser.document.createElement("div");
		var agent = navigator.userAgent;
		if(agent.indexOf("BlackBerry") > -1 && target.style.height == "100%") target.style.height = screen.height + "px";
		if(agent.indexOf("Android") > -1) {
			var version = Std.parseFloat(HxOverrides.substr(agent,agent.indexOf("Android") + 8,3));
			if(version <= 2.3) flash.Lib.mForce2DTransform = true;
		}
		flash.Lib.Run(target,flash.Lib.__getWidth(),flash.Lib.__getHeight());
	}
}
flash.Lib.__copyStyle = function(src,tgt) {
	tgt.id = src.id;
	var _g = 0, _g1 = ["left","top","transform","transform-origin","-moz-transform","-moz-transform-origin","-webkit-transform","-webkit-transform-origin","-o-transform","-o-transform-origin","opacity","display"];
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		tgt.style.setProperty(prop,src.style.getPropertyValue(prop),"");
	}
}
flash.Lib.__createSurfaceAnimationCSS = function(surface,data,template,templateFunc,fps,discrete,infinite) {
	if(infinite == null) infinite = false;
	if(discrete == null) discrete = false;
	if(fps == null) fps = 25;
	if(surface.id == null || surface.id == "") {
		flash.Lib.trace("Failed to create a CSS Style tag for a surface without an id attribute");
		return null;
	}
	var style = null;
	if(surface.getAttribute("data-openfl-anim") != null) style = js.Browser.document.getElementById(surface.getAttribute("data-openfl-anim")); else {
		style = flash.Lib.mMe.__scr.appendChild(js.Browser.document.createElement("style"));
		style.sheet.id = "__openfl_anim_" + surface.id + "__";
		surface.setAttribute("data-openfl-anim",style.sheet.id);
	}
	var keyframeStylesheetRule = "";
	var _g1 = 0, _g = data.length;
	while(_g1 < _g) {
		var i = _g1++;
		var perc = i / (data.length - 1) * 100;
		var frame = data[i];
		keyframeStylesheetRule += perc + "% { " + template.execute(templateFunc(frame)) + " } ";
	}
	var animationDiscreteRule = discrete?"steps(::steps::, end)":"";
	var animationInfiniteRule = infinite?"infinite":"";
	var animationTpl = "";
	var _g = 0, _g1 = ["animation","-moz-animation","-webkit-animation","-o-animation","-ms-animation"];
	while(_g < _g1.length) {
		var prefix = _g1[_g];
		++_g;
		animationTpl += prefix + ": ::id:: ::duration::s " + animationDiscreteRule + " " + animationInfiniteRule + "; ";
	}
	var animationStylesheetRule = new haxe.Template(animationTpl).execute({ id : surface.id, duration : data.length / fps, steps : 1});
	var rules = style.sheet.rules != null?style.sheet.rules:style.sheet.cssRules;
	var _g = 0, _g1 = ["","-moz-","-webkit-","-o-","-ms-"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		try {
			style.sheet.insertRule("@" + variant + "keyframes " + surface.id + " {" + keyframeStylesheetRule + "}",rules.length);
		} catch( e ) {
		}
	}
	style.sheet.insertRule("#" + surface.id + " { " + animationStylesheetRule + " } ",rules.length);
	return style;
}
flash.Lib.__designMode = function(mode) {
	js.Browser.document.designMode = mode?"on":"off";
}
flash.Lib.__disableFullScreen = function() {
}
flash.Lib.__disableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = function() {
			return false;
		};
	} catch( e ) {
		flash.Lib.trace("Disable right click not supported in this browser.");
	}
}
flash.Lib.__drawClippedImage = function(surface,tgtCtx,clipRect) {
	if(clipRect != null) {
		if(clipRect.x < 0) {
			clipRect.width += clipRect.x;
			clipRect.x = 0;
		}
		if(clipRect.y < 0) {
			clipRect.height += clipRect.y;
			clipRect.y = 0;
		}
		if(clipRect.width > surface.width - clipRect.x) clipRect.width = surface.width - clipRect.x;
		if(clipRect.height > surface.height - clipRect.y) clipRect.height = surface.height - clipRect.y;
		tgtCtx.drawImage(surface,clipRect.x,clipRect.y,clipRect.width,clipRect.height,clipRect.x,clipRect.y,clipRect.width,clipRect.height);
	} else tgtCtx.drawImage(surface,0,0);
}
flash.Lib.__drawSurfaceRect = function(surface,tgt,x,y,rect) {
	var tgtCtx = tgt.getContext("2d");
	tgt.width = rect.width;
	tgt.height = rect.height;
	tgtCtx.drawImage(surface,rect.x,rect.y,rect.width,rect.height,0,0,rect.width,rect.height);
	tgt.style.left = x + "px";
	tgt.style.top = y + "px";
}
flash.Lib.__drawToSurface = function(surface,tgt,matrix,alpha,clipRect,smoothing) {
	if(smoothing == null) smoothing = true;
	if(alpha == null) alpha = 1.0;
	var srcCtx = surface.getContext("2d");
	var tgtCtx = tgt.getContext("2d");
	tgtCtx.globalAlpha = alpha;
	flash.Lib.__setImageSmoothing(tgtCtx,smoothing);
	if(surface.width > 0 && surface.height > 0) {
		if(matrix != null) {
			tgtCtx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) tgtCtx.translate(matrix.tx,matrix.ty); else tgtCtx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			flash.Lib.__drawClippedImage(surface,tgtCtx,clipRect);
			tgtCtx.restore();
		} else flash.Lib.__drawClippedImage(surface,tgtCtx,clipRect);
	}
}
flash.Lib.__enableFullScreen = function() {
	if(flash.Lib.mMe != null) {
		var origWidth = flash.Lib.mMe.__scr.style.getPropertyValue("width");
		var origHeight = flash.Lib.mMe.__scr.style.getPropertyValue("height");
		flash.Lib.mMe.__scr.style.setProperty("width","100%","");
		flash.Lib.mMe.__scr.style.setProperty("height","100%","");
		flash.Lib.__disableFullScreen = function() {
			flash.Lib.mMe.__scr.style.setProperty("width",origWidth,"");
			flash.Lib.mMe.__scr.style.setProperty("height",origHeight,"");
		};
	}
}
flash.Lib.__enableRightClick = function() {
	if(flash.Lib.mMe != null) try {
		flash.Lib.mMe.__scr.oncontextmenu = null;
	} catch( e ) {
		flash.Lib.trace("Enable right click not supported in this browser.");
	}
}
flash.Lib.__fullScreenHeight = function() {
	return js.Browser.window.innerHeight;
}
flash.Lib.__fullScreenWidth = function() {
	return js.Browser.window.innerWidth;
}
flash.Lib.__getHeight = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:openfl");
	return tgt != null && tgt.clientHeight > 0?tgt.clientHeight:500;
}
flash.Lib.__getStage = function() {
	if(flash.Lib.mStage == null) {
		var width = flash.Lib.__getWidth();
		var height = flash.Lib.__getHeight();
		flash.Lib.mStage = new flash.display.Stage(width,height);
	}
	return flash.Lib.mStage;
}
flash.Lib.__getWidth = function() {
	var tgt = flash.Lib.mMe != null?flash.Lib.mMe.__scr:js.Browser.document.getElementById("haxe:openfl");
	return tgt != null && tgt.clientWidth > 0?tgt.clientWidth:500;
}
flash.Lib.__isOnStage = function(surface) {
	var p = surface;
	while(p != null && p != flash.Lib.mMe.__scr) p = p.parentNode;
	return p == flash.Lib.mMe.__scr;
}
flash.Lib.__parseColor = function(str,cb) {
	var re = new EReg("rgb\\(([0-9]*), ?([0-9]*), ?([0-9]*)\\)","");
	var hex = new EReg("#([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])([0-9a-zA-Z][0-9a-zA-Z])","");
	if(re.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = Std.parseInt(re.matched(pos));
			col = cb(col,pos - 1,v);
		}
		return col;
	} else if(hex.match(str)) {
		var col = 0;
		var _g = 1;
		while(_g < 4) {
			var pos = _g++;
			var v = "0x" + hex.matched(pos) & 255;
			v = cb(col,pos - 1,v);
		}
		return col;
	} else throw "Cannot parse color '" + str + "'.";
}
flash.Lib.__removeSurface = function(surface) {
	if(flash.Lib.mMe.__scr != null) {
		var anim = surface.getAttribute("data-openfl-anim");
		if(anim != null) {
			var style = js.Browser.document.getElementById(anim);
			if(style != null) flash.Lib.mMe.__scr.removeChild(style);
		}
		if(surface.parentNode != null) surface.parentNode.removeChild(surface);
	}
	return surface;
}
flash.Lib.__setSurfaceBorder = function(surface,color,size) {
	surface.style.setProperty("border-color","#" + StringTools.hex(color),"");
	surface.style.setProperty("border-style","solid","");
	surface.style.setProperty("border-width",size + "px","");
	surface.style.setProperty("border-collapse","collapse","");
}
flash.Lib.__setSurfaceClipping = function(surface,rect) {
}
flash.Lib.__setSurfaceFont = function(surface,font,bold,size,color,align,lineHeight) {
	surface.style.setProperty("font-family",font,"");
	surface.style.setProperty("font-weight",Std.string(bold),"");
	surface.style.setProperty("color","#" + StringTools.hex(color),"");
	surface.style.setProperty("font-size",size + "px","");
	surface.style.setProperty("text-align",align,"");
	surface.style.setProperty("line-height",lineHeight + "px","");
}
flash.Lib.__setSurfaceOpacity = function(surface,alpha) {
	surface.style.setProperty("opacity",Std.string(alpha),"");
}
flash.Lib.__setSurfacePadding = function(surface,padding,margin,display) {
	surface.style.setProperty("padding",padding + "px","");
	surface.style.setProperty("margin",margin + "px","");
	surface.style.setProperty("top",padding + 2 + "px","");
	surface.style.setProperty("right",padding + 1 + "px","");
	surface.style.setProperty("left",padding + 1 + "px","");
	surface.style.setProperty("bottom",padding + 1 + "px","");
	surface.style.setProperty("display",display?"inline":"block","");
}
flash.Lib.__setSurfaceTransform = function(surface,matrix) {
	if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && surface.getAttribute("data-openfl-anim") == null) {
		surface.style.left = matrix.tx + "px";
		surface.style.top = matrix.ty + "px";
		surface.style.setProperty("transform","","");
		surface.style.setProperty("-moz-transform","","");
		surface.style.setProperty("-webkit-transform","","");
		surface.style.setProperty("-o-transform","","");
		surface.style.setProperty("-ms-transform","","");
	} else {
		surface.style.left = "0px";
		surface.style.top = "0px";
		surface.style.setProperty("transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-moz-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + "px, " + matrix.ty + "px)","");
		if(!flash.Lib.mForce2DTransform) surface.style.setProperty("-webkit-transform","matrix3d(" + matrix.a + ", " + matrix.b + ", " + "0, 0, " + matrix.c + ", " + matrix.d + ", " + "0, 0, 0, 0, 1, 0, " + matrix.tx + ", " + matrix.ty + ", " + "0, 1" + ")",""); else surface.style.setProperty("-webkit-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-o-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
		surface.style.setProperty("-ms-transform","matrix(" + matrix.a + ", " + matrix.b + ", " + matrix.c + ", " + matrix.d + ", " + matrix.tx + ", " + matrix.ty + ")","");
	}
}
flash.Lib.__setSurfaceZIndexAfter = function(surface1,surface2) {
	if(surface1 != null && surface2 != null) {
		if(surface1.parentNode != surface2.parentNode && surface2.parentNode != null) surface2.parentNode.appendChild(surface1);
		if(surface2.parentNode != null) {
			var nextSibling = surface2.nextSibling;
			if(surface1.previousSibling != surface2) {
				var swap = flash.Lib.__removeSurface(surface1);
				if(nextSibling == null) surface2.parentNode.appendChild(swap); else surface2.parentNode.insertBefore(swap,nextSibling);
			}
		}
	}
}
flash.Lib.__swapSurface = function(surface1,surface2) {
	var parent1 = surface1.parentNode;
	var parent2 = surface2.parentNode;
	if(parent1 != null && parent2 != null) {
		if(parent1 == parent2) {
			var next1 = surface1.nextSibling;
			var next2 = surface2.nextSibling;
			if(next1 == surface2) parent1.insertBefore(surface2,surface1); else if(next2 == surface1) parent1.insertBefore(surface1,surface2); else {
				parent1.replaceChild(surface2,surface1);
				if(next2 != null) parent1.insertBefore(surface1,next2); else parent1.appendChild(surface1);
			}
		} else {
			var next2 = surface2.nextSibling;
			parent1.replaceChild(surface2,surface1);
			if(next2 != null) parent2.insertBefore(surface1,next2); else parent2.appendChild(surface1);
		}
	}
}
flash.Lib.__setContentEditable = function(surface,contentEditable) {
	if(contentEditable == null) contentEditable = true;
	surface.setAttribute("contentEditable",contentEditable?"true":"false");
}
flash.Lib.__setCursor = function(type) {
	if(flash.Lib.mMe != null) flash.Lib.mMe.__scr.style.cursor = (function($this) {
		var $r;
		switch( (type)[1] ) {
		case 0:
			$r = "pointer";
			break;
		case 1:
			$r = "text";
			break;
		default:
			$r = "default";
		}
		return $r;
	}(this));
}
flash.Lib.__setImageSmoothing = function(context,enabled) {
	var _g = 0, _g1 = ["imageSmoothingEnabled","mozImageSmoothingEnabled","webkitImageSmoothingEnabled"];
	while(_g < _g1.length) {
		var variant = _g1[_g];
		++_g;
		context[variant] = enabled;
	}
}
flash.Lib.__setSurfaceAlign = function(surface,align) {
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.__setSurfaceId = function(surface,name) {
	var regex = new EReg("[^a-zA-Z0-9\\-]","g");
	surface.id = regex.replace(name,"_");
}
flash.Lib.__setSurfaceRotation = function(surface,rotate) {
	surface.style.setProperty("transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-moz-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-webkit-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-o-transform","rotate(" + rotate + "deg)","");
	surface.style.setProperty("-ms-transform","rotate(" + rotate + "deg)","");
}
flash.Lib.__setSurfaceScale = function(surface,scale) {
	surface.style.setProperty("transform","scale(" + scale + ")","");
	surface.style.setProperty("-moz-transform","scale(" + scale + ")","");
	surface.style.setProperty("-webkit-transform","scale(" + scale + ")","");
	surface.style.setProperty("-o-transform","scale(" + scale + ")","");
	surface.style.setProperty("-ms-transform","scale(" + scale + ")","");
}
flash.Lib.__setSurfaceSpritesheetAnimation = function(surface,spec,fps) {
	if(spec.length == 0) return surface;
	var div = js.Browser.document.createElement("div");
	div.style.backgroundImage = "url(" + surface.toDataURL("image/png") + ")";
	div.id = surface.id;
	var keyframeTpl = new haxe.Template("background-position: ::left::px ::top::px; width: ::width::px; height: ::height::px; ");
	var templateFunc = function(frame) {
		return { left : -frame.x, top : -frame.y, width : frame.width, height : frame.height};
	};
	flash.Lib.__createSurfaceAnimationCSS(div,spec,keyframeTpl,templateFunc,fps,true,true);
	if(flash.Lib.__isOnStage(surface)) {
		flash.Lib.__appendSurface(div);
		flash.Lib.__copyStyle(surface,div);
		flash.Lib.__swapSurface(surface,div);
		flash.Lib.__removeSurface(surface);
	} else flash.Lib.__copyStyle(surface,div);
	return div;
}
flash.Lib.__setSurfaceVisible = function(surface,visible) {
	if(visible) surface.style.setProperty("display","block",""); else surface.style.setProperty("display","none","");
}
flash.Lib.__setTextDimensions = function(surface,width,height,align) {
	surface.style.setProperty("width",width + "px","");
	surface.style.setProperty("height",height + "px","");
	surface.style.setProperty("overflow","hidden","");
	surface.style.setProperty("text-align",align,"");
}
flash.Lib.__surfaceHitTest = function(surface,x,y) {
	var _g1 = 0, _g = surface.childNodes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var node = surface.childNodes[i];
		if(x >= node.offsetLeft && x <= node.offsetLeft + node.offsetWidth && y >= node.offsetTop && y <= node.offsetTop + node.offsetHeight) return true;
	}
	return false;
}
flash.Lib.get_current = function() {
	if(flash.Lib.mMainClassRoot == null) {
		flash.Lib.mMainClassRoot = new flash.display.MovieClip();
		flash.Lib.mCurrent = flash.Lib.mMainClassRoot;
		flash.Lib.__getStage().addChild(flash.Lib.mCurrent);
	}
	return flash.Lib.mMainClassRoot;
}
flash.Lib.prototype = {
	__class__: flash.Lib
}
var js = {}
js.Browser = function() { }
$hxClasses["js.Browser"] = js.Browser;
js.Browser.__name__ = ["js","Browser"];
flash.events.Event = function(inType,inBubbles,inCancelable) {
	if(inCancelable == null) inCancelable = false;
	if(inBubbles == null) inBubbles = false;
	this.type = inType;
	this.bubbles = inBubbles;
	this.cancelable = inCancelable;
	this.__isCancelled = false;
	this.__isCancelledNow = false;
	this.target = null;
	this.currentTarget = null;
	this.eventPhase = flash.events.EventPhase.AT_TARGET;
};
$hxClasses["flash.events.Event"] = flash.events.Event;
flash.events.Event.__name__ = ["flash","events","Event"];
flash.events.Event.prototype = {
	__setPhase: function(phase) {
		this.eventPhase = phase;
	}
	,__getIsCancelledNow: function() {
		return this.__isCancelledNow;
	}
	,__getIsCancelled: function() {
		return this.__isCancelled;
	}
	,__createSimilar: function(type,related,targ) {
		var result = new flash.events.Event(type,this.bubbles,this.cancelable);
		if(targ != null) result.target = targ;
		return result;
	}
	,toString: function() {
		return "[Event type=" + this.type + " bubbles=" + Std.string(this.bubbles) + " cancelable=" + Std.string(this.cancelable) + "]";
	}
	,stopPropagation: function() {
		this.__isCancelled = true;
	}
	,stopImmediatePropagation: function() {
		this.__isCancelled = true;
		this.__isCancelledNow = true;
	}
	,clone: function() {
		return new flash.events.Event(this.type,this.bubbles,this.cancelable);
	}
	,__class__: flash.events.Event
}
flash.events.MouseEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.clickCount = clickCount;
};
$hxClasses["flash.events.MouseEvent"] = flash.events.MouseEvent;
flash.events.MouseEvent.__name__ = ["flash","events","MouseEvent"];
flash.events.MouseEvent.__create = function(type,event,local,target) {
	var __mouseDown = false;
	var delta = 2;
	if(type == flash.events.MouseEvent.MOUSE_WHEEL) {
		var mouseEvent = event;
		if(mouseEvent.wheelDelta) delta = mouseEvent.wheelDelta / 120 | 0; else if(mouseEvent.detail) -mouseEvent.detail | 0;
	}
	if(type == flash.events.MouseEvent.MOUSE_DOWN) __mouseDown = event.which != null?event.which == 1:event.button != null?event.button == 0:false; else if(type == flash.events.MouseEvent.MOUSE_UP) {
		if(event.which != null) {
			if(event.which == 1) __mouseDown = false; else if(event.button != null) {
				if(event.button == 0) __mouseDown = false; else __mouseDown = false;
			}
		}
	}
	var pseudoEvent = new flash.events.MouseEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,__mouseDown,delta);
	pseudoEvent.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	pseudoEvent.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	pseudoEvent.target = target;
	return pseudoEvent;
}
flash.events.MouseEvent.__super__ = flash.events.Event;
flash.events.MouseEvent.prototype = $extend(flash.events.Event.prototype,{
	updateAfterEvent: function() {
	}
	,__createSimilar: function(type,related,targ) {
		var result = new flash.events.MouseEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey,this.clickCount);
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.MouseEvent
});
flash.display.Stage = function(width,height) {
	flash.display.DisplayObjectContainer.call(this);
	this.__focusObject = null;
	this.__focusObjectActivated = false;
	this.__windowWidth = width;
	this.__windowHeight = height;
	this.stageFocusRect = false;
	this.scaleMode = flash.display.StageScaleMode.SHOW_ALL;
	this.__stageMatrix = new flash.geom.Matrix();
	this.tabEnabled = true;
	this.set_frameRate(0.0);
	this.set_backgroundColor(16777215);
	this.name = "Stage";
	this.loaderInfo = flash.display.LoaderInfo.create(null);
	this.loaderInfo.parameters.width = Std.string(this.__windowWidth);
	this.loaderInfo.parameters.height = Std.string(this.__windowHeight);
	this.__pointInPathMode = flash.display.Graphics.__detectIsPointInPathMode();
	this.__mouseOverObjects = [];
	this.set_showDefaultContextMenu(true);
	this.__touchInfo = [];
	this.__uIEventsQueue = new Array(1000);
	this.__uIEventsQueueIndex = 0;
};
$hxClasses["flash.display.Stage"] = flash.display.Stage;
flash.display.Stage.__name__ = ["flash","display","Stage"];
flash.display.Stage.getOrientation = function() {
	var rotation = window.orientation;
	var orientation = flash.display.Stage.OrientationPortrait;
	switch(rotation) {
	case -90:
		orientation = flash.display.Stage.OrientationLandscapeLeft;
		break;
	case 180:
		orientation = flash.display.Stage.OrientationPortraitUpsideDown;
		break;
	case 90:
		orientation = flash.display.Stage.OrientationLandscapeRight;
		break;
	default:
		orientation = flash.display.Stage.OrientationPortrait;
	}
	return orientation;
}
flash.display.Stage.__super__ = flash.display.DisplayObjectContainer;
flash.display.Stage.prototype = $extend(flash.display.DisplayObjectContainer.prototype,{
	get_stageWidth: function() {
		return this.__windowWidth;
	}
	,get_stageHeight: function() {
		return this.__windowHeight;
	}
	,get_stage: function() {
		return flash.Lib.__getStage();
	}
	,set_showDefaultContextMenu: function(showDefaultContextMenu) {
		if(showDefaultContextMenu != this.__showDefaultContextMenu && this.__showDefaultContextMenu != null) {
			if(!showDefaultContextMenu) flash.Lib.__disableRightClick(); else flash.Lib.__enableRightClick();
		}
		this.__showDefaultContextMenu = showDefaultContextMenu;
		return showDefaultContextMenu;
	}
	,get_showDefaultContextMenu: function() {
		return this.__showDefaultContextMenu;
	}
	,set_quality: function(inQuality) {
		return this.quality = inQuality;
	}
	,get_quality: function() {
		return this.quality != null?this.quality:flash.display.StageQuality.BEST;
	}
	,get_mouseY: function() {
		return this._mouseY;
	}
	,get_mouseX: function() {
		return this._mouseX;
	}
	,get_fullScreenHeight: function() {
		return js.Browser.window.innerHeight;
	}
	,get_fullScreenWidth: function() {
		return js.Browser.window.innerWidth;
	}
	,set_frameRate: function(speed) {
		if(speed == 0) {
			var window = js.Browser.window;
			var __requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if(__requestAnimationFrame == null) speed = 60;
		}
		if(speed != 0) this.__interval = 1000.0 / speed | 0;
		this.__frameRate = speed;
		this.__updateNextWake();
		return speed;
	}
	,get_frameRate: function() {
		return this.__frameRate;
	}
	,set_focus: function(inObj) {
		this.__onFocus(inObj);
		return this.__focusObject;
	}
	,get_focus: function() {
		return this.__focusObject;
	}
	,set_displayState: function(displayState) {
		if(displayState != this.displayState && this.displayState != null) {
			switch( (displayState)[1] ) {
			case 0:
				flash.Lib.__disableFullScreen();
				break;
			case 1:
			case 2:
				flash.Lib.__enableFullScreen();
				break;
			}
		}
		this.displayState = displayState;
		return displayState;
	}
	,get_displayState: function() {
		return this.displayState;
	}
	,set_color: function(col) {
		return this.__backgroundColour = col;
	}
	,get_color: function() {
		return this.__backgroundColour;
	}
	,set_backgroundColor: function(col) {
		return this.__backgroundColour = col;
	}
	,get_backgroundColor: function() {
		return this.__backgroundColour;
	}
	,__onTouch: function(event,touch,type,touchInfo,isPrimaryTouchPoint) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(touch.pageX - rect.left,touch.pageY - rect.top);
		var obj = this.__getObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.__getInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.TouchEvent.__create(type,event,touch,local,obj);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.__checkInOuts(evt,stack,touchInfo);
			obj.__fireEvent(evt);
			var mouseType = (function($this) {
				var $r;
				switch(type) {
				case "touchBegin":
					$r = flash.events.MouseEvent.MOUSE_DOWN;
					break;
				case "touchEnd":
					$r = flash.events.MouseEvent.MOUSE_UP;
					break;
				default:
					$r = (function($this) {
						var $r;
						if($this.__dragObject != null) $this.__drag(point);
						$r = flash.events.MouseEvent.MOUSE_MOVE;
						return $r;
					}($this));
				}
				return $r;
			}(this));
			obj.__fireEvent(flash.events.MouseEvent.__create(mouseType,evt,local,obj));
		} else {
			var evt = flash.events.TouchEvent.__create(type,event,touch,point,null);
			evt.touchPointID = touch.identifier;
			evt.isPrimaryTouchPoint = isPrimaryTouchPoint;
			this.__checkInOuts(evt,stack,touchInfo);
		}
	}
	,__onResize: function(inW,inH) {
		this.__windowWidth = inW;
		this.__windowHeight = inH;
		var event = new flash.events.Event(flash.events.Event.RESIZE);
		event.target = this;
		this.__broadcast(event);
	}
	,__onMouse: function(event,type) {
		var rect = flash.Lib.mMe.__scr.getBoundingClientRect();
		var point = new flash.geom.Point(event.clientX - rect.left,event.clientY - rect.top);
		if(this.__dragObject != null) this.__drag(point);
		var obj = this.__getObjectUnderPoint(point);
		this._mouseX = point.x;
		this._mouseY = point.y;
		var stack = new Array();
		if(obj != null) obj.__getInteractiveObjectStack(stack);
		if(stack.length > 0) {
			stack.reverse();
			var local = obj.globalToLocal(point);
			var evt = flash.events.MouseEvent.__create(type,event,local,obj);
			this.__checkInOuts(evt,stack);
			if(type == flash.events.MouseEvent.MOUSE_DOWN) this.__onFocus(stack[stack.length - 1]);
			obj.__fireEvent(evt);
		} else {
			var evt = flash.events.MouseEvent.__create(type,event,point,null);
			this.__checkInOuts(evt,stack);
		}
	}
	,__onFocus: function(target) {
		if(target != this.__focusObject) {
			if(this.__focusObject != null) this.__focusObject.__fireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_OUT,true,false,this.__focusObject,false,0));
			target.__fireEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_IN,true,false,target,false,0));
			this.__focusObject = target;
		}
	}
	,__onKey: function(code,pressed,inChar,ctrl,alt,shift,keyLocation) {
		var stack = new Array();
		if(this.__focusObject == null) this.__getInteractiveObjectStack(stack); else this.__focusObject.__getInteractiveObjectStack(stack);
		if(stack.length > 0) {
			var obj = stack[0];
			var evt = new flash.events.KeyboardEvent(pressed?flash.events.KeyboardEvent.KEY_DOWN:flash.events.KeyboardEvent.KEY_UP,true,false,inChar,code,keyLocation,ctrl,alt,shift);
			obj.__fireEvent(evt);
		}
	}
	,__handleOrientationChange: function() {
	}
	,__handleAccelerometer: function(evt) {
		flash.display.Stage.__acceleration.x = evt.accelerationIncludingGravity.x;
		flash.display.Stage.__acceleration.y = evt.accelerationIncludingGravity.y;
		flash.display.Stage.__acceleration.z = evt.accelerationIncludingGravity.z;
	}
	,__updateNextWake: function() {
		if(this.__frameRate == 0) {
			var __requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			__requestAnimationFrame($bind(this,this.__updateNextWake));
			this.__stageRender();
		} else {
			js.Browser.window.clearInterval(this.__timer);
			this.__timer = js.Browser.window.setInterval($bind(this,this.__stageRender),this.__interval);
		}
	}
	,__stopDrag: function(sprite) {
		this.__dragBounds = null;
		this.__dragObject = null;
	}
	,__startDrag: function(sprite,lockCenter,bounds) {
		if(lockCenter == null) lockCenter = false;
		this.__dragBounds = bounds == null?null:bounds.clone();
		this.__dragObject = sprite;
		if(this.__dragObject != null) {
			var mouse = new flash.geom.Point(this._mouseX,this._mouseY);
			var p = this.__dragObject.parent;
			if(p != null) mouse = p.globalToLocal(mouse);
			if(lockCenter) {
				var bounds1 = sprite.getBounds(this);
				this.__dragOffsetX = this.__dragObject.get_x() - (bounds1.width / 2 + bounds1.x);
				this.__dragOffsetY = this.__dragObject.get_y() - (bounds1.height / 2 + bounds1.y);
			} else {
				this.__dragOffsetX = this.__dragObject.get_x() - mouse.x;
				this.__dragOffsetY = this.__dragObject.get_y() - mouse.y;
			}
		}
	}
	,__stageRender: function(_) {
		if(!this.__stageActive) {
			this.__onResize(this.__windowWidth,this.__windowHeight);
			var event = new flash.events.Event(flash.events.Event.ACTIVATE);
			event.target = this;
			this.__broadcast(event);
			this.__stageActive = true;
		}
		var _g1 = 0, _g = this.__uIEventsQueueIndex;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.__uIEventsQueue[i] != null) this.__processStageEvent(this.__uIEventsQueue[i]);
		}
		this.__uIEventsQueueIndex = 0;
		var event = new flash.events.Event(flash.events.Event.ENTER_FRAME);
		this.__broadcast(event);
		if(this.__invalid) {
			var event1 = new flash.events.Event(flash.events.Event.RENDER);
			this.__broadcast(event1);
		}
		this.__renderAll();
	}
	,__renderToCanvas: function(canvas) {
		canvas.width = canvas.width;
		this.__render(canvas);
	}
	,__renderAll: function() {
		this.__render(null,null);
	}
	,__queueStageEvent: function(evt) {
		this.__uIEventsQueue[this.__uIEventsQueueIndex++] = evt;
	}
	,__processStageEvent: function(evt) {
		evt.stopPropagation();
		switch(evt.type) {
		case "resize":
			this.__onResize(flash.Lib.__getWidth(),flash.Lib.__getHeight());
			break;
		case "focus":
			this.__onFocus(this);
			if(!this.__focusObjectActivated) {
				this.__focusObjectActivated = true;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.ACTIVATE));
			}
			break;
		case "blur":
			if(this.__focusObjectActivated) {
				this.__focusObjectActivated = false;
				this.dispatchEvent(new flash.events.Event(flash.events.Event.DEACTIVATE));
			}
			break;
		case "mousemove":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_MOVE);
			break;
		case "mousedown":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_DOWN);
			break;
		case "mouseup":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_UP);
			break;
		case "click":
			this.__onMouse(evt,flash.events.MouseEvent.CLICK);
			break;
		case "mousewheel":
			this.__onMouse(evt,flash.events.MouseEvent.MOUSE_WHEEL);
			break;
		case "dblclick":
			this.__onMouse(evt,flash.events.MouseEvent.DOUBLE_CLICK);
			break;
		case "keydown":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.__convertMozillaCode(keyCode);
			this.__onKey(keyCode,true,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "keyup":
			var evt1 = evt;
			var keyCode = evt1.keyCode != null?evt1.keyCode:evt1.which;
			keyCode = flash.ui.Keyboard.__convertMozillaCode(keyCode);
			this.__onKey(keyCode,false,evt1.charCode,evt1.ctrlKey,evt1.altKey,evt1.shiftKey,evt1.keyLocation);
			break;
		case "touchstart":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = new flash.display._Stage.TouchInfo();
			this.__touchInfo[evt1.changedTouches[0].identifier] = touchInfo;
			this.__onTouch(evt1,evt1.changedTouches[0],"touchBegin",touchInfo,false);
			break;
		case "touchmove":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.__touchInfo[evt1.changedTouches[0].identifier];
			this.__onTouch(evt1,evt1.changedTouches[0],"touchMove",touchInfo,true);
			break;
		case "touchend":
			var evt1 = evt;
			evt1.preventDefault();
			var touchInfo = this.__touchInfo[evt1.changedTouches[0].identifier];
			this.__onTouch(evt1,evt1.changedTouches[0],"touchEnd",touchInfo,true);
			this.__touchInfo[evt1.changedTouches[0].identifier] = null;
			break;
		case "devicemotion":
			var evt1 = evt;
			this.__handleAccelerometer(evt1);
			break;
		case "orientationchange":
			this.__handleOrientationChange();
			break;
		default:
		}
	}
	,__isOnStage: function() {
		return true;
	}
	,__drag: function(point) {
		var p = this.__dragObject.parent;
		if(p != null) point = p.globalToLocal(point);
		var x = point.x + this.__dragOffsetX;
		var y = point.y + this.__dragOffsetY;
		if(this.__dragBounds != null) {
			if(x < this.__dragBounds.x) x = this.__dragBounds.x; else if(x > this.__dragBounds.get_right()) x = this.__dragBounds.get_right();
			if(y < this.__dragBounds.y) y = this.__dragBounds.y; else if(y > this.__dragBounds.get_bottom()) y = this.__dragBounds.get_bottom();
		}
		this.__dragObject.set_x(x);
		this.__dragObject.set_y(y);
	}
	,__checkInOuts: function(event,stack,touchInfo) {
		var prev = touchInfo == null?this.__mouseOverObjects:touchInfo.touchOverObjects;
		var changeEvents = touchInfo == null?flash.display.Stage.__mouseChanges:flash.display.Stage.__touchChanges;
		var new_n = stack.length;
		var new_obj = new_n > 0?stack[new_n - 1]:null;
		var old_n = prev.length;
		var old_obj = old_n > 0?prev[old_n - 1]:null;
		if(new_obj != old_obj) {
			if(old_obj != null) old_obj.__fireEvent(event.__createSimilar(changeEvents[0],new_obj,old_obj));
			if(new_obj != null) new_obj.__fireEvent(event.__createSimilar(changeEvents[1],old_obj,new_obj));
			var common = 0;
			while(common < new_n && common < old_n && stack[common] == prev[common]) common++;
			var rollOut = event.__createSimilar(changeEvents[2],new_obj,old_obj);
			var i = old_n - 1;
			while(i >= common) {
				prev[i].dispatchEvent(rollOut);
				i--;
			}
			var rollOver = event.__createSimilar(changeEvents[3],old_obj);
			var i1 = new_n - 1;
			while(i1 >= common) {
				stack[i1].dispatchEvent(rollOver);
				i1--;
			}
			if(touchInfo == null) this.__mouseOverObjects = stack; else touchInfo.touchOverObjects = stack;
		}
	}
	,toString: function() {
		return "[Stage id=" + this.___id + "]";
	}
	,invalidate: function() {
		this.__invalid = true;
	}
	,__class__: flash.display.Stage
	,__properties__: $extend(flash.display.DisplayObjectContainer.prototype.__properties__,{set_backgroundColor:"set_backgroundColor",get_backgroundColor:"get_backgroundColor",set_color:"set_color",get_color:"get_color",set_displayState:"set_displayState",get_displayState:"get_displayState",set_focus:"set_focus",get_focus:"get_focus",set_frameRate:"set_frameRate",get_frameRate:"get_frameRate",get_fullScreenHeight:"get_fullScreenHeight",get_fullScreenWidth:"get_fullScreenWidth",set_quality:"set_quality",get_quality:"get_quality",set_showDefaultContextMenu:"set_showDefaultContextMenu",get_showDefaultContextMenu:"get_showDefaultContextMenu",get_stageHeight:"get_stageHeight",get_stageWidth:"get_stageWidth"})
});
flash.display.StageScaleMode = $hxClasses["flash.display.StageScaleMode"] = { __ename__ : true, __constructs__ : ["SHOW_ALL","NO_SCALE","NO_BORDER","EXACT_FIT"] }
flash.display.StageScaleMode.SHOW_ALL = ["SHOW_ALL",0];
flash.display.StageScaleMode.SHOW_ALL.toString = $estr;
flash.display.StageScaleMode.SHOW_ALL.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_SCALE = ["NO_SCALE",1];
flash.display.StageScaleMode.NO_SCALE.toString = $estr;
flash.display.StageScaleMode.NO_SCALE.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.NO_BORDER = ["NO_BORDER",2];
flash.display.StageScaleMode.NO_BORDER.toString = $estr;
flash.display.StageScaleMode.NO_BORDER.__enum__ = flash.display.StageScaleMode;
flash.display.StageScaleMode.EXACT_FIT = ["EXACT_FIT",3];
flash.display.StageScaleMode.EXACT_FIT.toString = $estr;
flash.display.StageScaleMode.EXACT_FIT.__enum__ = flash.display.StageScaleMode;
flash.geom.Matrix = function(in_a,in_b,in_c,in_d,in_tx,in_ty) {
	if(in_ty == null) in_ty = 0;
	if(in_tx == null) in_tx = 0;
	if(in_d == null) in_d = 1;
	if(in_c == null) in_c = 0;
	if(in_b == null) in_b = 0;
	if(in_a == null) in_a = 1;
	this.a = in_a;
	this.b = in_b;
	this.c = in_c;
	this.d = in_d;
	this.set_tx(in_tx);
	this.set_ty(in_ty);
	this._sx = 1.0;
	this._sy = 1.0;
};
$hxClasses["flash.geom.Matrix"] = flash.geom.Matrix;
flash.geom.Matrix.__name__ = ["flash","geom","Matrix"];
flash.geom.Matrix.prototype = {
	set_ty: function(inValue) {
		this.ty = inValue;
		return this.ty;
	}
	,set_tx: function(inValue) {
		this.tx = inValue;
		return this.tx;
	}
	,__translateTransformed: function(inPos) {
		this.set_tx(inPos.x * this.a + inPos.y * this.c + this.tx);
		this.set_ty(inPos.x * this.b + inPos.y * this.d + this.ty);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,__transformY: function(inPos) {
		return inPos.x * this.b + inPos.y * this.d + this.ty;
	}
	,__transformX: function(inPos) {
		return inPos.x * this.a + inPos.y * this.c + this.tx;
	}
	,translate: function(inDX,inDY) {
		var m = new flash.geom.Matrix();
		m.set_tx(inDX);
		m.set_ty(inDY);
		this.concat(m);
	}
	,transformPoint: function(inPos) {
		return new flash.geom.Point(inPos.x * this.a + inPos.y * this.c + this.tx,inPos.x * this.b + inPos.y * this.d + this.ty);
	}
	,toString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + ", " + this.ty + ")";
	}
	,toMozString: function() {
		return "matrix(" + this.a + ", " + this.b + ", " + this.c + ", " + this.d + ", " + this.tx + "px, " + this.ty + "px)";
	}
	,to3DString: function() {
		return "matrix3d(" + this.a + ", " + this.b + ", " + "0, 0, " + this.c + ", " + this.d + ", " + "0, 0, 0, 0, 1, 0, " + this.tx + ", " + this.ty + ", " + "0, 1" + ")";
	}
	,setRotation: function(inTheta,inScale) {
		if(inScale == null) inScale = 1;
		var scale = inScale;
		this.a = Math.cos(inTheta) * scale;
		this.c = Math.sin(inTheta) * scale;
		this.b = -this.c;
		this.d = this.a;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,scale: function(inSX,inSY) {
		this._sx = inSX;
		this._sy = inSY;
		this.a *= inSX;
		this.b *= inSY;
		this.c *= inSX;
		this.d *= inSY;
		var _g = this;
		_g.set_tx(_g.tx * inSX);
		var _g = this;
		_g.set_ty(_g.ty * inSY);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,rotate: function(inTheta) {
		var cos = Math.cos(inTheta);
		var sin = Math.sin(inTheta);
		var a1 = this.a * cos - this.b * sin;
		this.b = this.a * sin + this.b * cos;
		this.a = a1;
		var c1 = this.c * cos - this.d * sin;
		this.d = this.c * sin + this.d * cos;
		this.c = c1;
		var tx1 = this.tx * cos - this.ty * sin;
		this.set_ty(this.tx * sin + this.ty * cos);
		this.set_tx(tx1);
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,mult: function(m) {
		var result = this.clone();
		result.concat(m);
		return result;
	}
	,invert: function() {
		var norm = this.a * this.d - this.b * this.c;
		if(norm == 0) {
			this.a = this.b = this.c = this.d = 0;
			this.set_tx(-this.tx);
			this.set_ty(-this.ty);
		} else {
			norm = 1.0 / norm;
			var a1 = this.d * norm;
			this.d = this.a * norm;
			this.a = a1;
			this.b *= -norm;
			this.c *= -norm;
			var tx1 = -this.a * this.tx - this.c * this.ty;
			this.set_ty(-this.b * this.tx - this.d * this.ty);
			this.set_tx(tx1);
		}
		this._sx /= this._sx;
		this._sy /= this._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
		return this;
	}
	,identity: function() {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.set_tx(0);
		this.set_ty(0);
		this._sx = 1.0;
		this._sy = 1.0;
	}
	,createGradientBox: function(in_width,in_height,rotation,in_tx,in_ty) {
		if(in_ty == null) in_ty = 0;
		if(in_tx == null) in_tx = 0;
		if(rotation == null) rotation = 0;
		this.a = in_width / 1638.4;
		this.d = in_height / 1638.4;
		if(rotation != null && rotation != 0.0) {
			var cos = Math.cos(rotation);
			var sin = Math.sin(rotation);
			this.b = sin * this.d;
			this.c = -sin * this.a;
			this.a *= cos;
			this.d *= cos;
		} else {
			this.b = 0;
			this.c = 0;
		}
		this.set_tx(in_tx != null?in_tx + in_width / 2:in_width / 2);
		this.set_ty(in_ty != null?in_ty + in_height / 2:in_height / 2);
	}
	,copy: function(m) {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.set_tx(m.tx);
		this.set_ty(m.ty);
		this._sx = m._sx;
		this._sy = m._sy;
	}
	,concat: function(m) {
		var a1 = this.a * m.a + this.b * m.c;
		this.b = this.a * m.b + this.b * m.d;
		this.a = a1;
		var c1 = this.c * m.a + this.d * m.c;
		this.d = this.c * m.b + this.d * m.d;
		this.c = c1;
		var tx1 = this.tx * m.a + this.ty * m.c + m.tx;
		this.set_ty(this.tx * m.b + this.ty * m.d + m.ty);
		this.set_tx(tx1);
		this._sx *= m._sx;
		this._sy *= m._sy;
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,clone: function() {
		var m = new flash.geom.Matrix(this.a,this.b,this.c,this.d,this.tx,this.ty);
		m._sx = this._sx;
		m._sy = this._sy;
		return m;
	}
	,cleanValues: function() {
		this.a = Math.round(this.a * 1000) / 1000;
		this.b = Math.round(this.b * 1000) / 1000;
		this.c = Math.round(this.c * 1000) / 1000;
		this.d = Math.round(this.d * 1000) / 1000;
		this.set_tx(Math.round(this.tx * 10) / 10);
		this.set_ty(Math.round(this.ty * 10) / 10);
	}
	,__class__: flash.geom.Matrix
	,__properties__: {set_tx:"set_tx",set_ty:"set_ty"}
}
flash.display.LoaderInfo = function() {
	flash.events.EventDispatcher.call(this);
	this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.childAllowsParent = true;
	this.parameters = { };
};
$hxClasses["flash.display.LoaderInfo"] = flash.display.LoaderInfo;
flash.display.LoaderInfo.__name__ = ["flash","display","LoaderInfo"];
flash.display.LoaderInfo.create = function(ldr) {
	var li = new flash.display.LoaderInfo();
	if(ldr != null) li.loader = ldr; else li.url = "";
	return li;
}
flash.display.LoaderInfo.__super__ = flash.events.EventDispatcher;
flash.display.LoaderInfo.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__class__: flash.display.LoaderInfo
});
flash.system = {}
flash.system.ApplicationDomain = function(parentDomain) {
	if(parentDomain != null) this.parentDomain = parentDomain; else this.parentDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.ApplicationDomain"] = flash.system.ApplicationDomain;
flash.system.ApplicationDomain.__name__ = ["flash","system","ApplicationDomain"];
flash.system.ApplicationDomain.prototype = {
	hasDefinition: function(name) {
		return Type.resolveClass(name) != null;
	}
	,getDefinition: function(name) {
		return Type.resolveClass(name);
	}
	,__class__: flash.system.ApplicationDomain
}
js.Boot = function() { }
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0, _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js.Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) {
					if(cl == Array) return o.__enum__ == null;
					return true;
				}
				if(js.Boot.__interfLoop(o.__class__,cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
flash.display.PointInPathMode = $hxClasses["flash.display.PointInPathMode"] = { __ename__ : true, __constructs__ : ["USER_SPACE","DEVICE_SPACE"] }
flash.display.PointInPathMode.USER_SPACE = ["USER_SPACE",0];
flash.display.PointInPathMode.USER_SPACE.toString = $estr;
flash.display.PointInPathMode.USER_SPACE.__enum__ = flash.display.PointInPathMode;
flash.display.PointInPathMode.DEVICE_SPACE = ["DEVICE_SPACE",1];
flash.display.PointInPathMode.DEVICE_SPACE.toString = $estr;
flash.display.PointInPathMode.DEVICE_SPACE.__enum__ = flash.display.PointInPathMode;
flash.utils = {}
flash.utils.Uuid = function() { }
$hxClasses["flash.utils.Uuid"] = flash.utils.Uuid;
flash.utils.Uuid.__name__ = ["flash","utils","Uuid"];
flash.utils.Uuid.random = function(size) {
	if(size == null) size = 32;
	var nchars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".length;
	var uid = new StringBuf();
	var _g = 0;
	while(_g < size) {
		var i = _g++;
		uid.b += Std.string("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.random() * nchars | 0));
	}
	return uid.b;
}
flash.utils.Uuid.uuid = function() {
	return flash.utils.Uuid.random(8) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(4) + "-" + flash.utils.Uuid.random(12);
}
flash.geom.Transform = function(displayObject) {
	if(displayObject == null) throw "Cannot create Transform with no DisplayObject.";
	this._displayObject = displayObject;
	this._matrix = new flash.geom.Matrix();
	this._fullMatrix = new flash.geom.Matrix();
	this.set_colorTransform(new flash.geom.ColorTransform());
};
$hxClasses["flash.geom.Transform"] = flash.geom.Transform;
flash.geom.Transform.__name__ = ["flash","geom","Transform"];
flash.geom.Transform.prototype = {
	get_pixelBounds: function() {
		return this._displayObject.getBounds(null);
	}
	,set_matrix: function(inValue) {
		this._matrix.copy(inValue);
		this._displayObject.__matrixOverridden();
		return this._matrix;
	}
	,get_matrix: function() {
		return this._matrix.clone();
	}
	,get_concatenatedMatrix: function() {
		return this.__getFullMatrix(this._matrix);
	}
	,set_colorTransform: function(inValue) {
		this.colorTransform = inValue;
		return inValue;
	}
	,__setMatrix: function(inValue) {
		this._matrix.copy(inValue);
	}
	,__setFullMatrix: function(inValue) {
		this._fullMatrix.copy(inValue);
		return this._fullMatrix;
	}
	,__getFullMatrix: function(localMatrix) {
		var m;
		if(localMatrix != null) m = localMatrix.mult(this._fullMatrix); else m = this._fullMatrix.clone();
		return m;
	}
	,__class__: flash.geom.Transform
	,__properties__: {set_colorTransform:"set_colorTransform",get_concatenatedMatrix:"get_concatenatedMatrix",set_matrix:"set_matrix",get_matrix:"get_matrix",get_pixelBounds:"get_pixelBounds"}
}
flash.geom.ColorTransform = function(inRedMultiplier,inGreenMultiplier,inBlueMultiplier,inAlphaMultiplier,inRedOffset,inGreenOffset,inBlueOffset,inAlphaOffset) {
	if(inAlphaOffset == null) inAlphaOffset = 0;
	if(inBlueOffset == null) inBlueOffset = 0;
	if(inGreenOffset == null) inGreenOffset = 0;
	if(inRedOffset == null) inRedOffset = 0;
	if(inAlphaMultiplier == null) inAlphaMultiplier = 1;
	if(inBlueMultiplier == null) inBlueMultiplier = 1;
	if(inGreenMultiplier == null) inGreenMultiplier = 1;
	if(inRedMultiplier == null) inRedMultiplier = 1;
	this.redMultiplier = inRedMultiplier == null?1.0:inRedMultiplier;
	this.greenMultiplier = inGreenMultiplier == null?1.0:inGreenMultiplier;
	this.blueMultiplier = inBlueMultiplier == null?1.0:inBlueMultiplier;
	this.alphaMultiplier = inAlphaMultiplier == null?1.0:inAlphaMultiplier;
	this.redOffset = inRedOffset == null?0.0:inRedOffset;
	this.greenOffset = inGreenOffset == null?0.0:inGreenOffset;
	this.blueOffset = inBlueOffset == null?0.0:inBlueOffset;
	this.alphaOffset = inAlphaOffset == null?0.0:inAlphaOffset;
};
$hxClasses["flash.geom.ColorTransform"] = flash.geom.ColorTransform;
flash.geom.ColorTransform.__name__ = ["flash","geom","ColorTransform"];
flash.geom.ColorTransform.prototype = {
	set_color: function(value) {
		this.redOffset = value >> 16 & 255;
		this.greenOffset = value >> 8 & 255;
		this.blueOffset = value & 255;
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		return this.get_color();
	}
	,get_color: function() {
		return (this.redOffset | 0) << 16 | (this.greenOffset | 0) << 8 | (this.blueOffset | 0);
	}
	,concat: function(second) {
		this.redMultiplier += second.redMultiplier;
		this.greenMultiplier += second.greenMultiplier;
		this.blueMultiplier += second.blueMultiplier;
		this.alphaMultiplier += second.alphaMultiplier;
	}
	,__class__: flash.geom.ColorTransform
	,__properties__: {set_color:"set_color",get_color:"get_color"}
}
flash.geom.Rectangle = function(inX,inY,inWidth,inHeight) {
	if(inHeight == null) inHeight = 0;
	if(inWidth == null) inWidth = 0;
	if(inY == null) inY = 0;
	if(inX == null) inX = 0;
	this.x = inX;
	this.y = inY;
	this.width = inWidth;
	this.height = inHeight;
};
$hxClasses["flash.geom.Rectangle"] = flash.geom.Rectangle;
flash.geom.Rectangle.__name__ = ["flash","geom","Rectangle"];
flash.geom.Rectangle.prototype = {
	set_topLeft: function(p) {
		this.x = p.x;
		this.y = p.y;
		return p.clone();
	}
	,get_topLeft: function() {
		return new flash.geom.Point(this.x,this.y);
	}
	,set_top: function(t) {
		this.height -= t - this.y;
		this.y = t;
		return t;
	}
	,get_top: function() {
		return this.y;
	}
	,set_size: function(p) {
		this.width = p.x;
		this.height = p.y;
		return p.clone();
	}
	,get_size: function() {
		return new flash.geom.Point(this.width,this.height);
	}
	,set_right: function(r) {
		this.width = r - this.x;
		return r;
	}
	,get_right: function() {
		return this.x + this.width;
	}
	,set_left: function(l) {
		this.width -= l - this.x;
		this.x = l;
		return l;
	}
	,get_left: function() {
		return this.x;
	}
	,set_bottomRight: function(p) {
		this.width = p.x - this.x;
		this.height = p.y - this.y;
		return p.clone();
	}
	,get_bottomRight: function() {
		return new flash.geom.Point(this.x + this.width,this.y + this.height);
	}
	,set_bottom: function(b) {
		this.height = b - this.y;
		return b;
	}
	,get_bottom: function() {
		return this.y + this.height;
	}
	,union: function(toUnion) {
		var x0 = this.x > toUnion.x?toUnion.x:this.x;
		var x1 = this.get_right() < toUnion.get_right()?toUnion.get_right():this.get_right();
		var y0 = this.y > toUnion.y?toUnion.y:this.y;
		var y1 = this.get_bottom() < toUnion.get_bottom()?toUnion.get_bottom():this.get_bottom();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,transform: function(m) {
		var tx0 = m.a * this.x + m.c * this.y;
		var tx1 = tx0;
		var ty0 = m.b * this.x + m.d * this.y;
		var ty1 = tx0;
		var tx = m.a * (this.x + this.width) + m.c * this.y;
		var ty = m.b * (this.x + this.width) + m.d * this.y;
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * (this.x + this.width) + m.c * (this.y + this.height);
		ty = m.b * (this.x + this.width) + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		tx = m.a * this.x + m.c * (this.y + this.height);
		ty = m.b * this.x + m.d * (this.y + this.height);
		if(tx < tx0) tx0 = tx;
		if(ty < ty0) ty0 = ty;
		if(tx > tx1) tx1 = tx;
		if(ty > ty1) ty1 = ty;
		return new flash.geom.Rectangle(tx0 + m.tx,ty0 + m.ty,tx1 - tx0,ty1 - ty0);
	}
	,setEmpty: function() {
		this.x = this.y = this.width = this.height = 0;
	}
	,offsetPoint: function(point) {
		this.x += point.x;
		this.y += point.y;
	}
	,offset: function(dx,dy) {
		this.x += dx;
		this.y += dy;
	}
	,isEmpty: function() {
		return this.width <= 0 || this.height <= 0;
	}
	,intersects: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return false;
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		return y1 > y0;
	}
	,intersection: function(toIntersect) {
		var x0 = this.x < toIntersect.x?toIntersect.x:this.x;
		var x1 = this.get_right() > toIntersect.get_right()?toIntersect.get_right():this.get_right();
		if(x1 <= x0) return new flash.geom.Rectangle();
		var y0 = this.y < toIntersect.y?toIntersect.y:this.y;
		var y1 = this.get_bottom() > toIntersect.get_bottom()?toIntersect.get_bottom():this.get_bottom();
		if(y1 <= y0) return new flash.geom.Rectangle();
		return new flash.geom.Rectangle(x0,y0,x1 - x0,y1 - y0);
	}
	,inflatePoint: function(point) {
		this.inflate(point.x,point.y);
	}
	,inflate: function(dx,dy) {
		this.x -= dx;
		this.width += dx * 2;
		this.y -= dy;
		this.height += dy * 2;
	}
	,extendBounds: function(r) {
		var dx = this.x - r.x;
		if(dx > 0) {
			this.x -= dx;
			this.width += dx;
		}
		var dy = this.y - r.y;
		if(dy > 0) {
			this.y -= dy;
			this.height += dy;
		}
		if(r.get_right() > this.get_right()) this.set_right(r.get_right());
		if(r.get_bottom() > this.get_bottom()) this.set_bottom(r.get_bottom());
	}
	,equals: function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y && this.width == toCompare.width && this.height == toCompare.height;
	}
	,containsRect: function(rect) {
		if(rect.width <= 0 || rect.height <= 0) return rect.x > this.x && rect.y > this.y && rect.get_right() < this.get_right() && rect.get_bottom() < this.get_bottom(); else return rect.x >= this.x && rect.y >= this.y && rect.get_right() <= this.get_right() && rect.get_bottom() <= this.get_bottom();
	}
	,containsPoint: function(point) {
		return this.contains(point.x,point.y);
	}
	,contains: function(inX,inY) {
		return inX >= this.x && inY >= this.y && inX < this.get_right() && inY < this.get_bottom();
	}
	,clone: function() {
		return new flash.geom.Rectangle(this.x,this.y,this.width,this.height);
	}
	,__class__: flash.geom.Rectangle
	,__properties__: {set_bottom:"set_bottom",get_bottom:"get_bottom",set_bottomRight:"set_bottomRight",get_bottomRight:"get_bottomRight",set_left:"set_left",get_left:"get_left",set_right:"set_right",get_right:"get_right",set_size:"set_size",get_size:"get_size",set_top:"set_top",get_top:"get_top",set_topLeft:"set_topLeft",get_topLeft:"get_topLeft"}
}
flash.display.MovieClip = function() {
	flash.display.Sprite.call(this);
	this.enabled = true;
	this.__currentFrame = 0;
	this.__totalFrames = 0;
	this.loaderInfo = flash.display.LoaderInfo.create(null);
};
$hxClasses["flash.display.MovieClip"] = flash.display.MovieClip;
flash.display.MovieClip.__name__ = ["flash","display","MovieClip"];
flash.display.MovieClip.__super__ = flash.display.Sprite;
flash.display.MovieClip.prototype = $extend(flash.display.Sprite.prototype,{
	get_totalFrames: function() {
		return this.__totalFrames;
	}
	,get_framesLoaded: function() {
		return this.__totalFrames;
	}
	,get_currentFrame: function() {
		return this.__currentFrame;
	}
	,toString: function() {
		return "[MovieClip name=" + this.name + " id=" + this.___id + "]";
	}
	,stop: function() {
	}
	,prevFrame: function() {
	}
	,play: function() {
	}
	,nextFrame: function() {
	}
	,gotoAndStop: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,gotoAndPlay: function(frame,scene) {
		if(scene == null) scene = "";
	}
	,__class__: flash.display.MovieClip
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{get_currentFrame:"get_currentFrame",get_framesLoaded:"get_framesLoaded",get_totalFrames:"get_totalFrames"})
});
flash.media = {}
flash.media.SoundTransform = function(vol,panning) {
	if(panning == null) panning = 0;
	if(vol == null) vol = 1;
	this.volume = vol;
	this.pan = panning;
	this.leftToLeft = 0;
	this.leftToRight = 0;
	this.rightToLeft = 0;
	this.rightToRight = 0;
};
$hxClasses["flash.media.SoundTransform"] = flash.media.SoundTransform;
flash.media.SoundTransform.__name__ = ["flash","media","SoundTransform"];
flash.media.SoundTransform.prototype = {
	__class__: flash.media.SoundTransform
}
com.haxepunk.HXP = function() { }
$hxClasses["com.haxepunk.HXP"] = com.haxepunk.HXP;
com.haxepunk.HXP.__name__ = ["com","haxepunk","HXP"];
com.haxepunk.HXP.__properties__ = {get_RAD:"get_RAD",get_DEG:"get_DEG",set_time:"set_time",get_console:"get_console",get_random:"get_random",set_randomSeed:"set_randomSeed",set_pan:"set_pan",get_pan:"get_pan",set_volume:"set_volume",get_volume:"get_volume",set_fullscreen:"set_fullscreen",get_fullscreen:"get_fullscreen",set_scene:"set_scene",get_scene:"get_scene",set_world:"set_world",get_world:"get_world",get_choose:"get_choose",set_renderMode:"set_renderMode",get_NUMBER_MAX_VALUE:"get_NUMBER_MAX_VALUE"}
com.haxepunk.HXP.get_NUMBER_MAX_VALUE = function() {
	return 179 * Math.pow(10,306);
}
com.haxepunk.HXP.set_renderMode = function(value) {
	com.haxepunk.HXP.renderMode = value;
	if(com.haxepunk.HXP.screen == null) com.haxepunk.HXP.screen = new com.haxepunk.Screen(); else com.haxepunk.HXP.screen.init();
	return value;
}
com.haxepunk.HXP.get_world = function() {
	com.haxepunk.HXP.log("HXP.world is deprecated, please use HXP.scene instead");
	return com.haxepunk.HXP._scene;
}
com.haxepunk.HXP.set_world = function(value) {
	com.haxepunk.HXP.log("HXP.world is deprecated, please use HXP.scene instead");
	return com.haxepunk.HXP.set_scene(value);
}
com.haxepunk.HXP.get_scene = function() {
	return com.haxepunk.HXP._scene;
}
com.haxepunk.HXP.set_scene = function(value) {
	if(com.haxepunk.HXP._goto != null) {
		if(com.haxepunk.HXP._goto == value) return value;
	} else if(com.haxepunk.HXP._scene == value) return value;
	com.haxepunk.HXP._goto = value;
	return com.haxepunk.HXP._scene;
}
com.haxepunk.HXP.swapScene = function() {
	com.haxepunk.HXP._scene = com.haxepunk.HXP._goto;
	com.haxepunk.HXP._goto = null;
}
com.haxepunk.HXP.resize = function(width,height) {
	width = width / com.haxepunk.HXP.screen.fullScaleX | 0;
	height = height / com.haxepunk.HXP.screen.fullScaleY | 0;
	com.haxepunk.HXP.width = width;
	com.haxepunk.HXP.height = height;
	com.haxepunk.HXP.halfWidth = width / 2;
	com.haxepunk.HXP.halfHeight = height / 2;
	com.haxepunk.HXP.bounds.width = width;
	com.haxepunk.HXP.bounds.height = height;
	com.haxepunk.HXP.screen.resize();
}
com.haxepunk.HXP.clear = function(array) {
	array.length = 0;
}
com.haxepunk.HXP.setCamera = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.HXP.camera.x = x;
	com.haxepunk.HXP.camera.y = y;
}
com.haxepunk.HXP.resetCamera = function() {
	com.haxepunk.HXP.camera.x = com.haxepunk.HXP.camera.y = 0;
}
com.haxepunk.HXP.get_fullscreen = function() {
	return com.haxepunk.HXP.stage.displayState == flash.display.StageDisplayState.FULL_SCREEN;
}
com.haxepunk.HXP.set_fullscreen = function(value) {
	if(value) com.haxepunk.HXP.stage.set_displayState(flash.display.StageDisplayState.FULL_SCREEN); else com.haxepunk.HXP.stage.set_displayState(flash.display.StageDisplayState.NORMAL);
	return value;
}
com.haxepunk.HXP.get_volume = function() {
	return com.haxepunk.HXP._volume;
}
com.haxepunk.HXP.set_volume = function(value) {
	if(value < 0) value = 0;
	if(com.haxepunk.HXP._volume == value) return value;
	com.haxepunk.HXP._soundTransform.volume = com.haxepunk.HXP._volume = value;
	return com.haxepunk.HXP._volume;
}
com.haxepunk.HXP.get_pan = function() {
	return com.haxepunk.HXP._pan;
}
com.haxepunk.HXP.set_pan = function(value) {
	if(value < -1) value = -1;
	if(value > 1) value = 1;
	if(com.haxepunk.HXP._pan == value) return value;
	com.haxepunk.HXP._soundTransform.pan = com.haxepunk.HXP._pan = value;
	return com.haxepunk.HXP._pan;
}
com.haxepunk.HXP.get_choose = function() {
	return Reflect.makeVarArgs(com.haxepunk.HXP._choose);
}
com.haxepunk.HXP._choose = function(objs) {
	if(objs == null || objs.length == 0 || objs.length == 1 && Reflect.hasField(objs[0],"length") && objs[0].length == 0) throw "Can't choose a random element on an empty array";
	if(objs.length == 1 && Reflect.hasField(objs[0],"length")) return objs[0][(function($this) {
		var $r;
		com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
		$r = com.haxepunk.HXP._seed / 2147483646 * objs[0].length | 0;
		return $r;
	}(this))];
	return objs[(function($this) {
		var $r;
		com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
		$r = com.haxepunk.HXP._seed / 2147483646 * objs.length | 0;
		return $r;
	}(this))];
}
com.haxepunk.HXP.sign = function(value) {
	return value < 0?-1:value > 0?1:0;
}
com.haxepunk.HXP.approach = function(value,target,amount) {
	if(value < target - amount) return value + amount; else if(value > target + amount) return value - amount; else return target;
}
com.haxepunk.HXP.lerp = function(a,b,t) {
	if(t == null) t = 1;
	return a + (b - a) * t;
}
com.haxepunk.HXP.colorLerp = function(fromColor,toColor,t) {
	if(t == null) t = 1;
	if(t <= 0) return fromColor; else if(t >= 1) return toColor; else {
		var a = fromColor >> 24 & 255, r = fromColor >> 16 & 255, g = fromColor >> 8 & 255, b = fromColor & 255, dA = (toColor >> 24 & 255) - a, dR = (toColor >> 16 & 255) - r, dG = (toColor >> 8 & 255) - g, dB = (toColor & 255) - b;
		a += dA * t | 0;
		r += dR * t | 0;
		g += dG * t | 0;
		b += dB * t | 0;
		return a << 24 | r << 16 | g << 8 | b;
	}
}
com.haxepunk.HXP.stepTowards = function(object,x,y,distance) {
	if(distance == null) distance = 1;
	com.haxepunk.HXP.point.x = x - object.x;
	com.haxepunk.HXP.point.y = y - object.y;
	if(com.haxepunk.HXP.point.get_length() <= distance) {
		object.x = x;
		object.y = y;
		return;
	}
	com.haxepunk.HXP.point.normalize(distance);
	object.x += com.haxepunk.HXP.point.x;
	object.y += com.haxepunk.HXP.point.y;
}
com.haxepunk.HXP.anchorTo = function(object,anchor,distance) {
	if(distance == null) distance = 0;
	com.haxepunk.HXP.point.x = object.x - anchor.x;
	com.haxepunk.HXP.point.y = object.y - anchor.y;
	if(com.haxepunk.HXP.point.get_length() > distance) com.haxepunk.HXP.point.normalize(distance);
	object.x = anchor.x + com.haxepunk.HXP.point.x;
	object.y = anchor.y + com.haxepunk.HXP.point.y;
}
com.haxepunk.HXP.angle = function(x1,y1,x2,y2) {
	var a = Math.atan2(y2 - y1,x2 - x1) * (-180 / Math.PI);
	return a < 0?a + 360:a;
}
com.haxepunk.HXP.angleXY = function(object,angle,length,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(length == null) length = 1;
	angle *= Math.PI / -180;
	object.x = Math.cos(angle) * length + x;
	object.y = Math.sin(angle) * length + y;
}
com.haxepunk.HXP.angleDifference = function(angle1,angle2) {
	var diff = angle2 - angle1;
	while(diff < -180) diff += 360;
	while(diff > 180) diff -= 360;
	return diff;
}
com.haxepunk.HXP.rotateAround = function(object,anchor,angle,relative) {
	if(relative == null) relative = true;
	if(angle == null) angle = 0;
	if(relative) angle += com.haxepunk.HXP.angle(anchor.x,anchor.y,object.x,object.y);
	com.haxepunk.HXP.angleXY(object,angle,com.haxepunk.HXP.distance(anchor.x,anchor.y,object.x,object.y),anchor.x,anchor.y);
}
com.haxepunk.HXP.round = function(num,precision) {
	var exp = Math.pow(10,precision);
	return Math.round(num * exp) / exp;
}
com.haxepunk.HXP.distance = function(x1,y1,x2,y2) {
	if(y2 == null) y2 = 0;
	if(x2 == null) x2 = 0;
	return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
com.haxepunk.HXP.distanceSquared = function(x1,y1,x2,y2) {
	if(y2 == null) y2 = 0;
	if(x2 == null) x2 = 0;
	return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}
com.haxepunk.HXP.distanceRects = function(x1,y1,w1,h1,x2,y2,w2,h2) {
	if(x1 < x2 + w2 && x2 < x1 + w1) {
		if(y1 < y2 + h2 && y2 < y1 + h1) return 0;
		if(y1 > y2) return y1 - (y2 + h2);
		return y2 - (y1 + h1);
	}
	if(y1 < y2 + h2 && y2 < y1 + h1) {
		if(x1 > x2) return x1 - (x2 + w2);
		return x2 - (x1 + w1);
	}
	if(x1 > x2) {
		if(y1 > y2) return com.haxepunk.HXP.distance(x1,y1,x2 + w2,y2 + h2);
		return com.haxepunk.HXP.distance(x1,y1 + h1,x2 + w2,y2);
	}
	if(y1 > y2) return com.haxepunk.HXP.distance(x1 + w1,y1,x2,y2 + h2);
	return com.haxepunk.HXP.distance(x1 + w1,y1 + h1,x2,y2);
}
com.haxepunk.HXP.distanceRectPoint = function(px,py,rx,ry,rw,rh) {
	if(px >= rx && px <= rx + rw) {
		if(py >= ry && py <= ry + rh) return 0;
		if(py > ry) return py - (ry + rh);
		return ry - py;
	}
	if(py >= ry && py <= ry + rh) {
		if(px > rx) return px - (rx + rw);
		return rx - px;
	}
	if(px > rx) {
		if(py > ry) return com.haxepunk.HXP.distance(px,py,rx + rw,ry + rh);
		return com.haxepunk.HXP.distance(px,py,rx + rw,ry);
	}
	if(py > ry) return com.haxepunk.HXP.distance(px,py,rx,ry + rh);
	return Math.sqrt((rx - px) * (rx - px) + (ry - py) * (ry - py));
}
com.haxepunk.HXP.clamp = function(value,min,max) {
	if(max > min) {
		if(value < min) return min; else if(value > max) return max; else return value;
	} else if(value < max) return max; else if(value > min) return min; else return value;
}
com.haxepunk.HXP.clampInRect = function(object,x,y,width,height,padding) {
	if(padding == null) padding = 0;
	object.x = com.haxepunk.HXP.clamp(object.x,x + padding,x + width - padding);
	object.y = com.haxepunk.HXP.clamp(object.y,y + padding,y + height - padding);
}
com.haxepunk.HXP.scale = function(value,min,max,min2,max2) {
	return min2 + (value - min) / (max - min) * (max2 - min2);
}
com.haxepunk.HXP.scaleClamp = function(value,min,max,min2,max2) {
	value = min2 + (value - min) / (max - min) * (max2 - min2);
	if(max2 > min2) {
		value = value < max2?value:max2;
		return value > min2?value:min2;
	}
	value = value < min2?value:min2;
	return value > max2?value:max2;
}
com.haxepunk.HXP.set_randomSeed = function(value) {
	com.haxepunk.HXP._seed = com.haxepunk.HXP.clamp(value,1.0,2147483646) | 0;
	com.haxepunk.HXP.randomSeed = com.haxepunk.HXP._seed;
	return com.haxepunk.HXP._seed;
}
com.haxepunk.HXP.randomizeSeed = function() {
	com.haxepunk.HXP._seed = com.haxepunk.HXP.clamp(2147483646 * Math.random() | 0,1.0,2147483646) | 0;
	com.haxepunk.HXP.randomSeed = com.haxepunk.HXP._seed;
	com.haxepunk.HXP._seed;
}
com.haxepunk.HXP.get_random = function() {
	com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
	return com.haxepunk.HXP._seed / 2147483646;
}
com.haxepunk.HXP.rand = function(amount) {
	com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
	return com.haxepunk.HXP._seed / 2147483646 * amount | 0;
}
com.haxepunk.HXP.indexOf = function(arr,v) {
	return arr.indexOf(v);
}
com.haxepunk.HXP.next = function(current,options,loop) {
	if(loop == null) loop = true;
	if(loop) return options[(options.indexOf(current) + 1) % options.length]; else return options[Math.max(options.indexOf(current) + 1,options.length - 1) | 0];
}
com.haxepunk.HXP.prev = function(current,options,loop) {
	if(loop == null) loop = true;
	if(loop) return options[(options.indexOf(current) - 1 + options.length) % options.length]; else return options[Math.max(options.indexOf(current) - 1,0) | 0];
}
com.haxepunk.HXP.swap = function(current,a,b) {
	return current == a?b:a;
}
com.haxepunk.HXP.getColorRGB = function(R,G,B) {
	if(B == null) B = 0;
	if(G == null) G = 0;
	if(R == null) R = 0;
	return R << 16 | G << 8 | B;
}
com.haxepunk.HXP.getColorHSV = function(h,s,v) {
	h = h * 360 | 0;
	var hi = Math.floor(h / 60) % 6, f = h / 60 - Math.floor(h / 60), p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
	switch(hi) {
	case 0:
		return (v * 255 | 0) << 16 | (t * 255 | 0) << 8 | (p * 255 | 0);
	case 1:
		return (q * 255 | 0) << 16 | (v * 255 | 0) << 8 | (p * 255 | 0);
	case 2:
		return (p * 255 | 0) << 16 | (v * 255 | 0) << 8 | (t * 255 | 0);
	case 3:
		return (p * 255 | 0) << 16 | (q * 255 | 0) << 8 | (v * 255 | 0);
	case 4:
		return (t * 255 | 0) << 16 | (p * 255 | 0) << 8 | (v * 255 | 0);
	case 5:
		return (v * 255 | 0) << 16 | (p * 255 | 0) << 8 | (q * 255 | 0);
	default:
		return 0;
	}
	return 0;
}
com.haxepunk.HXP.getColorHue = function(color) {
	var h = color >> 16 & 255;
	var s = color >> 8 & 255;
	var v = color & 255;
	var max = Math.max(h,Math.max(s,v)) | 0;
	var min = Math.min(h,Math.min(s,v)) | 0;
	var hue = 0;
	if(max == min) hue = 0; else if(max == h) hue = (60 * (s - v) / (max - min) + 360) % 360; else if(max == s) hue = 60 * (v - h) / (max - min) + 120; else if(max == v) hue = 60 * (h - s) / (max - min) + 240;
	return hue / 360;
}
com.haxepunk.HXP.getColorSaturation = function(color) {
	var h = color >> 16 & 255;
	var s = color >> 8 & 255;
	var v = color & 255;
	var max = Math.max(h,Math.max(s,v)) | 0;
	if(max == 0) return 0; else {
		var min = Math.min(h,Math.min(s,v)) | 0;
		return (max - min) / max;
	}
}
com.haxepunk.HXP.getColorValue = function(color) {
	var h = color >> 16 & 255;
	var s = color >> 8 & 255;
	var v = color & 255;
	return (Math.max(h,Math.max(s,v)) | 0) / 255;
}
com.haxepunk.HXP.getRed = function(color) {
	return color >> 16 & 255;
}
com.haxepunk.HXP.getGreen = function(color) {
	return color >> 8 & 255;
}
com.haxepunk.HXP.getBlue = function(color) {
	return color & 255;
}
com.haxepunk.HXP.getBitmap = function(source) {
	var name = Std.string(source);
	if(com.haxepunk.HXP._bitmap.exists(name)) return com.haxepunk.HXP._bitmap.get(name);
	var data = openfl.Assets.getBitmapData(source,false);
	if(data != null) com.haxepunk.HXP._bitmap.set(name,data);
	return data;
}
com.haxepunk.HXP.removeBitmap = function(source) {
	var name = Std.string(source);
	if(com.haxepunk.HXP._bitmap.exists(name)) {
		var bitmap = com.haxepunk.HXP._bitmap.get(name);
		bitmap.dispose();
		bitmap = null;
		return com.haxepunk.HXP._bitmap.remove(name);
	}
	return false;
}
com.haxepunk.HXP.createBitmap = function(width,height,transparent,color) {
	if(color == null) color = 0;
	if(transparent == null) transparent = false;
	return new flash.display.BitmapData(width,height,transparent,color);
}
com.haxepunk.HXP.timeFlag = function() {
	var t = haxe.Timer.stamp(), e = t - com.haxepunk.HXP._time;
	com.haxepunk.HXP._time = t;
	return e;
}
com.haxepunk.HXP.get_console = function() {
	if(com.haxepunk.HXP._console == null) com.haxepunk.HXP._console = new com.haxepunk.debug.Console();
	return com.haxepunk.HXP._console;
}
com.haxepunk.HXP.consoleEnabled = function() {
	return com.haxepunk.HXP._console != null;
}
com.haxepunk.HXP.tween = function(object,values,duration,options) {
	if(options != null && Reflect.hasField(options,"delay")) {
		var delay = options.delay;
		Reflect.deleteField(options,"delay");
		com.haxepunk.HXP.alarm(delay,function(o) {
			com.haxepunk.HXP.tween(object,values,duration,options);
		});
		return null;
	}
	var type = com.haxepunk.TweenType.OneShot, complete = null, ease = null, tweener = com.haxepunk.HXP.tweener;
	if(js.Boot.__instanceof(object,com.haxepunk.Tweener)) tweener = js.Boot.__cast(object , com.haxepunk.Tweener);
	if(options != null) {
		if(Reflect.hasField(options,"type")) type = options.type;
		if(Reflect.hasField(options,"complete")) complete = options.complete;
		if(Reflect.hasField(options,"ease")) ease = options.ease;
		if(Reflect.hasField(options,"tweener")) tweener = options.tweener;
	}
	var tween = new com.haxepunk.tweens.misc.MultiVarTween(complete,type);
	tween.tween(object,values,duration,ease);
	tweener.addTween(tween);
	return tween;
}
com.haxepunk.HXP.alarm = function(delay,complete,type,tweener) {
	if(type == null) type = com.haxepunk.TweenType.OneShot;
	if(tweener == null) tweener = com.haxepunk.HXP.tweener;
	var alarm = new com.haxepunk.tweens.misc.Alarm(delay,complete,type);
	tweener.addTween(alarm,true);
	return alarm;
}
com.haxepunk.HXP.frames = function(from,to,skip) {
	if(skip == null) skip = 0;
	var a = new Array();
	skip++;
	if(from < to) while(from <= to) {
		a.push(from);
		from += skip;
	} else while(from >= to) {
		a.push(from);
		from -= skip;
	}
	return a;
}
com.haxepunk.HXP.shuffle = function(a) {
	if(js.Boot.__instanceof(a,Array)) {
		var i = a.length, j, t;
		while(--i > 0) {
			t = a[i];
			a[i] = a[j = (function($this) {
				var $r;
				com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
				$r = com.haxepunk.HXP._seed / 2147483646 * (i + 1) | 0;
				return $r;
			}(this))];
			a[j] = t;
		}
	}
}
com.haxepunk.HXP.resizeStage = function(width,height) {
}
com.haxepunk.HXP.set_time = function(value) {
	com.haxepunk.HXP._time = value;
	return com.haxepunk.HXP._time;
}
com.haxepunk.HXP.gotoIsNull = function() {
	return com.haxepunk.HXP._goto == null;
}
com.haxepunk.HXP.get_DEG = function() {
	return -180 / Math.PI;
}
com.haxepunk.HXP.get_RAD = function() {
	return Math.PI / -180;
}
com.haxepunk.Mask = function() {
	this._class = Type.getClassName(Type.getClass(this));
	this._check = new haxe.ds.StringMap();
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Masklist),$bind(this,this.collideMasklist));
};
$hxClasses["com.haxepunk.Mask"] = com.haxepunk.Mask;
com.haxepunk.Mask.__name__ = ["com","haxepunk","Mask"];
com.haxepunk.Mask.prototype = {
	project: function(axis,projection) {
		var cur, max = -9999999999.0, min = 9999999999.0;
		cur = -this.parent.originX * axis.x - this.parent.originY * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		cur = (-this.parent.originX + this.parent.width) * axis.x - this.parent.originY * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		cur = -this.parent.originX * axis.x + (-this.parent.originY + this.parent.height) * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		cur = (-this.parent.originX + this.parent.width) * axis.x + (-this.parent.originY + this.parent.height) * axis.y;
		if(cur < min) min = cur;
		if(cur > max) max = cur;
		projection.min = min;
		projection.max = max;
	}
	,update: function() {
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
	}
	,assignTo: function(parent) {
		this.parent = parent;
		if(parent != null) this.update();
	}
	,collideMasklist: function(other) {
		return other.collide(this);
	}
	,collideMask: function(other) {
		return this.parent.get_x() - this.parent.originX + this.parent.width > other.parent.get_x() - other.parent.originX && this.parent.get_y() - this.parent.originY + this.parent.height > other.parent.get_y() - other.parent.originY && this.parent.get_x() - this.parent.originX < other.parent.get_x() - other.parent.originX + other.parent.width && this.parent.get_y() - this.parent.originY < other.parent.get_y() - other.parent.originY + other.parent.height;
	}
	,collide: function(mask) {
		if(this.parent == null) throw "Mask must be attached to a parent Entity";
		var cbFunc = this._check.get(mask._class);
		if(cbFunc != null) return cbFunc(mask);
		cbFunc = mask._check.get(this._class);
		if(cbFunc != null) return cbFunc(this);
		return false;
	}
	,__class__: com.haxepunk.Mask
}
com.haxepunk.Preloader = function() {
	NMEPreloader.call(this);
};
$hxClasses["com.haxepunk.Preloader"] = com.haxepunk.Preloader;
com.haxepunk.Preloader.__name__ = ["com","haxepunk","Preloader"];
com.haxepunk.Preloader.__super__ = NMEPreloader;
com.haxepunk.Preloader.prototype = $extend(NMEPreloader.prototype,{
	__class__: com.haxepunk.Preloader
});
com.haxepunk.RenderMode = $hxClasses["com.haxepunk.RenderMode"] = { __ename__ : true, __constructs__ : ["BUFFER","HARDWARE"] }
com.haxepunk.RenderMode.BUFFER = ["BUFFER",0];
com.haxepunk.RenderMode.BUFFER.toString = $estr;
com.haxepunk.RenderMode.BUFFER.__enum__ = com.haxepunk.RenderMode;
com.haxepunk.RenderMode.HARDWARE = ["HARDWARE",1];
com.haxepunk.RenderMode.HARDWARE.toString = $estr;
com.haxepunk.RenderMode.HARDWARE.__enum__ = com.haxepunk.RenderMode;
com.haxepunk.Screen = function() {
	this.needsResize = false;
	this.fullScaleY = 1;
	this.fullScaleX = 1;
	this.scale = 1;
	this.scaleY = 1;
	this.scaleX = 1;
	this.originY = 0;
	this.originX = 0;
	this.y = 0;
	this.x = 0;
	this._sprite = new flash.display.Sprite();
	this._bitmap = new Array();
	this.init();
};
$hxClasses["com.haxepunk.Screen"] = com.haxepunk.Screen;
com.haxepunk.Screen.__name__ = ["com","haxepunk","Screen"];
com.haxepunk.Screen.prototype = {
	capture: function() {
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) return new com.haxepunk.graphics.Image(this._bitmap[this._current].bitmapData.clone()); else throw "Screen.capture only supported with buffer rendering";
	}
	,get_mouseY: function() {
		return this._sprite.get_mouseY() | 0;
	}
	,get_mouseX: function() {
		return this._sprite.get_mouseX() | 0;
	}
	,set_smoothing: function(value) {
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) this._bitmap[0].smoothing = this._bitmap[1].smoothing = value; else com.haxepunk.graphics.atlas.Atlas.smooth = value;
		return value;
	}
	,get_smoothing: function() {
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) return this._bitmap[0].smoothing; else return com.haxepunk.graphics.atlas.Atlas.smooth;
	}
	,set_angle: function(value) {
		if(this._angle == value * (Math.PI / -180)) return value;
		this._angle = value * (Math.PI / -180);
		this.update();
		return this._angle;
	}
	,get_angle: function() {
		return this._angle * (-180 / Math.PI);
	}
	,set_scale: function(value) {
		if(this.scale == value) return value;
		this.scale = value;
		this.fullScaleX = this.scaleX * this.scale;
		this.fullScaleY = this.scaleY * this.scale;
		this.update();
		this.needsResize = true;
		return this.scale;
	}
	,set_scaleY: function(value) {
		if(this.scaleY == value) return value;
		this.scaleY = value;
		this.fullScaleY = this.scaleY * this.scale;
		this.update();
		this.needsResize = true;
		return this.scaleY;
	}
	,set_scaleX: function(value) {
		if(this.scaleX == value) return value;
		this.scaleX = value;
		this.fullScaleX = this.scaleX * this.scale;
		this.update();
		this.needsResize = true;
		return this.scaleX;
	}
	,set_originY: function(value) {
		if(this.originY == value) return value;
		this.originY = value;
		this.update();
		return this.originY;
	}
	,set_originX: function(value) {
		if(this.originX == value) return value;
		this.originX = value;
		this.update();
		return this.originX;
	}
	,set_y: function(value) {
		if(this.y == value) return value;
		this.y = value;
		this.update();
		return this.y;
	}
	,set_x: function(value) {
		if(this.x == value) return value;
		this.x = value;
		this.update();
		return this.x;
	}
	,set_color: function(value) {
		this._color = -16777216 | value;
		return value;
	}
	,get_color: function() {
		return this._color;
	}
	,update: function() {
		if(this._matrix == null) this._matrix = new flash.geom.Matrix();
		this._matrix.b = this._matrix.c = 0;
		this._matrix.a = this.fullScaleX;
		this._matrix.d = this.fullScaleY;
		this._matrix.set_tx(-this.originX * this._matrix.a);
		this._matrix.set_ty(-this.originY * this._matrix.d);
		if(this._angle != 0) this._matrix.rotate(this._angle);
		var _g = this._matrix;
		_g.set_tx(_g.tx + (this.originX * this.fullScaleX + this.x));
		var _g = this._matrix;
		_g.set_ty(_g.ty + (this.originY * this.fullScaleY + this.y));
		this._sprite.transform.set_matrix(this._matrix);
	}
	,redraw: function() {
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
			this._bitmap[this._current].set_visible(true);
			this._bitmap[1 - this._current].set_visible(false);
		}
	}
	,refresh: function() {
		com.haxepunk.HXP.buffer.fillRect(com.haxepunk.HXP.bounds,this._color);
	}
	,addFilter: function(filter) {
		this._sprite.set_filters(filter);
	}
	,swap: function() {
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
			this._current = 1 - this._current;
			com.haxepunk.HXP.buffer = this._bitmap[this._current].bitmapData;
		}
	}
	,resize: function() {
		this.width = com.haxepunk.HXP.width;
		this.height = com.haxepunk.HXP.height;
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
			this.disposeBitmap(this._bitmap[0]);
			this.disposeBitmap(this._bitmap[1]);
			this._bitmap[0] = new flash.display.Bitmap(com.haxepunk.HXP.createBitmap(this.width,this.height,true),flash.display.PixelSnapping.NEVER);
			this._bitmap[1] = new flash.display.Bitmap(com.haxepunk.HXP.createBitmap(this.width,this.height,true),flash.display.PixelSnapping.NEVER);
			this._sprite.addChild(this._bitmap[0]).set_visible(true);
			this._sprite.addChild(this._bitmap[1]).set_visible(false);
			com.haxepunk.HXP.buffer = this._bitmap[0].bitmapData;
		}
		this._current = 0;
		this.needsResize = false;
	}
	,disposeBitmap: function(bd) {
		if(bd != null) {
			this._sprite.removeChild(bd);
			bd.bitmapData.dispose();
		}
	}
	,init: function() {
		this.set_x(this.set_y(this.set_originX(this.set_originY(0))));
		this._angle = this._current = 0;
		this.set_scale(this.set_scaleX(this.set_scaleY(1)));
		this._color = -14671840;
		this.update();
		if(com.haxepunk.HXP.engine.contains(this._sprite)) com.haxepunk.HXP.engine.removeChild(this._sprite);
		if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) com.haxepunk.HXP.engine.addChild(this._sprite);
	}
	,__class__: com.haxepunk.Screen
	,__properties__: {set_color:"set_color",get_color:"get_color",set_x:"set_x",set_y:"set_y",set_originX:"set_originX",set_originY:"set_originY",set_scaleX:"set_scaleX",set_scaleY:"set_scaleY",set_scale:"set_scale",set_angle:"set_angle",get_angle:"get_angle",set_smoothing:"set_smoothing",get_smoothing:"get_smoothing",get_mouseX:"get_mouseX",get_mouseY:"get_mouseY"}
}
com.haxepunk.TweenType = $hxClasses["com.haxepunk.TweenType"] = { __ename__ : true, __constructs__ : ["Persist","Looping","OneShot"] }
com.haxepunk.TweenType.Persist = ["Persist",0];
com.haxepunk.TweenType.Persist.toString = $estr;
com.haxepunk.TweenType.Persist.__enum__ = com.haxepunk.TweenType;
com.haxepunk.TweenType.Looping = ["Looping",1];
com.haxepunk.TweenType.Looping.toString = $estr;
com.haxepunk.TweenType.Looping.__enum__ = com.haxepunk.TweenType;
com.haxepunk.TweenType.OneShot = ["OneShot",2];
com.haxepunk.TweenType.OneShot.toString = $estr;
com.haxepunk.TweenType.OneShot.__enum__ = com.haxepunk.TweenType;
com.haxepunk.Tween = function(duration,type,complete,ease) {
	this._target = duration;
	if(type == null) type = com.haxepunk.TweenType.Persist;
	this._type = type;
	this._ease = ease;
	this._t = 0;
	flash.events.EventDispatcher.call(this);
	if(complete != null) this.addEventListener(com.haxepunk.tweens.TweenEvent.FINISH,complete);
};
$hxClasses["com.haxepunk.Tween"] = com.haxepunk.Tween;
com.haxepunk.Tween.__name__ = ["com","haxepunk","Tween"];
com.haxepunk.Tween.__super__ = flash.events.EventDispatcher;
com.haxepunk.Tween.prototype = $extend(flash.events.EventDispatcher.prototype,{
	get_scale: function() {
		return this._t;
	}
	,set_percent: function(value) {
		this._time = this._target * value;
		return this._time;
	}
	,get_percent: function() {
		return this._time / this._target;
	}
	,cancel: function() {
		this.active = false;
		if(this._parent != null) this._parent.removeTween(this);
	}
	,finish: function() {
		var _g = this;
		switch( (_g._type)[1] ) {
		case 0:
			this._time = this._target;
			this.active = false;
			break;
		case 1:
			this._time %= this._target;
			this._t = this._time / this._target;
			if(this._ease != null && this._t > 0 && this._t < 1) this._t = this._ease(this._t);
			this.start();
			break;
		case 2:
			this._time = this._target;
			this.active = false;
			this._parent.removeTween(this);
			break;
		}
		this._finish = false;
		this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.FINISH));
	}
	,start: function() {
		this._time = 0;
		if(this._target == 0) {
			this.active = false;
			this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.FINISH));
		} else {
			this.active = true;
			this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.START));
		}
	}
	,update: function() {
		this._time += com.haxepunk.HXP.fixed?1:com.haxepunk.HXP.elapsed;
		this._t = this._time / this._target;
		if(this._ease != null && this._t > 0 && this._t < 1) this._t = this._ease(this._t);
		if(this._time >= this._target) {
			this._t = 1;
			this._finish = true;
		}
		this.dispatchEvent(new com.haxepunk.tweens.TweenEvent(com.haxepunk.tweens.TweenEvent.UPDATE));
	}
	,__class__: com.haxepunk.Tween
	,__properties__: {set_percent:"set_percent",get_percent:"get_percent",get_scale:"get_scale"}
});
com.haxepunk.debug = {}
com.haxepunk.debug.TraceCapture = $hxClasses["com.haxepunk.debug.TraceCapture"] = { __ename__ : true, __constructs__ : ["No","Yes"] }
com.haxepunk.debug.TraceCapture.No = ["No",0];
com.haxepunk.debug.TraceCapture.No.toString = $estr;
com.haxepunk.debug.TraceCapture.No.__enum__ = com.haxepunk.debug.TraceCapture;
com.haxepunk.debug.TraceCapture.Yes = ["Yes",1];
com.haxepunk.debug.TraceCapture.Yes.toString = $estr;
com.haxepunk.debug.TraceCapture.Yes.__enum__ = com.haxepunk.debug.TraceCapture;
com.haxepunk.debug.Console = function() {
	this.init();
	com.haxepunk.utils.Input.define("_ARROWS",[39,37,40,38]);
};
$hxClasses["com.haxepunk.debug.Console"] = com.haxepunk.debug.Console;
com.haxepunk.debug.Console.__name__ = ["com","haxepunk","debug","Console"];
com.haxepunk.debug.Console.prototype = {
	get_height: function() {
		return com.haxepunk.HXP.windowHeight;
	}
	,get_width: function() {
		return com.haxepunk.HXP.windowWidth;
	}
	,format: function(size,color,align) {
		if(align == null) align = "left";
		if(color == null) color = 16777215;
		if(size == null) size = 16;
		this._format.size = size;
		this._format.color = color;
		switch(align) {
		case "left":
			this._format.align = flash.text.TextFormatAlign.LEFT;
			break;
		case "right":
			this._format.align = flash.text.TextFormatAlign.RIGHT;
			break;
		case "center":
			this._format.align = flash.text.TextFormatAlign.CENTER;
			break;
		case "justify":
			this._format.align = flash.text.TextFormatAlign.JUSTIFY;
			break;
		}
		return this._format;
	}
	,updateButtons: function() {
		this._butRead.set_x(this.get_width() >= 420?this._fpsInfo.get_x() + this._fpsInfoText0.get_width() + this._fpsInfoText1.get_width() + ((this._entRead.get_x() - (this._fpsInfo.get_x() + this._fpsInfoText0.get_width() + this._fpsInfoText1.get_width())) / 2 | 0) - 30:180);
		this._butDebug.set_visible(this._paused && !this._debug);
		this._butOutput.set_visible(this._paused && this._debug);
		this._butPlay.set_visible(com.haxepunk.HXP.engine.paused);
		this._butPause.set_visible(!com.haxepunk.HXP.engine.paused);
		this._butStep.set_visible(this._paused);
		if(this._butDebug.bitmapData.rect.contains(this._butDebug.get_mouseX(),this._butDebug.get_mouseY())) {
			this._butDebug.alpha = this._butOutput.alpha = 1;
			if(com.haxepunk.utils.Input.mousePressed) this.set_debug(!this._debug);
		} else this._butDebug.alpha = this._butOutput.alpha = 0.5;
		if(this._butPlay.bitmapData.rect.contains(this._butPlay.get_mouseX(),this._butPlay.get_mouseY())) {
			this._butPlay.alpha = this._butPause.alpha = 1;
			if(com.haxepunk.utils.Input.mousePressed) {
				com.haxepunk.HXP.engine.paused = !com.haxepunk.HXP.engine.paused;
				this.renderEntities();
			}
		} else this._butPlay.alpha = this._butPause.alpha = 0.5;
		if(this._butStep.bitmapData.rect.contains(this._butStep.get_mouseX(),this._butStep.get_mouseY())) {
			this._butStep.alpha = 1;
			if(com.haxepunk.utils.Input.mousePressed) this.stepFrame();
		} else this._butStep.alpha = .5;
	}
	,updateEntityCount: function() {
		this._entReadText.set_text(Std.string(com.haxepunk.HXP._scene._count) + " Entities");
	}
	,updateDebugRead: function() {
		var str;
		var big = this.get_width() >= 420;
		var s = "Mouse: " + Std.string(com.haxepunk.HXP.screen.get_mouseX() + com.haxepunk.HXP._scene.camera.x | 0) + ", " + Std.string(com.haxepunk.HXP.screen.get_mouseY() + com.haxepunk.HXP._scene.camera.y | 0) + "\nCamera: " + Std.string(com.haxepunk.HXP.camera.x) + ", " + Std.string(com.haxepunk.HXP.camera.y);
		if(this.SELECT_LIST.length != 0) {
			if(this.SELECT_LIST.length > 1) s += "\n\nSelected: " + Std.string(this.SELECT_LIST.length); else {
				var e = this.SELECT_LIST[0];
				s += "\n\n- " + Type.getClassName(Type.getClass(e)) + " -\n";
				var _g = 0, _g1 = this.WATCH_LIST;
				while(_g < _g1.length) {
					var str1 = _g1[_g];
					++_g;
					var field = Reflect.field(e,str1);
					if(field != null) s += "\n" + str1 + ": " + Std.string(field);
				}
			}
		}
		this._debReadText1.set_text(s);
		this._debReadText1.setTextFormat(this.format(big?16:8));
		this._debReadText1.set_width(Math.max(this._debReadText1.get_textWidth() + 4,this._debReadText0.get_width()));
		this._debReadText1.set_height(this._debReadText1.get_y() + this._debReadText1.get_textHeight() + 4);
		this._debRead.set_y(this.get_height() - this._debReadText1.get_height() | 0);
		this._debRead.get_graphics().clear();
		this._debRead.get_graphics().beginFill(0,.75);
		this._debRead.get_graphics().drawRect(0,0,this._debReadText0.get_width() - 20,20);
		this._debRead.get_graphics().moveTo(this._debReadText0.get_width(),20);
		this._debRead.get_graphics().lineTo(this._debReadText0.get_width() - 20,20);
		this._debRead.get_graphics().lineTo(this._debReadText0.get_width() - 20,0);
		this._debRead.get_graphics().curveTo(this._debReadText0.get_width(),0,this._debReadText0.get_width(),20);
		this._debRead.get_graphics().drawRoundRect(-20,20,this._debReadText1.get_width() + 40,this.get_height() - this._debRead.get_y(),40,40);
	}
	,updateFPSRead: function() {
		this._fpsReadText.set_text("FPS: " + (com.haxepunk.HXP.frameRate | 0));
		this._fpsInfoText0.set_text("Update: " + Std.string(com.haxepunk.HXP._updateTime) + "ms\n" + "Render: " + Std.string(com.haxepunk.HXP._renderTime) + "ms");
		this._fpsInfoText1.set_text("System: " + Std.string(com.haxepunk.HXP._systemTime) + "ms\n" + "Game: " + Std.string(com.haxepunk.HXP._gameTime) + "ms");
		this._memReadText.set_text((this.get_width() >= 420?"Mem: ":"") + com.haxepunk.HXP.round(flash.system.System.get_totalMemory() / 1024 / 1024,2) + "MB");
	}
	,updateLog: function() {
		this._logHeight = this.get_height() - 60;
		this._logBar.height = this._logHeight - 8;
		if(this._paused) {
			this._logRead.set_y(40);
			this._logRead.get_graphics().clear();
			this._logRead.get_graphics().beginFill(0,.75);
			this._logRead.get_graphics().drawRect(0,0,this._logReadText0.get_width() - 20,20);
			this._logRead.get_graphics().moveTo(this._logReadText0.get_width(),20);
			this._logRead.get_graphics().lineTo(this._logReadText0.get_width() - 20,20);
			this._logRead.get_graphics().lineTo(this._logReadText0.get_width() - 20,0);
			this._logRead.get_graphics().curveTo(this._logReadText0.get_width(),0,this._logReadText0.get_width(),20);
			this._logRead.get_graphics().drawRect(0,20,this.get_width(),this._logHeight);
			this._logRead.get_graphics().beginFill(2105376,1);
			this._logRead.get_graphics().drawRoundRect(this._logBar.x,this._logBar.y,this._logBar.width,this._logBar.height,16,16);
			if(this.LOG.length > this._logLines) {
				this._logRead.get_graphics().beginFill(16777215,1);
				var y = this._logBar.y + 2 + (this._logBar.height - 16) * this._logScroll | 0;
				this._logRead.get_graphics().drawRoundRect(this._logBar.x + 2,y,12,12,12,12);
			}
			if(this.LOG.length != 0) {
				var i = this.LOG.length > this._logLines?Math.round((this.LOG.length - this._logLines) * this._logScroll) | 0:0, n = i + Math.min(this._logLines,this.LOG.length) | 0, s = "";
				while(i < n) s += this.LOG[i++] + "\n";
				this._logReadText1.set_text(s);
			} else this._logReadText1.set_text("");
			this._logReadText1.set_height(this._logHeight);
			this._logReadText1.set_x(32);
			this._logReadText1.set_y(24);
			this._fpsReadText.selectable = true;
			this._fpsInfoText0.selectable = true;
			this._fpsInfoText1.selectable = true;
			this._memReadText.selectable = true;
			this._entReadText.selectable = true;
			this._debReadText1.selectable = true;
		} else {
			this._logRead.set_y(this.get_height() - 40);
			this._logReadText1.set_height(20);
			this._logRead.get_graphics().clear();
			this._logRead.get_graphics().beginFill(0,.75);
			this._logRead.get_graphics().drawRect(0,0,this._logReadText0.get_width() - 20,20);
			this._logRead.get_graphics().moveTo(this._logReadText0.get_width(),20);
			this._logRead.get_graphics().lineTo(this._logReadText0.get_width() - 20,20);
			this._logRead.get_graphics().lineTo(this._logReadText0.get_width() - 20,0);
			this._logRead.get_graphics().curveTo(this._logReadText0.get_width(),0,this._logReadText0.get_width(),20);
			this._logRead.get_graphics().drawRect(0,20,this.get_width(),20);
			this._logReadText1.set_text(this.LOG.length != 0?this.LOG[this.LOG.length - 1]:"");
			this._logReadText1.set_x(2);
			this._logReadText1.set_y(21);
			this._logReadText1.selectable = false;
			this._fpsReadText.selectable = false;
			this._fpsInfoText0.selectable = false;
			this._fpsInfoText1.selectable = false;
			this._memReadText.selectable = false;
			this._entReadText.selectable = false;
			this._debReadText0.selectable = false;
			this._debReadText1.selectable = false;
		}
	}
	,renderEntities: function() {
		var e;
		this._entScreen.set_visible(this._debug);
		if(this._debug) {
			var g = this._entScreen.get_graphics(), sx = com.haxepunk.HXP.screen.fullScaleX, sy = com.haxepunk.HXP.screen.fullScaleY;
			g.clear();
			var _g = 0, _g1 = this.SCREEN_LIST;
			while(_g < _g1.length) {
				var e1 = _g1[_g];
				++_g;
				var graphicScrollX = e1._graphic != null?e1._graphic.scrollX:1;
				var graphicScrollY = e1._graphic != null?e1._graphic.scrollY:1;
				if(this.SELECT_LIST.indexOf(e1) < 0) {
					if(e1.width != 0 && e1.height != 0) {
						g.lineStyle(1,16711680);
						g.drawRect(((e1.followCamera?e1.x + com.haxepunk.HXP.camera.x:e1.x) - e1.originX - com.haxepunk.HXP.camera.x * graphicScrollX) * sx,((e1.followCamera?e1.y + com.haxepunk.HXP.camera.y:e1.y) - e1.originY - com.haxepunk.HXP.camera.y * graphicScrollY) * sy,e1.width * sx,e1.height * sy);
						if(e1._mask != null) {
							g.lineStyle(1,255);
							e1._mask.debugDraw(g,sx,sy);
						}
					}
					g.lineStyle(1,65280);
					g.drawRect(((e1.followCamera?e1.x + com.haxepunk.HXP.camera.x:e1.x) - com.haxepunk.HXP.camera.x * graphicScrollX) * sx - 3,((e1.followCamera?e1.y + com.haxepunk.HXP.camera.y:e1.y) - com.haxepunk.HXP.camera.y * graphicScrollY) * sy - 3,6,6);
				} else {
					if(e1.width != 0 && e1.height != 0) {
						g.lineStyle(1,16777215);
						g.drawRect(((e1.followCamera?e1.x + com.haxepunk.HXP.camera.x:e1.x) - e1.originX - com.haxepunk.HXP.camera.x * graphicScrollX) * sx,((e1.followCamera?e1.y + com.haxepunk.HXP.camera.y:e1.y) - e1.originY - com.haxepunk.HXP.camera.y * graphicScrollY) * sy,e1.width * sx,e1.height * sy);
						if(e1._mask != null) {
							g.lineStyle(1,255);
							e1._mask.debugDraw(g,sx,sy);
						}
					}
					g.lineStyle(1,16777215);
					g.drawRect(((e1.followCamera?e1.x + com.haxepunk.HXP.camera.x:e1.x) - com.haxepunk.HXP.camera.x * graphicScrollX) * sx - 3,((e1.followCamera?e1.y + com.haxepunk.HXP.camera.y:e1.y) - com.haxepunk.HXP.camera.y * graphicScrollY) * sy - 3,6,6);
				}
			}
		}
	}
	,updateEntityLists: function(fetchList) {
		if(fetchList == null) fetchList = true;
		if(fetchList) {
			this.ENTITY_LIST.length = 0;
			com.haxepunk.HXP._scene.getAll(this.ENTITY_LIST);
			var $it0 = this.LAYER_LIST.keys();
			while( $it0.hasNext() ) {
				var key = $it0.next();
				this.LAYER_LIST.set(key,0);
			}
		}
		this.SCREEN_LIST.length = 0;
		var _g = 0, _g1 = this.ENTITY_LIST;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var layer = e._layer;
			if((e._scene == null?false:e.collideRect(e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x,e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y,e._scene.camera.x,e._scene.camera.y,com.haxepunk.HXP.width,com.haxepunk.HXP.height)) && com.haxepunk.HXP._scene.layerVisible(layer)) this.SCREEN_LIST.push(e);
			if(fetchList) this.LAYER_LIST.set(layer,this.LAYER_LIST.exists(layer)?this.LAYER_LIST.get(layer) + 1:1);
		}
		if(fetchList) this._layerList.set(this.LAYER_LIST);
	}
	,updateKeyPanning: function() {
		com.haxepunk.HXP.point.x = (com.haxepunk.utils.Input.check(39)?1:0) - (com.haxepunk.utils.Input.check(37)?1:0);
		com.haxepunk.HXP.point.y = (com.haxepunk.utils.Input.check(40)?1:0) - (com.haxepunk.utils.Input.check(38)?1:0);
		if(com.haxepunk.HXP.point.x != 0 || com.haxepunk.HXP.point.y != 0) this.panCamera(com.haxepunk.HXP.point.x | 0,com.haxepunk.HXP.point.y | 0);
	}
	,updateKeyMoving: function() {
		com.haxepunk.HXP.point.x = (com.haxepunk.utils.Input.pressed(39)?1:0) - (com.haxepunk.utils.Input.pressed(37)?1:0);
		com.haxepunk.HXP.point.y = (com.haxepunk.utils.Input.pressed(40)?1:0) - (com.haxepunk.utils.Input.pressed(38)?1:0);
		if(com.haxepunk.HXP.point.x != 0 || com.haxepunk.HXP.point.y != 0) this.moveSelected(com.haxepunk.HXP.point.x | 0,com.haxepunk.HXP.point.y | 0);
	}
	,updateScrolling: function() {
		this._scrolling = com.haxepunk.utils.Input.mouseDown;
		this._logScroll = com.haxepunk.HXP.scaleClamp(com.haxepunk.utils.Input.get_mouseFlashY(),this._logBarGlobal.y,this._logBarGlobal.get_bottom(),0,1);
		this.updateLog();
	}
	,startScrolling: function() {
		if(this.LOG.length > this._logLines) this._scrolling = this._logBarGlobal.contains(com.haxepunk.utils.Input.get_mouseFlashX(),com.haxepunk.utils.Input.get_mouseFlashY());
	}
	,selectAll: function() {
		var numSelected = this.SELECT_LIST.length;
		this.SELECT_LIST.length = 0;
		if(numSelected != this.SCREEN_LIST.length) {
			var _g = 0, _g1 = this.SCREEN_LIST;
			while(_g < _g1.length) {
				var e = _g1[_g];
				++_g;
				this.SELECT_LIST.push(e);
			}
		}
		this.renderEntities();
	}
	,selectEntities: function(rect) {
		if(rect.width < 0) rect.x -= rect.width = -rect.width; else if(rect.width == 0) rect.width = 1;
		if(rect.height < 0) rect.y -= rect.height = -rect.height; else if(rect.height == 0) rect.height = 1;
		com.haxepunk.HXP.rect.width = com.haxepunk.HXP.rect.height = 6;
		var sx = com.haxepunk.HXP.screen.fullScaleX, sy = com.haxepunk.HXP.screen.fullScaleY, e;
		if(!com.haxepunk.utils.Input.check(17)) this.SELECT_LIST.length = 0;
		var _g = 0, _g1 = this.SCREEN_LIST;
		while(_g < _g1.length) {
			var e1 = _g1[_g];
			++_g;
			com.haxepunk.HXP.rect.x = ((e1.followCamera?e1.x + com.haxepunk.HXP.camera.x:e1.x) - com.haxepunk.HXP.camera.x) * sx - 3;
			com.haxepunk.HXP.rect.y = ((e1.followCamera?e1.y + com.haxepunk.HXP.camera.y:e1.y) - com.haxepunk.HXP.camera.y) * sy - 3;
			if(rect.intersects(com.haxepunk.HXP.rect)) {
				if(this.SELECT_LIST.indexOf(e1) < 0) this.SELECT_LIST.push(e1); else HxOverrides.remove(this.SELECT_LIST,e1);
			}
		}
	}
	,updateSelection: function() {
		this._entRect.width = com.haxepunk.utils.Input.get_mouseFlashX() - this._entRect.x;
		this._entRect.height = com.haxepunk.utils.Input.get_mouseFlashY() - this._entRect.y;
		if(com.haxepunk.utils.Input.mouseReleased) {
			this.selectEntities(this._entRect);
			this.renderEntities();
			this._selecting = false;
			this._entSelect.get_graphics().clear();
		} else {
			this._entSelect.get_graphics().clear();
			this._entSelect.get_graphics().lineStyle(1,16777215);
			this._entSelect.get_graphics().drawRect(this._entRect.x,this._entRect.y,this._entRect.width,this._entRect.height);
		}
	}
	,startSelection: function() {
		this._selecting = true;
		this._entRect.x = com.haxepunk.utils.Input.get_mouseFlashX();
		this._entRect.y = com.haxepunk.utils.Input.get_mouseFlashY();
		this._entRect.width = 0;
		this._entRect.height = 0;
	}
	,setCamera: function(x,y) {
		com.haxepunk.HXP.camera.x = x;
		com.haxepunk.HXP.camera.y = y;
		com.haxepunk.HXP.engine.render();
		this.updateEntityLists(true);
		this.renderEntities();
	}
	,panCamera: function(xDelta,yDelta) {
		com.haxepunk.HXP.camera.x += xDelta;
		com.haxepunk.HXP.camera.y += yDelta;
		com.haxepunk.HXP.engine.render();
		this.updateEntityLists(true);
		this.renderEntities();
	}
	,updatePanning: function() {
		if(com.haxepunk.utils.Input.mouseReleased) this._panning = false;
		this.panCamera(this._entRect.x - com.haxepunk.utils.Input.get_mouseX() | 0,this._entRect.y - com.haxepunk.utils.Input.get_mouseY() | 0);
		this._entRect.x = com.haxepunk.utils.Input.get_mouseX();
		this._entRect.y = com.haxepunk.utils.Input.get_mouseY();
	}
	,startPanning: function() {
		this._panning = true;
		this._entRect.x = com.haxepunk.utils.Input.get_mouseX();
		this._entRect.y = com.haxepunk.utils.Input.get_mouseY();
	}
	,moveSelected: function(xDelta,yDelta) {
		var _g = 0, _g1 = this.SELECT_LIST;
		while(_g < _g1.length) {
			var e = _g1[_g];
			++_g;
			var _g2 = e;
			_g2.x = (_g2.followCamera?_g2.x + com.haxepunk.HXP.camera.x:_g2.x) + xDelta;
			var _g2 = e;
			_g2.y = (_g2.followCamera?_g2.y + com.haxepunk.HXP.camera.y:_g2.y) + yDelta;
		}
		com.haxepunk.HXP.engine.render();
		this.renderEntities();
		this.updateEntityLists(true);
	}
	,updateDragging: function() {
		this.moveSelected(com.haxepunk.utils.Input.get_mouseX() - this._entRect.x | 0,com.haxepunk.utils.Input.get_mouseY() - this._entRect.y | 0);
		this._entRect.x = com.haxepunk.utils.Input.get_mouseX();
		this._entRect.y = com.haxepunk.utils.Input.get_mouseY();
		if(com.haxepunk.utils.Input.mouseReleased) this._dragging = false;
	}
	,startDragging: function() {
		this._dragging = true;
		this._entRect.x = com.haxepunk.utils.Input.get_mouseX();
		this._entRect.y = com.haxepunk.utils.Input.get_mouseY();
	}
	,stepFrame: function() {
		com.haxepunk.HXP.engine.update();
		com.haxepunk.HXP.engine.render();
		this.updateEntityCount();
		this.updateEntityLists();
		this.renderEntities();
	}
	,set_debug: function(value) {
		if(!this._enabled) return false;
		this._debug = value;
		this._debRead.set_visible(value);
		this._layerList.set_visible(value);
		this._logRead.set_visible(!value);
		if(value) this.updateEntityLists(); else this.updateLog();
		this.renderEntities();
		return this._debug;
	}
	,get_debug: function() {
		return this._debug;
	}
	,set_paused: function(value) {
		if(!this._enabled) return false;
		this._paused = value;
		com.haxepunk.HXP.engine.paused = value;
		this._back.set_visible(value);
		this._entScreen.set_visible(value);
		this._layerList.set_visible(value);
		this._butRead.set_visible(value);
		if(value) {
			if(this._debug) this.set_debug(true); else this.updateLog();
		} else {
			this._debRead.set_visible(false);
			this._logRead.set_visible(true);
			this.updateLog();
			this.ENTITY_LIST.length = 0;
			this.SCREEN_LIST.length = 0;
			this.SELECT_LIST.length = 0;
		}
		return this._paused;
	}
	,get_paused: function() {
		return this._paused;
	}
	,update: function() {
		if(!this._enabled || !this._visible) return;
		this._entRead.set_x(this.get_width() - this._entReadText.get_width());
		this._layerList.set_x(this.get_width() - this._layerList.get_width() - 20);
		this._layerList.set_y((this.get_height() - this._layerList.get_height()) / 2);
		if(this._butRead.get_visible()) this.updateButtons();
		if(this._paused) {
			if(this._debug) {
				this.updateEntityLists(com.haxepunk.HXP._scene._count != this.ENTITY_LIST.length);
				if(com.haxepunk.HXP.engine.paused) {
					if(com.haxepunk.utils.Input.mousePressed) {
						if(com.haxepunk.utils.Input.get_mouseFlashY() > 20 && (com.haxepunk.utils.Input.get_mouseFlashX() > this._debReadText1.get_width() || com.haxepunk.utils.Input.get_mouseFlashY() < this._debRead.get_y())) {
							if(com.haxepunk.utils.Input.check(16)) {
								if(this.SELECT_LIST.length != 0) this.startDragging(); else this.startPanning();
							} else this.startSelection();
						}
					} else {
						if(this._selecting) this.updateSelection();
						if(this._dragging) this.updateDragging();
						if(this._panning) this.updatePanning();
					}
					if(com.haxepunk.utils.Input.pressed(65)) this.selectAll();
					if(com.haxepunk.utils.Input.check(16)) {
						if(this.SELECT_LIST.length != 0) {
							if(com.haxepunk.utils.Input.pressed("_ARROWS")) this.updateKeyMoving();
						} else if(com.haxepunk.utils.Input.check("_ARROWS")) this.updateKeyPanning();
					}
				} else {
					this.renderEntities();
					this.updateFPSRead();
					this.updateEntityCount();
				}
				this.updateDebugRead();
			} else if(this._scrolling) this.updateScrolling(); else if(com.haxepunk.utils.Input.mousePressed) this.startScrolling();
		} else {
			this.updateFPSRead();
			this.updateEntityCount();
		}
		if(com.haxepunk.utils.Input.pressed(this.toggleKey)) this.set_paused(!this._paused);
	}
	,set_visible: function(value) {
		this._sprite.set_visible(value);
		if(this._enabled && value) this.updateLog();
		return this._sprite.get_visible();
	}
	,get_visible: function() {
		return this._sprite.get_visible();
	}
	,onResize: function(e) {
		if(this._back.bitmapData != null) this._back.bitmapData.dispose();
		this._back.set_bitmapData(com.haxepunk.HXP.createBitmap(this.get_width(),this.get_height(),true,-1));
		com.haxepunk.HXP.matrix.identity();
		com.haxepunk.HXP.matrix.set_tx(Math.max((this._back.bitmapData.get_width() - this._bmpLogo.get_width()) / 2,0));
		com.haxepunk.HXP.matrix.set_ty(Math.max((this._back.bitmapData.get_height() - this._bmpLogo.get_height()) / 2,0));
		com.haxepunk.HXP.matrix.scale(Math.min(this.get_width() / this._back.bitmapData.get_width(),1),Math.min(this.get_height() / this._back.bitmapData.get_height(),1));
		this._back.bitmapData.draw(this._bmpLogo,com.haxepunk.HXP.matrix,null,flash.display.BlendMode.MULTIPLY);
		this._back.bitmapData.draw(this._back.bitmapData,null,null,flash.display.BlendMode.INVERT);
		this._back.bitmapData.colorTransform(this._back.bitmapData.rect,new flash.geom.ColorTransform(1,1,1,0.5));
		this.updateLog();
	}
	,enable: function(trace_capture,toggleKey) {
		if(toggleKey == null) toggleKey = 192;
		this.toggleKey = toggleKey;
		if(this._enabled) return;
		try {
			this._bmpLogo = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_logo.png"));
			this._butDebug = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_debug.png"));
			this._butOutput = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_output.png"));
			this._butPlay = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_play.png"));
			this._butPause = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_pause.png"));
			this._butStep = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_step.png"));
		} catch( e ) {
			return;
		}
		this._enabled = true;
		this._visible = true;
		com.haxepunk.HXP.stage.addChild(this._sprite);
		var big = this.get_width() >= 420;
		this._sprite.addChild(this._back);
		this._sprite.addChild(this._entScreen);
		this._entScreen.addChild(this._entSelect);
		this._sprite.addChild(this._entRead);
		this._entRead.addChild(this._entReadText);
		this._entReadText.set_defaultTextFormat(this.format(16,16777215,"right"));
		this._entReadText.set_width(100);
		this._entReadText.set_height(20);
		this._entRead.set_x(this.get_width() - this._entReadText.get_width());
		this._entRead.get_graphics().clear();
		this._entRead.get_graphics().beginFill(0,.5);
		this._entRead.get_graphics().drawRoundRect(0,-20,this._entReadText.get_width() + 20,40,40,40);
		this._sprite.addChild(this._fpsRead);
		this._fpsRead.addChild(this._fpsReadText);
		this._fpsReadText.set_defaultTextFormat(this.format(16));
		this._fpsReadText.set_width(70);
		this._fpsReadText.set_height(20);
		this._fpsReadText.set_x(2);
		this._fpsReadText.set_y(1);
		this._fpsRead.get_graphics().clear();
		this._fpsRead.get_graphics().beginFill(0,.75);
		this._fpsRead.get_graphics().drawRoundRect(-20,-20,big?340:180,40,40,40);
		this._sprite.addChild(this._layerList);
		if(big) this._sprite.addChild(this._fpsInfo);
		this._fpsInfo.addChild(this._fpsInfoText0);
		this._fpsInfo.addChild(this._fpsInfoText1);
		this._fpsInfoText0.set_defaultTextFormat(this.format(8,11184810));
		this._fpsInfoText1.set_defaultTextFormat(this.format(8,11184810));
		this._fpsInfoText0.set_width(this._fpsInfoText1.set_width(60));
		this._fpsInfoText0.set_height(this._fpsInfoText1.set_height(20));
		this._fpsInfo.set_x(75);
		this._fpsInfoText1.set_x(60);
		this._fpsInfo.set_width(this._fpsInfoText0.get_width() + this._fpsInfoText1.get_width());
		this._sprite.addChild(this._logRead);
		this._logRead.addChild(this._logReadText0);
		this._logRead.addChild(this._logReadText1);
		this._logReadText0.set_defaultTextFormat(this.format(16,16777215));
		this._logReadText1.set_defaultTextFormat(this.format(big?16:8,16777215));
		this._logReadText0.selectable = false;
		this._logReadText0.set_width(80);
		this._logReadText0.set_height(20);
		this._logReadText1.set_width(this.get_width());
		this._logReadText0.set_x(2);
		this._logReadText0.set_y(3);
		this._logReadText0.set_text("OUTPUT:");
		this._logHeight = this.get_height() - 60;
		this._logBar = new flash.geom.Rectangle(8,24,16,this._logHeight - 8);
		this._logBarGlobal = this._logBar.clone();
		this._logBarGlobal.y += 40;
		if(big) this._logLines = this._logHeight / 16.5 | 0; else this._logLines = this._logHeight / 8.5 | 0;
		this._sprite.addChild(this._debRead);
		this._debRead.addChild(this._debReadText0);
		this._debRead.addChild(this._debReadText1);
		this._debReadText0.set_defaultTextFormat(this.format(16,16777215));
		this._debReadText1.set_defaultTextFormat(this.format(8,16777215));
		this._debReadText0.selectable = false;
		this._debReadText0.set_width(80);
		this._debReadText0.set_height(20);
		this._debReadText1.set_width(160);
		this._debReadText1.set_height(this.get_height() / 4 | 0);
		this._debReadText0.set_x(2);
		this._debReadText0.set_y(3);
		this._debReadText1.set_x(2);
		this._debReadText1.set_y(24);
		this._debReadText0.set_text("DEBUG:");
		this._debRead.set_y(this.get_height() - (this._debReadText1.get_y() + this._debReadText1.get_height()));
		this._sprite.addChild(this._butRead);
		this._butRead.addChild(this._butDebug);
		this._butRead.addChild(this._butOutput);
		this._butRead.addChild(this._butPlay).set_x(20);
		this._butRead.addChild(this._butPause).set_x(20);
		this._butRead.addChild(this._butStep).set_x(40);
		this.updateButtons();
		this._butRead.get_graphics().clear();
		this._butRead.get_graphics().beginFill(0,.75);
		this._butRead.get_graphics().drawRoundRect(-20,-20,100,40,40,40);
		this.set_debug(true);
		com.haxepunk.HXP.stage.addEventListener(flash.events.Event.RESIZE,$bind(this,this.onResize));
		this.onResize(null);
		this.set_paused(false);
		if(trace_capture != com.haxepunk.debug.TraceCapture.No) haxe.Log.trace = $bind(this,this.traceLog);
		this.LOG.push("-- HaxePunk v" + "2.5.0" + " --");
		if(this._enabled && this._sprite.get_visible()) this.updateLog();
	}
	,hide: function() {
		if(this._visible) {
			com.haxepunk.HXP.stage.removeChild(this._sprite);
			this._visible = false;
		}
	}
	,show: function() {
		if(!this._visible) {
			com.haxepunk.HXP.stage.addChild(this._sprite);
			this._visible = true;
		}
	}
	,watch: function(properties) {
		var i;
		if(properties.length > 1) {
			var _g = 0;
			while(_g < properties.length) {
				var i1 = properties[_g];
				++_g;
				this.WATCH_LIST.push(i1);
			}
		} else this.WATCH_LIST.push(properties[0]);
	}
	,log: function(data) {
		var s = "";
		var _g1 = 0, _g = data.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(i > 0) s += " ";
			s += data[i] != null?Std.string(data[i]):"null";
		}
		if(s.indexOf("\n") >= 0) {
			var a = s.split("\n");
			var _g = 0;
			while(_g < a.length) {
				var s1 = a[_g];
				++_g;
				this.LOG.push(s1);
			}
		} else this.LOG.push(s);
		if(this._enabled && this._sprite.get_visible()) this.updateLog();
	}
	,traceLog: function(v,infos) {
		var log = infos.className + "(" + infos.lineNumber + "): " + Std.string(v);
		this.LOG.push(log);
		if(this._enabled && this._sprite.get_visible()) this.updateLog();
	}
	,init: function() {
		this._sprite = new flash.display.Sprite();
		var font = openfl.Assets.getFont("font/04B_03__.ttf");
		if(font == null) font = openfl.Assets.getFont(com.haxepunk.HXP.defaultFont);
		this._format = new flash.text.TextFormat(font.fontName,8,16777215);
		this._back = new flash.display.Bitmap();
		this._fpsRead = new flash.display.Sprite();
		this._fpsReadText = new flash.text.TextField();
		this._fpsInfo = new flash.display.Sprite();
		this._fpsInfoText0 = new flash.text.TextField();
		this._fpsInfoText1 = new flash.text.TextField();
		this._memReadText = new flash.text.TextField();
		this._layerList = new com.haxepunk.debug.LayerList();
		this._logRead = new flash.display.Sprite();
		this._logReadText0 = new flash.text.TextField();
		this._logReadText1 = new flash.text.TextField();
		this._logScroll = 0;
		this._logLines = 33;
		this._entRead = new flash.display.Sprite();
		this._entReadText = new flash.text.TextField();
		this._debRead = new flash.display.Sprite();
		this._debReadText0 = new flash.text.TextField();
		this._debReadText1 = new flash.text.TextField();
		this._butRead = new flash.display.Sprite();
		this._entScreen = new flash.display.Sprite();
		this._entSelect = new flash.display.Sprite();
		this._entRect = new flash.geom.Rectangle();
		this.LOG = new Array();
		this.LAYER_LIST = new haxe.ds.IntMap();
		this.ENTITY_LIST = new Array();
		this.SCREEN_LIST = new Array();
		this.SELECT_LIST = new Array();
		this.WATCH_LIST = ["x","y"];
	}
	,__class__: com.haxepunk.debug.Console
	,__properties__: {set_visible:"set_visible",get_visible:"get_visible",set_paused:"set_paused",get_paused:"get_paused",set_debug:"set_debug",get_debug:"get_debug",get_width:"get_width",get_height:"get_height"}
}
com.haxepunk.debug.LayerLabel = function(layer,textFormat) {
	flash.display.Sprite.call(this);
	this.active = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_visible.png"));
	this.inactive = new flash.display.Bitmap(openfl.Assets.getBitmapData("gfx/debug/console_hidden.png"));
	this.label = new flash.text.TextField();
	this.label.set_defaultTextFormat(textFormat);
	this.label.selectable = false;
	this.label.set_width(150);
	this.label.set_height(14);
	this.label.set_x(24);
	this.label.set_y(2);
	this.set_x(6);
	this.layer = layer;
	this.set_count(0);
	this.display = true;
	this.addChild(this.active);
	this.addChild(this.label);
	this.addEventListener("click",$bind(this,this.onClickLayer),true);
};
$hxClasses["com.haxepunk.debug.LayerLabel"] = com.haxepunk.debug.LayerLabel;
com.haxepunk.debug.LayerLabel.__name__ = ["com","haxepunk","debug","LayerLabel"];
com.haxepunk.debug.LayerLabel.__super__ = flash.display.Sprite;
com.haxepunk.debug.LayerLabel.prototype = $extend(flash.display.Sprite.prototype,{
	onClickLayer: function(e) {
		this.display = !this.display;
		if(this.display) {
			this.removeChild(this.inactive);
			this.addChild(this.active);
		} else {
			this.removeChild(this.active);
			this.addChild(this.inactive);
		}
		com.haxepunk.HXP._scene._layerDisplay.set(this.layer,this.display);
		com.haxepunk.HXP.engine.render();
	}
	,set_count: function(value) {
		this.label.set_text("Layer " + this.layer + " [" + value + "]");
		return value;
	}
	,__class__: com.haxepunk.debug.LayerLabel
	,__properties__: $extend(flash.display.Sprite.prototype.__properties__,{set_count:"set_count"})
});
com.haxepunk.debug.LayerList = function(width,height) {
	if(height == null) height = 400;
	if(width == null) width = 250;
	flash.display.Sprite.call(this);
	var mask = new flash.display.Sprite();
	mask.get_graphics().beginFill(0);
	mask.get_graphics().drawRect(0,0,width,height);
	mask.get_graphics().endFill();
	this.addChild(mask);
	this.set_mask(mask);
	this.get_graphics().beginFill(0,.15);
	this.get_graphics().drawRect(0,0,width,height);
	this.get_graphics().endFill();
	var font = openfl.Assets.getFont("font/04B_03__.ttf");
	if(font == null) font = openfl.Assets.getFont(com.haxepunk.HXP.defaultFont);
	this._textFormat = new flash.text.TextFormat(font.fontName,16,16777215);
	this._labels = new haxe.ds.IntMap();
};
$hxClasses["com.haxepunk.debug.LayerList"] = com.haxepunk.debug.LayerList;
com.haxepunk.debug.LayerList.__name__ = ["com","haxepunk","debug","LayerList"];
com.haxepunk.debug.LayerList.__super__ = flash.display.Sprite;
com.haxepunk.debug.LayerList.prototype = $extend(flash.display.Sprite.prototype,{
	set: function(list) {
		var $it0 = this._labels.iterator();
		while( $it0.hasNext() ) {
			var label = $it0.next();
			this.removeChild(label);
		}
		var keys = new Array();
		var $it1 = list.keys();
		while( $it1.hasNext() ) {
			var key = $it1.next();
			if(list.get(key) > 0) keys.push(key);
		}
		keys.sort(function(a,b) {
			return a - b;
		});
		var i = 0;
		var _g = 0;
		while(_g < keys.length) {
			var layer = keys[_g];
			++_g;
			var label;
			if(this._labels.exists(layer)) label = this._labels.get(layer); else {
				label = new com.haxepunk.debug.LayerLabel(layer,this._textFormat);
				this._labels.set(layer,label);
			}
			label.set_count(list.get(layer));
			label.set_y(i++ * 20 + 5);
			this.addChild(label);
		}
	}
	,__class__: com.haxepunk.debug.LayerList
});
com.haxepunk.graphics = {}
com.haxepunk.graphics.Emitter = function(source,frameWidth,frameHeight) {
	if(frameHeight == null) frameHeight = 0;
	if(frameWidth == null) frameWidth = 0;
	com.haxepunk.Graphic.call(this);
	this._p = new flash.geom.Point();
	this._tint = new flash.geom.ColorTransform();
	this._types = new haxe.ds.StringMap();
	this.setSource(source,frameWidth,frameHeight);
	this.active = true;
	this.particleCount = 0;
};
$hxClasses["com.haxepunk.graphics.Emitter"] = com.haxepunk.graphics.Emitter;
com.haxepunk.graphics.Emitter.__name__ = ["com","haxepunk","graphics","Emitter"];
com.haxepunk.graphics.Emitter.__properties__ = {get_SIN:"get_SIN"}
com.haxepunk.graphics.Emitter.get_SIN = function() {
	return Math.PI / 2;
}
com.haxepunk.graphics.Emitter.__super__ = com.haxepunk.Graphic;
com.haxepunk.graphics.Emitter.prototype = $extend(com.haxepunk.Graphic.prototype,{
	emitInRectangle: function(name,x,y,width,height) {
		return this.emit(name,x + (function($this) {
			var $r;
			com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
			$r = com.haxepunk.HXP._seed / 2147483646;
			return $r;
		}(this)) * width,y + (function($this) {
			var $r;
			com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
			$r = com.haxepunk.HXP._seed / 2147483646;
			return $r;
		}(this)) * height);
	}
	,emitInCircle: function(name,x,y,radius) {
		var angle = Math.random() * Math.PI * 2;
		radius *= Math.random();
		return this.emit(name,x + Math.cos(angle) * radius,y + Math.sin(angle) * radius);
	}
	,emit: function(name,x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		var p, type = this._types.get(name);
		if(type == null) throw "Particle type \"" + name + "\" does not exist.";
		if(this._cache != null) {
			p = this._cache;
			this._cache = p._next;
		} else p = new com.haxepunk.graphics.Particle();
		p._next = this._particle;
		p._prev = null;
		if(p._next != null) p._next._prev = p;
		p._type = type;
		p._time = 0;
		p._duration = type._duration + type._durationRange * (function($this) {
			var $r;
			com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
			$r = com.haxepunk.HXP._seed / 2147483646;
			return $r;
		}(this));
		var a = type._angle + type._angleRange * (function($this) {
			var $r;
			com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
			$r = com.haxepunk.HXP._seed / 2147483646;
			return $r;
		}(this)), d = type._distance + type._distanceRange * (function($this) {
			var $r;
			com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
			$r = com.haxepunk.HXP._seed / 2147483646;
			return $r;
		}(this));
		p._moveX = Math.cos(a) * d;
		p._moveY = Math.sin(a) * d;
		p._x = x;
		p._y = y;
		p._gravity = type._gravity + type._gravityRange * (function($this) {
			var $r;
			com.haxepunk.HXP._seed = com.haxepunk.HXP._seed * 16807.0 % 2147483646 | 0;
			$r = com.haxepunk.HXP._seed / 2147483646;
			return $r;
		}(this));
		this.particleCount++;
		return this._particle = p;
	}
	,setColor: function(name,start,finish,ease) {
		if(finish == null) finish = 0;
		if(start == null) start = 16777215;
		var pt = this._types.get(name);
		if(pt == null) return null;
		return pt.setColor(start,finish,ease);
	}
	,setAlpha: function(name,start,finish,ease) {
		if(finish == null) finish = 0;
		if(start == null) start = 1;
		var pt = this._types.get(name);
		if(pt == null) return null;
		return pt.setAlpha(start,finish,ease);
	}
	,setGravity: function(name,gravity,gravityRange) {
		if(gravityRange == null) gravityRange = 0;
		if(gravity == null) gravity = 0;
		return (js.Boot.__cast(this._types.get(name) , com.haxepunk.graphics.ParticleType)).setGravity(gravity,gravityRange);
	}
	,setMotion: function(name,angle,distance,duration,angleRange,distanceRange,durationRange,ease,backwards) {
		if(backwards == null) backwards = false;
		if(durationRange == null) durationRange = 0;
		if(distanceRange == null) distanceRange = 0;
		if(angleRange == null) angleRange = 0;
		var pt = this._types.get(name);
		if(pt == null) return null;
		return pt.setMotion(angle,distance,duration,angleRange,distanceRange,durationRange,ease,backwards);
	}
	,newType: function(name,frames) {
		var pt = this._types.get(name);
		if(pt != null) throw "Cannot add multiple particle types of the same name";
		pt = new com.haxepunk.graphics.ParticleType(name,frames,this._width,this._frameWidth,this._frameHeight);
		this._types.set(name,pt);
		return pt;
	}
	,renderAtlas: function(layer,point,camera) {
		if(this._particle == null) return;
		this._point.x = point.x + this.x - camera.x * this.scrollX;
		this._point.y = point.y + this.y - camera.y * this.scrollY;
		var t, td, p = this._particle, scaleX = com.haxepunk.HXP.screen.fullScaleX, scaleY = com.haxepunk.HXP.screen.fullScaleY, type, rect;
		while(p != null) {
			t = p._time / p._duration;
			type = p._type;
			td = type._ease == null?t:type._ease(t);
			this._p.x = this._point.x + p._x + p._moveX * (type._backwards?1 - td:td);
			this._p.y = this._point.y + p._y + p._moveY * (type._backwards?1 - td:td);
			p._moveY += p._gravity * td;
			var frameIndex = type._frames[td * type._frames.length | 0];
			this._frames[frameIndex].draw(Math.floor(this._p.x * scaleX),Math.floor(this._p.y * scaleY),layer,scaleX,scaleY,type._angle,type._red + type._redRange * td,type._green + type._greenRange * td,type._blue + type._blueRange * td,type._alpha + type._alphaRange * (type._alphaEase == null?t:type._alphaEase(t)));
			p = p._next;
		}
	}
	,render: function(target,point,camera) {
		if(this._particle == null) return;
		this._point.x = point.x + this.x - camera.x * this.scrollX;
		this._point.y = point.y + this.y - camera.y * this.scrollY;
		var t, td, p = this._particle, scaleX = com.haxepunk.HXP.screen.fullScaleX, scaleY = com.haxepunk.HXP.screen.fullScaleY, type, rect;
		while(p != null) {
			t = p._time / p._duration;
			type = p._type;
			td = type._ease == null?t:type._ease(t);
			this._p.x = this._point.x + p._x + p._moveX * (type._backwards?1 - td:td);
			this._p.y = this._point.y + p._y + p._moveY * (type._backwards?1 - td:td);
			p._moveY += p._gravity * td;
			rect = type._frame;
			if(type._frames.length == 0) rect.x = 0; else rect.x = rect.width * type._frames[td * type._frames.length | 0];
			rect.y = (rect.x / this._width | 0) * rect.height;
			rect.x %= this._width;
			this._p.x -= rect.width / 2;
			this._p.y -= rect.height / 2;
			if(type._buffer != null) {
				this._tint.alphaMultiplier = type._alpha + type._alphaRange * (type._alphaEase == null?t:type._alphaEase(t));
				td = type._colorEase == null?t:type._colorEase(t);
				this._tint.redMultiplier = type._red + type._redRange * td;
				this._tint.greenMultiplier = type._green + type._greenRange * td;
				this._tint.blueMultiplier = type._blue + type._blueRange * td;
				type._buffer.fillRect(type._bufferRect,0);
				type._buffer.copyPixels(this._source,rect,com.haxepunk.HXP.zero);
				type._buffer.colorTransform(type._bufferRect,this._tint);
				target.copyPixels(type._buffer,type._bufferRect,this._p,null,null,true);
			} else target.copyPixels(this._source,rect,this._p,null,null,true);
			p = p._next;
		}
	}
	,update: function() {
		if(this._particle == null) return;
		var e = com.haxepunk.HXP.fixed?1 / com.haxepunk.HXP.assignedFrameRate:com.haxepunk.HXP.elapsed, p = this._particle, n;
		while(p != null) {
			p._time += e;
			if(p._time >= p._duration) {
				if(p._next != null) p._next._prev = p._prev;
				if(p._prev != null) p._prev._next = p._next; else this._particle = p._next;
				n = p._next;
				p._next = this._cache;
				p._prev = null;
				this._cache = p;
				p = n;
				this.particleCount--;
				continue;
			}
			p = p._next;
		}
	}
	,setAtlasRegion: function(region) {
		this.blit = false;
		this._width = region.rect.width | 0;
		this._height = region.rect.height | 0;
		return region;
	}
	,setBitmapSource: function(bitmap) {
		this.blit = true;
		this._source = bitmap;
		this._width = (bitmap.___textureBuffer != null?bitmap.___textureBuffer.width:0) | 0;
		this._height = (bitmap.___textureBuffer != null?bitmap.___textureBuffer.height:0) | 0;
	}
	,setSource: function(source,frameWidth,frameHeight) {
		if(frameHeight == null) frameHeight = 0;
		if(frameWidth == null) frameWidth = 0;
		var region = null;
		if(js.Boot.__instanceof(source,flash.display.BitmapData)) this.setBitmapSource(source); else if(js.Boot.__instanceof(source,com.haxepunk.graphics.atlas.AtlasRegion)) region = this.setAtlasRegion(source); else if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) region = this.setAtlasRegion(com.haxepunk.graphics.atlas.Atlas.loadImageAsRegion(source)); else this.setBitmapSource(com.haxepunk.HXP.getBitmap(source));
		if(this._source == null && region == null) throw "Invalid source image.";
		this._frameWidth = frameWidth != 0?frameWidth:this._width;
		this._frameHeight = frameHeight != 0?frameHeight:this._height;
		this._frameCount = (this._width / this._frameWidth | 0) * (this._height / this._frameHeight | 0);
		if(region != null) {
			var rect = new flash.geom.Rectangle(0,0,this._frameWidth,this._frameHeight);
			var center = new flash.geom.Point(this._frameWidth / 2,this._frameHeight / 2);
			this._frames = new Array();
			var _g1 = 0, _g = this._frameCount;
			while(_g1 < _g) {
				var i = _g1++;
				this._frames.push(region.clip(rect,center));
				rect.x += this._frameWidth;
				if(rect.x >= this._width) {
					rect.y += this._frameHeight;
					rect.x = 0;
				}
			}
		}
	}
	,__class__: com.haxepunk.graphics.Emitter
});
com.haxepunk.graphics.Graphiclist = function(graphic) {
	this._graphics = new Array();
	this._temp = new Array();
	this._camera = new flash.geom.Point();
	this._count = 0;
	com.haxepunk.Graphic.call(this);
	if(graphic != null) {
		var _g = 0;
		while(_g < graphic.length) {
			var g = graphic[_g];
			++_g;
			if(js.Boot.__cast(g , com.haxepunk.Graphic) != null) this.add(g);
		}
	}
};
$hxClasses["com.haxepunk.graphics.Graphiclist"] = com.haxepunk.graphics.Graphiclist;
com.haxepunk.graphics.Graphiclist.__name__ = ["com","haxepunk","graphics","Graphiclist"];
com.haxepunk.graphics.Graphiclist.__super__ = com.haxepunk.Graphic;
com.haxepunk.graphics.Graphiclist.prototype = $extend(com.haxepunk.Graphic.prototype,{
	updateCheck: function() {
		this.active = false;
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.active) {
				this.active = true;
				return;
			}
		}
	}
	,get_count: function() {
		return this._count;
	}
	,get_children: function() {
		return this._graphics;
	}
	,removeAll: function() {
		this._graphics.length = 0;
		this._temp.length = 0;
		this._count = 0;
		this.active = false;
	}
	,removeAt: function(index) {
		if(index == null) index = 0;
		if(this._graphics.length == 0) return;
		index %= this._graphics.length;
		this.remove(this._graphics[index % this._graphics.length]);
		this.updateCheck();
	}
	,remove: function(graphic) {
		if(this._graphics.indexOf(graphic) < 0) return graphic;
		this._temp.length = 0;
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g == graphic) this._count--; else this._temp[this._temp.length] = g;
		}
		var temp = this._graphics;
		this._graphics = this._temp;
		this._temp = temp;
		this.updateCheck();
		return graphic;
	}
	,add: function(graphic) {
		if(graphic == null) return graphic;
		if(this._count == 0) this.blit = graphic.blit; else if(this.blit != graphic.blit) throw "Can't add graphic objects with different render methods.";
		this._graphics[this._count++] = graphic;
		if(!this.active) this.active = graphic.active;
		return graphic;
	}
	,destroy: function() {
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			g.destroy();
		}
	}
	,renderAtlas: function(layer,point,camera) {
		point.x += this.x;
		point.y += this.y;
		camera.x *= this.scrollX;
		camera.y *= this.scrollY;
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.get_visible()) {
				if(g.relative) {
					this._point.x = point.x;
					this._point.y = point.y;
				} else this._point.x = this._point.y = 0;
				this._camera.x = camera.x;
				this._camera.y = camera.y;
				g.renderAtlas(layer,this._point,this._camera);
			}
		}
	}
	,render: function(target,point,camera) {
		point.x += this.x;
		point.y += this.y;
		camera.x *= this.scrollX;
		camera.y *= this.scrollY;
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.get_visible()) {
				if(g.relative) {
					this._point.x = point.x;
					this._point.y = point.y;
				} else this._point.x = this._point.y = 0;
				this._camera.x = camera.x;
				this._camera.y = camera.y;
				g.render(target,this._point,this._camera);
			}
		}
	}
	,update: function() {
		var _g = 0, _g1 = this._graphics;
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			if(g.active) g.update();
		}
	}
	,__class__: com.haxepunk.graphics.Graphiclist
	,__properties__: $extend(com.haxepunk.Graphic.prototype.__properties__,{get_children:"get_children",get_count:"get_count"})
});
com.haxepunk.graphics.Image = function(source,clipRect,name) {
	if(name == null) name = "";
	this.smooth = false;
	com.haxepunk.Graphic.call(this);
	this.angle = 0;
	this.set_scale(this.scaleX = this.scaleY = 1);
	this.originX = this.originY = 0;
	this._alpha = 1;
	this._flipped = false;
	this._color = 16777215;
	this._red = this._green = this._blue = 1;
	this._matrix = com.haxepunk.HXP.matrix;
	if(this._source == null && this._region == null) {
		this._class = name;
		if(js.Boot.__instanceof(source,com.haxepunk.graphics.atlas.TextureAtlas)) {
			this.blit = false;
			this._region = (js.Boot.__cast(source , com.haxepunk.graphics.atlas.TextureAtlas)).getRegion(name);
			this._sourceRect = new flash.geom.Rectangle(0,0,this._region.rect.width,this._region.rect.height);
		} else if(js.Boot.__instanceof(source,com.haxepunk.graphics.atlas.AtlasRegion)) this.setAtlasRegion(source); else if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) {
			if(js.Boot.__instanceof(source,String)) this._class = source; else if(name == "") this._class = Type.getClassName(Type.getClass(source));
			this.blit = false;
			this._region = com.haxepunk.graphics.atlas.Atlas.loadImageAsRegion(source);
			this._sourceRect = new flash.geom.Rectangle(0,0,this._region.rect.width,this._region.rect.height);
		} else if(js.Boot.__instanceof(source,flash.display.BitmapData)) this.setBitmapSource(source); else {
			if(js.Boot.__instanceof(source,String)) this._class = source; else if(name == "") this._class = Type.getClassName(Type.getClass(source));
			this.setBitmapSource(com.haxepunk.HXP.getBitmap(source));
		}
		if(this._source == null && this._region == null) throw "Invalid source image.";
	}
	if(clipRect != null) {
		if(clipRect.width == 0) clipRect.width = this._sourceRect.width;
		if(clipRect.height == 0) clipRect.height = this._sourceRect.height;
		if(!this.blit) this._region = this._region.clip(clipRect);
		this._sourceRect = clipRect;
	}
	if(this.blit) {
		this._bitmap = new flash.display.Bitmap();
		this._colorTransform = new flash.geom.ColorTransform();
		this.createBuffer();
		this.updateBuffer();
	}
};
$hxClasses["com.haxepunk.graphics.Image"] = com.haxepunk.graphics.Image;
com.haxepunk.graphics.Image.__name__ = ["com","haxepunk","graphics","Image"];
com.haxepunk.graphics.Image.createRect = function(width,height,color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 16777215;
	if(width == 0 || height == 0) throw "Illegal rect, sizes cannot be 0.";
	var source = com.haxepunk.HXP.createBitmap(width,height,true,-1);
	var image;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) image = new com.haxepunk.graphics.Image(com.haxepunk.graphics.atlas.Atlas.loadImageAsRegion(source)); else image = new com.haxepunk.graphics.Image(source);
	image.set_color(color);
	image.set_alpha(alpha);
	return image;
}
com.haxepunk.graphics.Image.createCircle = function(radius,color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 16777215;
	if(radius == 0) throw "Illegal circle, radius cannot be 0.";
	com.haxepunk.HXP.sprite.get_graphics().clear();
	com.haxepunk.HXP.sprite.get_graphics().beginFill(16777215);
	com.haxepunk.HXP.sprite.get_graphics().drawCircle(radius,radius,radius);
	var data = com.haxepunk.HXP.createBitmap(radius * 2,radius * 2,true,0);
	data.draw(com.haxepunk.HXP.sprite);
	var image;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) image = new com.haxepunk.graphics.Image(com.haxepunk.graphics.atlas.Atlas.loadImageAsRegion(data)); else image = new com.haxepunk.graphics.Image(data);
	image.set_color(color);
	image.set_alpha(alpha);
	return image;
}
com.haxepunk.graphics.Image.__super__ = com.haxepunk.Graphic;
com.haxepunk.graphics.Image.prototype = $extend(com.haxepunk.Graphic.prototype,{
	get_clipRect: function() {
		return this._sourceRect;
	}
	,set_scaledHeight: function(h) {
		this.scaleY = h / this.get_scale() / this.get_height();
		return this.scaleY;
	}
	,get_scaledHeight: function() {
		return this.get_height() * this.scaleY * this.get_scale();
	}
	,set_scaledWidth: function(w) {
		this.scaleX = w / this.get_scale() / this.get_width();
		return this.scaleX;
	}
	,get_scaledWidth: function() {
		return this.get_width() * this.scaleX * this.get_scale();
	}
	,get_height: function() {
		return (this.blit?this._bufferRect.height:!this._region.rotated?this._region.rect.height:this._region.rect.width) | 0;
	}
	,get_width: function() {
		return (this.blit?this._bufferRect.width:!this._region.rotated?this._region.rect.width:this._region.rect.height) | 0;
	}
	,centerOO: function() {
		this.x += this.originX;
		this.y += this.originY;
		this.centerOrigin();
		this.x -= this.originX;
		this.y -= this.originY;
	}
	,centerOrigin: function() {
		this.originX = this.get_width() / 2 | 0;
		this.originY = this.get_height() / 2 | 0;
	}
	,set_flipped: function(value) {
		if(this._flipped == value || this._class == "") return value;
		this._flipped = value;
		if(this.blit) {
			var temp = this._source;
			if(!value || this._flip != null) this._source = this._flip; else if(com.haxepunk.graphics.Image._flips.exists(this._class)) this._source = com.haxepunk.graphics.Image._flips.get(this._class); else {
				this._source = com.haxepunk.HXP.createBitmap(this._source.get_width(),this._source.get_height(),true);
				com.haxepunk.graphics.Image._flips.set(this._class,this._source);
				com.haxepunk.HXP.matrix.identity();
				com.haxepunk.HXP.matrix.a = -1;
				com.haxepunk.HXP.matrix.set_tx(this._source.get_width());
				this._source.draw(temp,com.haxepunk.HXP.matrix);
			}
			this._flip = temp;
			this.updateBuffer();
		}
		return this._flipped;
	}
	,get_flipped: function() {
		return this._flipped;
	}
	,set_color: function(value) {
		value &= 16777215;
		if(this._color == value) return value;
		this._color = value;
		this._red = (this._color >> 16 & 255) / 255;
		this._green = (this._color >> 8 & 255) / 255;
		this._blue = (this._color & 255) / 255;
		if(this.blit) {
			if(this._alpha == 1 && this._color == 16777215) this._tint = null; else {
				this._tint = this._colorTransform;
				this._tint.redMultiplier = this._red;
				this._tint.greenMultiplier = this._green;
				this._tint.blueMultiplier = this._blue;
				this._tint.alphaMultiplier = this._alpha;
			}
			this.updateBuffer();
		}
		return this._color;
	}
	,get_color: function() {
		return this._color;
	}
	,set_alpha: function(value) {
		value = value < 0?0:value > 1?1:value;
		if(this._alpha == value) return value;
		this._alpha = value;
		if(this.blit) {
			if(this._alpha == 1 && this._color == 16777215) this._tint = null; else {
				this._tint = this._colorTransform;
				this._tint.redMultiplier = this._red;
				this._tint.greenMultiplier = this._green;
				this._tint.blueMultiplier = this._blue;
				this._tint.alphaMultiplier = this._alpha;
			}
			this.updateBuffer();
		}
		return this._alpha;
	}
	,get_alpha: function() {
		return this._alpha;
	}
	,clear: function() {
		if(this._buffer == null) return;
		this._buffer.fillRect(this._bufferRect,0);
	}
	,updateBuffer: function(clearBefore) {
		if(clearBefore == null) clearBefore = false;
		if(this._source == null) return;
		if(clearBefore) this._buffer.fillRect(this._bufferRect,0);
		this._buffer.copyPixels(this._source,this._sourceRect,com.haxepunk.HXP.zero);
		if(this._tint != null) this._buffer.colorTransform(this._bufferRect,this._tint);
	}
	,renderAtlas: function(layer,point,camera) {
		var sx = this.get_scale() * this.scaleX, sy = this.get_scale() * this.scaleY, fsx = com.haxepunk.HXP.screen.fullScaleX, fsy = com.haxepunk.HXP.screen.fullScaleY;
		this._point.x = point.x + this.x - this.originX - camera.x * this.scrollX;
		this._point.y = point.y + this.y - this.originY - camera.y * this.scrollY;
		if(this.angle == 0) {
			if(!(sx == 1 && sy == 1)) {
				this._point.x = point.x + this.x - this.originX * sx - camera.x * this.scrollX;
				this._point.y = point.y + this.y - this.originY * sy - camera.y * this.scrollY;
			}
			if(this._flipped) this._point.x += this._sourceRect.width * sx;
			this._point.x = Math.floor(this._point.x * fsx);
			this._point.y = Math.floor(this._point.y * fsy);
			this._region.draw(this._point.x,this._point.y,layer,sx * fsx * (this._flipped?-1:1),sy * fsy,this.angle,this._red,this._green,this._blue,this._alpha);
		} else {
			var theta = this.angle * (Math.PI / -180);
			var cos = Math.cos(theta);
			var sin = Math.sin(theta);
			if(this.get_flipped()) sx *= -1;
			var b = sx * fsx * sin;
			var a = sx * fsx * cos;
			var d = sy * fsy * cos;
			var c = sy * fsy * -sin;
			var tx = -this.originX * sx, ty = -this.originY * sy;
			var tx1 = tx * cos - ty * sin;
			ty = (tx * sin + ty * cos + this.originY + this._point.y) * fsy;
			tx = (tx1 + this.originX + this._point.x) * fsx;
			this._region.drawMatrix(tx | 0,ty | 0,a,b,c,d,layer,this._red,this._green,this._blue,this._alpha);
		}
	}
	,render: function(target,point,camera) {
		var sx = this.get_scale() * this.scaleX, sy = this.get_scale() * this.scaleY;
		this._point.x = point.x + this.x - this.originX - camera.x * this.scrollX;
		this._point.y = point.y + this.y - this.originY - camera.y * this.scrollY;
		if(this._buffer != null) {
			if(this.angle == 0 && sx == 1 && sy == 1 && this.blend == null) target.copyPixels(this._buffer,this._bufferRect,this._point,null,null,true); else {
				this._matrix.b = this._matrix.c = 0;
				this._matrix.a = sx;
				this._matrix.d = sy;
				this._matrix.set_tx(-this.originX * sx);
				this._matrix.set_ty(-this.originY * sy);
				if(this.angle != 0) this._matrix.rotate(this.angle * (Math.PI / -180));
				var _g = this._matrix;
				_g.set_tx(_g.tx + (this.originX + this._point.x));
				var _g = this._matrix;
				_g.set_ty(_g.ty + (this.originY + this._point.y));
				target.draw(this._bitmap,this._matrix,null,this.blend,null,this._bitmap.smoothing);
			}
		}
	}
	,createBuffer: function() {
		this._buffer = com.haxepunk.HXP.createBitmap(this._sourceRect.width | 0,this._sourceRect.height | 0,true);
		this._bufferRect = this._buffer.rect;
		this._bitmap.set_bitmapData(this._buffer);
	}
	,init: function() {
		this.angle = 0;
		this.set_scale(this.scaleX = this.scaleY = 1);
		this.originX = this.originY = 0;
		this._alpha = 1;
		this._flipped = false;
		this._color = 16777215;
		this._red = this._green = this._blue = 1;
		this._matrix = com.haxepunk.HXP.matrix;
	}
	,setBitmapSource: function(bitmap) {
		this.blit = true;
		this._sourceRect = bitmap.rect;
		this._source = bitmap;
	}
	,setAtlasRegion: function(region) {
		this.blit = false;
		this._region = region;
		this._sourceRect = new flash.geom.Rectangle(0,0,this._region.rect.width,this._region.rect.height);
	}
	,set_scale: function(value) {
		return this._scale = value;
	}
	,get_scale: function() {
		return this._scale;
	}
	,__class__: com.haxepunk.graphics.Image
	,__properties__: $extend(com.haxepunk.Graphic.prototype.__properties__,{set_scale:"set_scale",get_scale:"get_scale",set_alpha:"set_alpha",get_alpha:"get_alpha",set_color:"set_color",get_color:"get_color",set_flipped:"set_flipped",get_flipped:"get_flipped",get_width:"get_width",get_height:"get_height",set_scaledWidth:"set_scaledWidth",get_scaledWidth:"get_scaledWidth",set_scaledHeight:"set_scaledHeight",get_scaledHeight:"get_scaledHeight",get_clipRect:"get_clipRect"})
});
com.haxepunk.graphics.Particle = function() {
	this._time = 0;
	this._duration = 0;
	this._x = this._y = 0;
	this._moveX = this._moveY = 0;
	this._gravity = 0;
};
$hxClasses["com.haxepunk.graphics.Particle"] = com.haxepunk.graphics.Particle;
com.haxepunk.graphics.Particle.__name__ = ["com","haxepunk","graphics","Particle"];
com.haxepunk.graphics.Particle.prototype = {
	__class__: com.haxepunk.graphics.Particle
}
com.haxepunk.graphics.ParticleType = function(name,frames,width,frameWidth,frameHeight) {
	this._red = this._green = this._blue = this._alpha = 1;
	this._redRange = this._greenRange = this._blueRange = this._alphaRange = 0;
	this._name = name;
	this._frame = new flash.geom.Rectangle(0,0,frameWidth,frameHeight);
	if(frames == null) frames = new Array();
	this._frames = frames;
	this._angle = this._angleRange = 0;
	this._gravity = this._gravityRange = 0;
	this._duration = this._durationRange = 0;
	this._distance = this._distanceRange = 0;
};
$hxClasses["com.haxepunk.graphics.ParticleType"] = com.haxepunk.graphics.ParticleType;
com.haxepunk.graphics.ParticleType.__name__ = ["com","haxepunk","graphics","ParticleType"];
com.haxepunk.graphics.ParticleType.prototype = {
	createBuffer: function() {
		if(this._buffer != null) return;
		this._buffer = com.haxepunk.HXP.createBitmap(this._frame.width | 0,this._frame.height | 0,true);
		this._bufferRect = this._buffer.rect;
	}
	,setColor: function(start,finish,ease) {
		if(finish == null) finish = 0;
		if(start == null) start = 16777215;
		start &= 16777215;
		finish &= 16777215;
		this._red = (start >> 16 & 255) / 255;
		this._green = (start >> 8 & 255) / 255;
		this._blue = (start & 255) / 255;
		this._redRange = (finish >> 16 & 255) / 255 - this._red;
		this._greenRange = (finish >> 8 & 255) / 255 - this._green;
		this._blueRange = (finish & 255) / 255 - this._blue;
		this._colorEase = ease;
		this.createBuffer();
		return this;
	}
	,setAlpha: function(start,finish,ease) {
		if(finish == null) finish = 0;
		if(start == null) start = 1;
		start = start < 0?0:start > 1?1:start;
		finish = finish < 0?0:finish > 1?1:finish;
		this._alpha = start;
		this._alphaRange = finish - start;
		this._alphaEase = ease;
		this.createBuffer();
		return this;
	}
	,setGravity: function(gravity,gravityRange) {
		if(gravityRange == null) gravityRange = 0;
		if(gravity == null) gravity = 0;
		this._gravity = gravity;
		this._gravityRange = gravityRange;
		return this;
	}
	,setMotionVector: function(x,y,duration,durationRange,ease) {
		if(durationRange == null) durationRange = 0;
		this._angle = Math.atan2(y,x);
		this._angleRange = 0;
		this._duration = duration;
		this._durationRange = durationRange;
		this._ease = ease;
		return this;
	}
	,setMotion: function(angle,distance,duration,angleRange,distanceRange,durationRange,ease,backwards) {
		if(backwards == null) backwards = false;
		if(durationRange == null) durationRange = 0;
		if(distanceRange == null) distanceRange = 0;
		if(angleRange == null) angleRange = 0;
		this._angle = angle * (Math.PI / -180);
		this._distance = distance;
		this._duration = duration;
		this._angleRange = angleRange * (Math.PI / -180);
		this._distanceRange = distanceRange;
		this._durationRange = durationRange;
		this._ease = ease;
		this._backwards = backwards;
		return this;
	}
	,__class__: com.haxepunk.graphics.ParticleType
}
com.haxepunk.graphics.Text = function(text,x,y,width,height,options) {
	if(height == null) height = 0;
	if(width == null) width = 0;
	if(y == null) y = 0;
	if(x == null) x = 0;
	this._textHardware = false;
	this.autoHeight = false;
	this.autoWidth = false;
	if(options == null) {
		options = { };
		options.color = 16777215;
	}
	if(options.font == null) options.font = com.haxepunk.HXP.defaultFont;
	if(options.size == 0) options.size = 16;
	if(options.align == null) options.align = flash.text.TextFormatAlign.LEFT;
	var fontObj = openfl.Assets.getFont(options.font);
	this._format = new flash.text.TextFormat(fontObj.fontName,options.size,16777215);
	this._format.align = options.align;
	this._format.leading = options.leading;
	this._field = new flash.text.TextField();
	this._field.set_wordWrap(options.wordWrap);
	this._field.set_defaultTextFormat(this._format);
	this._field.set_text(text);
	this._field.selectable = false;
	this.resizable = options.resizable;
	if(width == 0) {
		width = this._field.get_textWidth() + 4 | 0;
		this.autoWidth = true;
	}
	if(height == 0) {
		height = this._field.get_textHeight() + 4 | 0;
		this.autoHeight = true;
	}
	var source = com.haxepunk.HXP.createBitmap(width,height,true);
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) {
		this._sourceRect = source.rect;
		this._source = source;
		this._bitmap = new flash.display.Bitmap();
		this._colorTransform = new flash.geom.ColorTransform();
		this.createBuffer();
		this.updateBuffer();
		this._textHardware = true;
	}
	com.haxepunk.graphics.Image.call(this,source);
	this.set_text(text);
	this.set_color(options.color);
	this.x = x;
	this.y = y;
};
$hxClasses["com.haxepunk.graphics.Text"] = com.haxepunk.graphics.Text;
com.haxepunk.graphics.Text.__name__ = ["com","haxepunk","graphics","Text"];
com.haxepunk.graphics.Text.__super__ = com.haxepunk.graphics.Image;
com.haxepunk.graphics.Text.prototype = $extend(com.haxepunk.graphics.Image.prototype,{
	set_size: function(value) {
		if(this.size == value) return value;
		this._format.size = this.size = value;
		this.updateBuffer();
		return value;
	}
	,set_font: function(value) {
		if(this.font == value) return value;
		value = openfl.Assets.getFont(value).fontName;
		this._format.font = this.font = value;
		this.updateBuffer();
		return value;
	}
	,set_text: function(value) {
		if(this.text == value) return value;
		this._field.set_text(this.text = value);
		this.updateBuffer();
		return value;
	}
	,destroy: function() {
		if(this._textHardware && this._region != null) this._region.destroy();
	}
	,updateBuffer: function(clearBefore) {
		if(clearBefore == null) clearBefore = false;
		this._field.setTextFormat(this._format);
		this._field.set_width(this._bufferRect.width);
		if(this.autoWidth) this._field.set_width(this.textWidth = Math.ceil(this._field.get_textWidth() + 4));
		if(this.autoHeight) this._field.set_height(this.textHeight = Math.ceil(this._field.get_textHeight() + 4));
		if(this.resizable) {
			this._bufferRect.width = this.textWidth;
			this._bufferRect.height = this.textHeight;
		}
		if(this.textWidth > this._source.get_width() || this.textHeight > this._source.get_height()) {
			this._source = com.haxepunk.HXP.createBitmap(Math.max(this.textWidth,this._source.get_width()) | 0,Math.max(this.textHeight,this._source.get_height()) | 0,true);
			this._sourceRect = this._source.rect;
			this.createBuffer();
		} else this._source.fillRect(this._sourceRect,0);
		if(this.resizable) {
			this._field.set_width(this.textWidth);
			this._field.set_height(this.textHeight);
		}
		this._source.draw(this._field);
		com.haxepunk.graphics.Image.prototype.updateBuffer.call(this,clearBefore);
		if(this._textHardware) {
			if(this._region != null) this._region.destroy();
			this._region = com.haxepunk.graphics.atlas.Atlas.loadImageAsRegion(this._source);
		}
	}
	,__class__: com.haxepunk.graphics.Text
	,__properties__: $extend(com.haxepunk.graphics.Image.prototype.__properties__,{set_text:"set_text",set_font:"set_font",set_size:"set_size"})
});
com.haxepunk.graphics.atlas = {}
com.haxepunk.graphics.atlas.Atlas = function(source) {
	this._data = com.haxepunk.graphics.atlas.AtlasData.create(source);
};
$hxClasses["com.haxepunk.graphics.atlas.Atlas"] = com.haxepunk.graphics.atlas.Atlas;
com.haxepunk.graphics.atlas.Atlas.__name__ = ["com","haxepunk","graphics","atlas","Atlas"];
com.haxepunk.graphics.atlas.Atlas.loadImageAsRegion = function(source) {
	var data = com.haxepunk.graphics.atlas.AtlasData.create(source);
	return data.createRegion(new flash.geom.Rectangle(0,0,data.width,data.height),null);
}
com.haxepunk.graphics.atlas.Atlas.prototype = {
	prepareTile: function(tile,x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha) {
		this._data.prepareTile(tile,x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha);
	}
	,destroy: function() {
		this._data.destroy();
	}
	,get_height: function() {
		return this._data.height;
	}
	,get_width: function() {
		return this._data.width;
	}
	,__class__: com.haxepunk.graphics.atlas.Atlas
	,__properties__: {get_width:"get_width",get_height:"get_height"}
}
com.haxepunk.graphics.atlas.AtlasData = function(bd) {
	this._dataIndex = 0;
	this._layerIndex = 0;
	this._refCount = 0;
	this._data = new Array();
	this._tilesheet = new openfl.display.Tilesheet(bd);
	this._renderFlags = 28;
	this._flagAlpha = true;
	this._flagRGB = true;
	this.width = bd.___textureBuffer != null?bd.___textureBuffer.width:0;
	this.height = bd.___textureBuffer != null?bd.___textureBuffer.height:0;
	this._refCount = 0;
	this._layerIndex = -1;
	com.haxepunk.graphics.atlas.AtlasData._atlases.push(this);
};
$hxClasses["com.haxepunk.graphics.atlas.AtlasData"] = com.haxepunk.graphics.atlas.AtlasData;
com.haxepunk.graphics.atlas.AtlasData.__name__ = ["com","haxepunk","graphics","atlas","AtlasData"];
com.haxepunk.graphics.atlas.AtlasData.create = function(source) {
	var data;
	if(js.Boot.__instanceof(source,flash.display.BitmapData)) data = new com.haxepunk.graphics.atlas.AtlasData(source); else data = com.haxepunk.graphics.atlas.AtlasData.getAtlasDataByName(source,true);
	if(data != null) data._refCount += 1;
	return data;
}
com.haxepunk.graphics.atlas.AtlasData.getAtlasDataByName = function(name,create) {
	if(create == null) create = false;
	var data = null;
	if(com.haxepunk.graphics.atlas.AtlasData._dataPool.exists(name)) data = com.haxepunk.graphics.atlas.AtlasData._dataPool.get(name); else if(create) {
		var bitmap = com.haxepunk.HXP.getBitmap(name);
		if(bitmap != null) {
			data = new com.haxepunk.graphics.atlas.AtlasData(bitmap);
			data._name = name;
			com.haxepunk.graphics.atlas.AtlasData._dataPool.set(name,data);
		}
	}
	return data;
}
com.haxepunk.graphics.atlas.AtlasData.startScene = function(scene) {
	com.haxepunk.graphics.atlas.AtlasData._scene = scene;
	com.haxepunk.graphics.atlas.AtlasData._scene._sprite.get_graphics().clear();
}
com.haxepunk.graphics.atlas.AtlasData.endScene = function() {
	if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != null) com.haxepunk.graphics.atlas.AtlasData._lastAtlas.flush();
	com.haxepunk.graphics.atlas.AtlasData._lastAtlas = null;
}
com.haxepunk.graphics.atlas.AtlasData.destroyAll = function() {
	var _g = 0, _g1 = com.haxepunk.graphics.atlas.AtlasData._atlases;
	while(_g < _g1.length) {
		var atlas = _g1[_g];
		++_g;
		atlas.destroy();
	}
}
com.haxepunk.graphics.atlas.AtlasData.prototype = {
	set_blend: function(value) {
		switch(value) {
		case -1:
			this._renderFlags &= -65537;
			this._renderFlags &= -1;
			break;
		case 65536:
			this._renderFlags |= 65536;
			this._renderFlags &= -1;
			break;
		case 0:
			this._renderFlags &= -65537;
			this._renderFlags |= 0;
			break;
		}
		return value;
	}
	,get_blend: function() {
		if((this._renderFlags & 0) != 0) return 0; else if((this._renderFlags & 65536) != 0) return 65536; else return -1;
	}
	,set_rgb: function(value) {
		if(value) this._renderFlags |= 4; else this._renderFlags &= -5;
		this._flagRGB = value;
		return value;
	}
	,get_rgb: function() {
		return (this._renderFlags & 4) != 0;
	}
	,set_alpha: function(value) {
		if(value) this._renderFlags |= 8; else this._renderFlags &= -9;
		this._flagAlpha = value;
		return value;
	}
	,get_alpha: function() {
		return (this._renderFlags & 8) != 0;
	}
	,prepareTile: function(tile,x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha) {
		if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != this) {
			if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != null) com.haxepunk.graphics.atlas.AtlasData._lastAtlas.flush();
			com.haxepunk.graphics.atlas.AtlasData._lastAtlas = this;
		} else if(this._layerIndex != layer) {
			if(this._dataIndex != 0) {
				if(this._dataIndex < this._data.length) this._data.splice(this._dataIndex,this._data.length - this._dataIndex);
				this._dataIndex = 0;
				this._tilesheet.drawTiles(com.haxepunk.graphics.atlas.AtlasData._scene._sprite.get_graphics(),this._data,com.haxepunk.graphics.atlas.Atlas.smooth,this._renderFlags);
			}
			this._layerIndex = layer;
		}
		this._data[this._dataIndex++] = x;
		this._data[this._dataIndex++] = y;
		this._data[this._dataIndex++] = tile;
		if(angle == 0) {
			this._data[this._dataIndex++] = scaleX;
			this._data[this._dataIndex++] = 0;
			this._data[this._dataIndex++] = 0;
			this._data[this._dataIndex++] = scaleY;
		} else {
			var cos = Math.cos(-angle * (Math.PI / -180));
			var sin = Math.sin(-angle * (Math.PI / -180));
			this._data[this._dataIndex++] = cos * scaleX;
			this._data[this._dataIndex++] = -sin * scaleY;
			this._data[this._dataIndex++] = sin * scaleX;
			this._data[this._dataIndex++] = cos * scaleY;
		}
		if(this._flagRGB) {
			this._data[this._dataIndex++] = red;
			this._data[this._dataIndex++] = green;
			this._data[this._dataIndex++] = blue;
		}
		if(this._flagAlpha) this._data[this._dataIndex++] = alpha;
	}
	,prepareTileMatrix: function(tile,layer,tx,ty,a,b,c,d,red,green,blue,alpha) {
		if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != this) {
			if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != null) com.haxepunk.graphics.atlas.AtlasData._lastAtlas.flush();
			com.haxepunk.graphics.atlas.AtlasData._lastAtlas = this;
		} else if(this._layerIndex != layer) {
			if(this._dataIndex != 0) {
				if(this._dataIndex < this._data.length) this._data.splice(this._dataIndex,this._data.length - this._dataIndex);
				this._dataIndex = 0;
				this._tilesheet.drawTiles(com.haxepunk.graphics.atlas.AtlasData._scene._sprite.get_graphics(),this._data,com.haxepunk.graphics.atlas.Atlas.smooth,this._renderFlags);
			}
			this._layerIndex = layer;
		}
		this._data[this._dataIndex++] = tx;
		this._data[this._dataIndex++] = ty;
		this._data[this._dataIndex++] = tile;
		this._data[this._dataIndex++] = a;
		this._data[this._dataIndex++] = b;
		this._data[this._dataIndex++] = c;
		this._data[this._dataIndex++] = d;
		if(this._flagRGB) {
			this._data[this._dataIndex++] = red;
			this._data[this._dataIndex++] = green;
			this._data[this._dataIndex++] = blue;
		}
		if(this._flagAlpha) this._data[this._dataIndex++] = alpha;
	}
	,checkForFlush: function(layer) {
		if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != this) {
			if(com.haxepunk.graphics.atlas.AtlasData._lastAtlas != null) com.haxepunk.graphics.atlas.AtlasData._lastAtlas.flush();
			com.haxepunk.graphics.atlas.AtlasData._lastAtlas = this;
		} else if(this._layerIndex != layer) {
			if(this._dataIndex != 0) {
				if(this._dataIndex < this._data.length) this._data.splice(this._dataIndex,this._data.length - this._dataIndex);
				this._dataIndex = 0;
				this._tilesheet.drawTiles(com.haxepunk.graphics.atlas.AtlasData._scene._sprite.get_graphics(),this._data,com.haxepunk.graphics.atlas.Atlas.smooth,this._renderFlags);
			}
			this._layerIndex = layer;
		}
	}
	,flush: function() {
		if(this._dataIndex != 0) {
			if(this._dataIndex < this._data.length) this._data.splice(this._dataIndex,this._data.length - this._dataIndex);
			this._dataIndex = 0;
			this._tilesheet.drawTiles(com.haxepunk.graphics.atlas.AtlasData._scene._sprite.get_graphics(),this._data,com.haxepunk.graphics.atlas.Atlas.smooth,this._renderFlags);
		}
	}
	,createRegion: function(rect,center) {
		var r = rect.clone();
		var p = center != null?new flash.geom.Point(center.x,center.y):null;
		var tileIndex = this._tilesheet.addTileRect(r,p);
		return new com.haxepunk.graphics.atlas.AtlasRegion(this,tileIndex,rect);
	}
	,destroy: function() {
		this._refCount -= 1;
		if(this._refCount <= 0) {
			if(this._name != null) {
				com.haxepunk.HXP.removeBitmap(this._name);
				com.haxepunk.graphics.atlas.AtlasData._dataPool.remove(this._name);
			}
			HxOverrides.remove(com.haxepunk.graphics.atlas.AtlasData._atlases,this);
		}
	}
	,__class__: com.haxepunk.graphics.atlas.AtlasData
	,__properties__: {set_alpha:"set_alpha",get_alpha:"get_alpha",set_rgb:"set_rgb",get_rgb:"get_rgb",set_blend:"set_blend",get_blend:"get_blend"}
}
com.haxepunk.graphics.atlas.AtlasRegion = function(parent,tileIndex,rect) {
	this.parent = parent;
	this.tileIndex = tileIndex;
	this.rect = rect.clone();
	this.rotated = false;
};
$hxClasses["com.haxepunk.graphics.atlas.AtlasRegion"] = com.haxepunk.graphics.atlas.AtlasRegion;
com.haxepunk.graphics.atlas.AtlasRegion.__name__ = ["com","haxepunk","graphics","atlas","AtlasRegion"];
com.haxepunk.graphics.atlas.AtlasRegion.prototype = {
	get_height: function() {
		return this.rect.height;
	}
	,get_width: function() {
		return this.rect.width;
	}
	,toString: function() {
		return "[AtlasRegion " + this.rect.width + ", " + this.rect.height + " " + this.tileIndex + "]";
	}
	,destroy: function() {
		if(this.parent != null) {
			this.parent.destroy();
			this.parent = null;
		}
	}
	,drawMatrix: function(tx,ty,a,b,c,d,layer,red,green,blue,alpha) {
		if(alpha == null) alpha = 1;
		if(blue == null) blue = 1;
		if(green == null) green = 1;
		if(red == null) red = 1;
		if(this.rotated) {
			var matrix = new flash.geom.Matrix(a,b,c,d,tx,ty);
			matrix.rotate(90 * (Math.PI / -180));
			this.parent.prepareTileMatrix(this.tileIndex,layer,matrix.tx,matrix.ty,matrix.a,matrix.b,matrix.c,matrix.d,red,green,blue,alpha);
		} else this.parent.prepareTileMatrix(this.tileIndex,layer,tx,ty,a,b,c,d,red,green,blue,alpha);
	}
	,draw: function(x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha) {
		if(alpha == null) alpha = 1;
		if(blue == null) blue = 1;
		if(green == null) green = 1;
		if(red == null) red = 1;
		if(angle == null) angle = 0;
		if(scaleY == null) scaleY = 1;
		if(scaleX == null) scaleX = 1;
		if(this.rotated) angle = angle + 90;
		this.parent.prepareTile(this.tileIndex,x,y,layer,scaleX,scaleY,angle,red,green,blue,alpha);
	}
	,clip: function(clipRect,center) {
		if(clipRect.x + clipRect.width > this.rect.width) clipRect.width = this.rect.width - clipRect.x;
		if(clipRect.y + clipRect.height > this.rect.height) clipRect.height = this.rect.height - clipRect.y;
		if(clipRect.width < 0) clipRect.width = 0;
		if(clipRect.height < 0) clipRect.height = 0;
		clipRect.x += this.rect.x;
		clipRect.y += this.rect.y;
		return this.parent.createRegion(clipRect,center);
	}
	,__class__: com.haxepunk.graphics.atlas.AtlasRegion
	,__properties__: {get_width:"get_width",get_height:"get_height"}
}
com.haxepunk.graphics.atlas.TextureAtlas = function(source) {
	this._regions = new haxe.ds.StringMap();
	com.haxepunk.graphics.atlas.Atlas.call(this,source);
};
$hxClasses["com.haxepunk.graphics.atlas.TextureAtlas"] = com.haxepunk.graphics.atlas.TextureAtlas;
com.haxepunk.graphics.atlas.TextureAtlas.__name__ = ["com","haxepunk","graphics","atlas","TextureAtlas"];
com.haxepunk.graphics.atlas.TextureAtlas.loadTexturePacker = function(file) {
	var xml = Xml.parse(openfl.Assets.getText(file));
	var root = xml.firstElement();
	var atlas = new com.haxepunk.graphics.atlas.TextureAtlas(root.get("imagePath"));
	var $it0 = root.elements();
	while( $it0.hasNext() ) {
		var sprite = $it0.next();
		com.haxepunk.HXP.rect.x = Std.parseInt(sprite.get("x"));
		com.haxepunk.HXP.rect.y = Std.parseInt(sprite.get("y"));
		if(sprite.exists("w")) com.haxepunk.HXP.rect.width = Std.parseInt(sprite.get("w"));
		if(sprite.exists("h")) com.haxepunk.HXP.rect.height = Std.parseInt(sprite.get("h"));
		var region = atlas.defineRegion(sprite.get("n"),com.haxepunk.HXP.rect);
		if(sprite.exists("r") && sprite.get("r") == "y") region.rotated = true;
	}
	return atlas;
}
com.haxepunk.graphics.atlas.TextureAtlas.__super__ = com.haxepunk.graphics.atlas.Atlas;
com.haxepunk.graphics.atlas.TextureAtlas.prototype = $extend(com.haxepunk.graphics.atlas.Atlas.prototype,{
	defineRegion: function(name,rect,center) {
		var region = this._data.createRegion(rect,center);
		this._regions.set(name,region);
		return region;
	}
	,getRegion: function(name) {
		if(this._regions.exists(name)) return this._regions.get(name);
		throw "Region has not be defined yet: " + name;
	}
	,__class__: com.haxepunk.graphics.atlas.TextureAtlas
});
com.haxepunk.masks = {}
com.haxepunk.masks.Hitbox = function(width,height,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(height == null) height = 1;
	if(width == null) width = 1;
	com.haxepunk.Mask.call(this);
	this._width = width;
	this._height = height;
	this._x = x;
	this._y = y;
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
};
$hxClasses["com.haxepunk.masks.Hitbox"] = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Hitbox.__name__ = ["com","haxepunk","masks","Hitbox"];
com.haxepunk.masks.Hitbox.__super__ = com.haxepunk.Mask;
com.haxepunk.masks.Hitbox.prototype = $extend(com.haxepunk.Mask.prototype,{
	update: function() {
		if(this.parent != null) {
			this.parent.originX = -this._x;
			this.parent.originY = -this._y;
			this.parent.width = this._width;
			this.parent.height = this._height;
			if(this.list != null) this.list.update();
		}
	}
	,set_height: function(value) {
		if(this._height == value) return value;
		this._height = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._height;
	}
	,get_height: function() {
		return this._height;
	}
	,set_width: function(value) {
		if(this._width == value) return value;
		this._width = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._width;
	}
	,get_width: function() {
		return this._width;
	}
	,set_y: function(value) {
		if(this._y == value) return value;
		this._y = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._y;
	}
	,get_y: function() {
		return this._y;
	}
	,set_x: function(value) {
		if(this._x == value) return value;
		this._x = value;
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._x;
	}
	,get_x: function() {
		return this._x;
	}
	,collideHitbox: function(other) {
		return this.parent.get_x() + this._x + this._width > other.parent.get_x() + other._x && this.parent.get_y() + this._y + this._height > other.parent.get_y() + other._y && this.parent.get_x() + this._x < other.parent.get_x() + other._x + other._width && this.parent.get_y() + this._y < other.parent.get_y() + other._y + other._height;
	}
	,collideMask: function(other) {
		return this.parent.get_x() + this._x + this._width > other.parent.get_x() - other.parent.originX && this.parent.get_y() + this._y + this._height > other.parent.get_y() - other.parent.originY && this.parent.get_x() + this._x < other.parent.get_x() - other.parent.originX + other.parent.width && this.parent.get_y() + this._y < other.parent.get_y() - other.parent.originY + other.parent.height;
	}
	,__class__: com.haxepunk.masks.Hitbox
	,__properties__: {set_x:"set_x",get_x:"get_x",set_y:"set_y",get_y:"get_y",set_width:"set_width",get_width:"get_width",set_height:"set_height",get_height:"get_height"}
});
com.haxepunk.masks.Circle = function(radius,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(radius == null) radius = 1;
	com.haxepunk.masks.Hitbox.call(this);
	this.set_radius(radius);
	this._x = x + radius;
	this._y = y + radius;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Circle),$bind(this,this.collideCircle));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this._check.set(Type.getClassName(com.haxepunk.masks.Grid),$bind(this,this.collideGrid));
	this._check.set(Type.getClassName(com.haxepunk.masks.SlopedGrid),$bind(this,this.collideSlopedGrid));
};
$hxClasses["com.haxepunk.masks.Circle"] = com.haxepunk.masks.Circle;
com.haxepunk.masks.Circle.__name__ = ["com","haxepunk","masks","Circle"];
com.haxepunk.masks.Circle.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Circle.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	update: function() {
		if(this.parent != null) {
			this.parent.originX = -this._x + this._radius;
			this.parent.originY = -this._y + this._radius;
			this.parent.height = this.parent.width = this._radius + this._radius;
			if(this.list != null) this.list.update();
		}
	}
	,set_radius: function(value) {
		if(this._radius == value) return value;
		this._radius = value;
		this._squaredRadius = value * value;
		this.set_height(this.set_width(this._radius + this._radius));
		if(this.list != null) this.list.update(); else if(this.parent != null) this.update();
		return this._radius;
	}
	,get_radius: function() {
		return this._radius;
	}
	,get_y: function() {
		return this._y - this._radius;
	}
	,get_x: function() {
		return this._x - this._radius;
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		graphics.drawCircle((this.parent.get_x() + this._x - com.haxepunk.HXP.camera.x) * scaleX,(this.parent.get_y() + this._y - com.haxepunk.HXP.camera.y) * scaleY,this._radius * scaleX);
	}
	,project: function(axis,projection) {
		projection.min = -this._radius;
		projection.max = this._radius;
	}
	,collideHitbox: function(other) {
		var _otherHalfWidth = other._width * 0.5;
		var _otherHalfHeight = other._height * 0.5;
		var distanceX = Math.abs(this.parent.get_x() + this._x - other.parent.get_x() - other._x - _otherHalfWidth), distanceY = Math.abs(this.parent.get_y() + this._y - other.parent.get_y() - other._y - _otherHalfHeight);
		if(distanceX > _otherHalfWidth + this._radius || distanceY > _otherHalfHeight + this._radius) return false;
		if(distanceX <= _otherHalfWidth || distanceY <= _otherHalfHeight) return true;
		var distanceToCorner = (distanceX - _otherHalfWidth) * (distanceX - _otherHalfWidth) + (distanceY - _otherHalfHeight) * (distanceY - _otherHalfHeight);
		return distanceToCorner <= this._squaredRadius;
	}
	,collideSlopedGrid: function(other) {
		var thisX = this.parent.get_x() + this._x, thisY = this.parent.get_y() + this._y, otherX = other.parent.get_x() + other.get_x(), otherY = other.parent.get_y() + other.get_y(), entityDistX = thisX - otherX, entityDistY = thisY - otherY;
		var minx = Math.floor((entityDistX - this._radius) / (other._tile.width | 0)), miny = Math.floor((entityDistY - this._radius) / (other._tile.height | 0)), maxx = Math.ceil((entityDistX + this._radius) / (other._tile.width | 0)), maxy = Math.ceil((entityDistY + this._radius) / (other._tile.height | 0));
		if(minx < 0) minx = 0;
		if(miny < 0) miny = 0;
		if(maxx > other.columns) maxx = other.columns;
		if(maxy > other.rows) maxy = other.rows;
		var hTileWidth = (other._tile.width | 0) * 0.5, hTileHeight = (other._tile.height | 0) * 0.5, dx, dy;
		var _g = minx;
		while(_g < maxx) {
			var xx = _g++;
			var _g1 = miny;
			while(_g1 < maxy) {
				var yy = _g1++;
				var tile = other.getTile(xx,yy);
				if(tile == null || tile.type == null) continue;
				if(tile.type == com.haxepunk.masks.TileType.Solid) {
					var mx = otherX + xx * (other._tile.width | 0) + hTileWidth, my = otherY + yy * (other._tile.height | 0) + hTileHeight;
					var dx1 = Math.abs(thisX - mx);
					if(dx1 > hTileWidth + this._radius) continue;
					var dy1 = Math.abs(thisY - my);
					if(dy1 > hTileHeight + this._radius) continue;
					if(dx1 <= hTileWidth || dy1 <= hTileHeight) return true;
					var xCornerDist = dx1 - hTileWidth;
					var yCornerDist = dy1 - hTileHeight;
					if(xCornerDist * xCornerDist + yCornerDist * yCornerDist <= this._squaredRadius) return true;
				} else if(tile.type == com.haxepunk.masks.TileType.AboveSlope || tile.type == com.haxepunk.masks.TileType.BelowSlope) {
					var normal = -1 / tile.slope;
					var dx1 = -(otherX + xx * (other._tile.width | 0) - thisX);
					var dy1 = -(otherY + yy * (other._tile.height | 0) - thisY);
					var b = -(normal * dx1 - dy1);
					var x = Math.abs((b - tile.yOffset) / (normal - tile.slope));
					var y = x * normal + b;
					var dist = Math.sqrt((x - dx1) * (x - dx1) + (y - dy1) * (y - dy1));
					if(dist <= this._radius) return true;
				}
			}
		}
		return false;
	}
	,collideGrid: function(other) {
		var thisX = this.parent.get_x() + this._x, thisY = this.parent.get_y() + this._y, otherX = other.parent.get_x() + other.get_x(), otherY = other.parent.get_y() + other.get_y(), entityDistX = thisX - otherX, entityDistY = thisY - otherY;
		var minx = Math.floor((entityDistX - this._radius) / (other._tile.width | 0)), miny = Math.floor((entityDistY - this._radius) / (other._tile.height | 0)), maxx = Math.ceil((entityDistX + this._radius) / (other._tile.width | 0)), maxy = Math.ceil((entityDistY + this._radius) / (other._tile.height | 0));
		if(minx < 0) minx = 0;
		if(miny < 0) miny = 0;
		if(maxx > other.columns) maxx = other.columns;
		if(maxy > other.rows) maxy = other.rows;
		var hTileWidth = (other._tile.width | 0) * 0.5, hTileHeight = (other._tile.height | 0) * 0.5, dx, dy;
		var _g = minx;
		while(_g < maxx) {
			var xx = _g++;
			var _g1 = miny;
			while(_g1 < maxy) {
				var yy = _g1++;
				if(other.getTile(xx,yy)) {
					var mx = otherX + xx * (other._tile.width | 0) + hTileWidth, my = otherY + yy * (other._tile.height | 0) + hTileHeight;
					var dx1 = Math.abs(thisX - mx);
					if(dx1 > hTileWidth + this._radius) continue;
					var dy1 = Math.abs(thisY - my);
					if(dy1 > hTileHeight + this._radius) continue;
					if(dx1 <= hTileWidth || dy1 <= hTileHeight) return true;
					var xCornerDist = dx1 - hTileWidth;
					var yCornerDist = dy1 - hTileHeight;
					if(xCornerDist * xCornerDist + yCornerDist * yCornerDist <= this._squaredRadius) return true;
				}
			}
		}
		return false;
	}
	,collideCircle: function(other) {
		var dx = this.parent.get_x() + this._x - (other.parent.get_x() + other._x);
		var dy = this.parent.get_y() + this._y - (other.parent.get_y() + other._y);
		return dx * dx + dy * dy < Math.pow(this._radius + other._radius,2);
	}
	,collideMask: function(other) {
		var distanceX = Math.abs(this.parent.get_x() + this._x - other.parent.get_x() - other.parent.width * 0.5), distanceY = Math.abs(this.parent.get_y() + this._y - other.parent.get_y() - other.parent.height * 0.5);
		if(distanceX > other.parent.width * 0.5 + this._radius || distanceY > other.parent.height * 0.5 + this._radius) return false;
		if(distanceX <= other.parent.width * 0.5 || distanceY <= other.parent.height * 0.5) return true;
		var distanceToCorner = (distanceX - other.parent.width * 0.5) * (distanceX - other.parent.width * 0.5) + (distanceY - other.parent.height * 0.5) * (distanceY - other.parent.height * 0.5);
		return distanceToCorner <= this._squaredRadius;
	}
	,__class__: com.haxepunk.masks.Circle
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{set_radius:"set_radius",get_radius:"get_radius"})
});
com.haxepunk.masks.Grid = function(width,height,tileWidth,tileHeight,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.masks.Hitbox.call(this);
	if(width == 0 || height == 0 || tileWidth == 0 || tileHeight == 0) throw "Illegal Grid, sizes cannot be 0.";
	this._rect = com.haxepunk.HXP.rect;
	this._point = com.haxepunk.HXP.point;
	this._point2 = com.haxepunk.HXP.point2;
	this.columns = width / tileWidth | 0;
	this.rows = height / tileHeight | 0;
	this._tile = new flash.geom.Rectangle(0,0,tileWidth,tileHeight);
	this._x = x;
	this._y = y;
	this._width = width;
	this._height = height;
	this.usePositions = false;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this._check.set(Type.getClassName(com.haxepunk.masks.Pixelmask),$bind(this,this.collidePixelmask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Grid),$bind(this,this.collideGrid));
	this.data = new Array();
	var _g1 = 0, _g = this.rows;
	while(_g1 < _g) {
		var x1 = _g1++;
		this.data.push(new Array());
	}
};
$hxClasses["com.haxepunk.masks.Grid"] = com.haxepunk.masks.Grid;
com.haxepunk.masks.Grid.__name__ = ["com","haxepunk","masks","Grid"];
com.haxepunk.masks.Grid.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Grid.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	squareProjection: function(axis,point) {
		if(axis.x < axis.y) {
			point.x = axis.x;
			point.y = axis.y;
		} else {
			point.y = axis.x;
			point.x = axis.y;
		}
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		com.haxepunk.HXP.point.x = (this._x + this.parent.get_x() - com.haxepunk.HXP.camera.x) * com.haxepunk.HXP.screen.fullScaleX;
		com.haxepunk.HXP.point.y = (this._y + this.parent.get_y() - com.haxepunk.HXP.camera.y) * com.haxepunk.HXP.screen.fullScaleY;
		graphics.beginFill(255,0.3);
		var stepX = (this._tile.width | 0) * com.haxepunk.HXP.screen.fullScaleX, stepY = (this._tile.height | 0) * com.haxepunk.HXP.screen.fullScaleY, pos = com.haxepunk.HXP.point.x + stepX;
		var _g1 = 1, _g = this.columns;
		while(_g1 < _g) {
			var i = _g1++;
			graphics.drawRect(pos,com.haxepunk.HXP.point.y,1,this._height * com.haxepunk.HXP.screen.fullScaleX);
			pos += stepX;
		}
		pos = com.haxepunk.HXP.point.y + stepY;
		var _g1 = 1, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			graphics.drawRect(com.haxepunk.HXP.point.x,pos,this._width * com.haxepunk.HXP.screen.fullScaleY,1);
			pos += stepY;
		}
		com.haxepunk.HXP.rect.y = com.haxepunk.HXP.point.y;
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var y = _g1++;
			com.haxepunk.HXP.rect.x = com.haxepunk.HXP.point.x;
			var _g3 = 0, _g2 = this.columns;
			while(_g3 < _g2) {
				var x = _g3++;
				if(this.data[y][x]) graphics.drawRect(com.haxepunk.HXP.rect.x,com.haxepunk.HXP.rect.y,stepX,stepY);
				com.haxepunk.HXP.rect.x += stepX;
			}
			com.haxepunk.HXP.rect.y += stepY;
		}
		graphics.endFill();
	}
	,collideGrid: function(other) {
		var ax1 = this.parent.get_x() + this._x;
		var ax2 = ax1 + this._width;
		var bx1 = other.parent.get_x() + other._x;
		var bx2 = bx1 + other._width;
		if(ax2 < bx1 || ax1 > bx2) return false;
		var ay1 = this.parent.get_y() + this._y;
		var ay2 = ay1 + this._height;
		var by1 = other.parent.get_y() + other._y;
		var by2 = by1 + other._height;
		if(ay2 < by1 || ay1 > by2) return false;
		var ox1 = ax1 > bx1?ax1:bx1;
		var oy1 = ay1 > by1?ay1:by1;
		var ox2 = ax2 < bx2?ax2:bx2;
		var oy2 = ay2 < by2?ay2:by2;
		var tw, th;
		if(this._tile.width < other._tile.width) {
			tw = this._tile.width;
			ox1 -= this.parent.get_x() + this._x;
			ox1 = (ox1 / tw | 0) * tw;
			ox1 += this.parent.get_x() + this._x;
		} else {
			tw = other._tile.width;
			ox1 -= other.parent.get_x() + other._x;
			ox1 = (ox1 / tw | 0) * tw;
			ox1 += other.parent.get_x() + other._x;
		}
		if(this._tile.height < other._tile.height) {
			th = this._tile.height;
			oy1 -= this.parent.get_y() + this._y;
			oy1 = (oy1 / th | 0) * th;
			oy1 += this.parent.get_y() + this._y;
		} else {
			th = other._tile.height;
			oy1 -= other.parent.get_y() + other._y;
			oy1 = (oy1 / th | 0) * th;
			oy1 += other.parent.get_y() + other._y;
		}
		var y = oy1;
		var x = 0;
		while(y < oy2) {
			var ar1 = (y - this.parent.get_y() - this._y) / this._tile.height | 0;
			var br1 = (y - other.parent.get_y() - other._y) / other._tile.height | 0;
			var ar2 = (y - this.parent.get_y() - this._y + (th - 1)) / this._tile.height | 0;
			var br2 = (y - other.parent.get_y() - other._y + (th - 1)) / other._tile.height | 0;
			x = ox1;
			while(x < ox2) {
				var ac1 = (x - this.parent.get_x() - this._x) / this._tile.width | 0;
				var bc1 = (x - other.parent.get_x() - other._x) / other._tile.width | 0;
				var ac2 = (x - this.parent.get_x() - this._x + (tw - 1)) / this._tile.width | 0;
				var bc2 = (x - other.parent.get_x() - other._x + (tw - 1)) / other._tile.width | 0;
				if(this.getTile(ac1,ar1) && other.getTile(bc1,br1) || this.getTile(ac2,ar1) && other.getTile(bc2,br1) || this.getTile(ac1,ar2) && other.getTile(bc1,br2) || this.getTile(ac2,ar2) && other.getTile(bc2,br2)) return true;
				x += tw;
			}
			y += th;
		}
		return false;
	}
	,collidePixelmask: function(other) {
		haxe.Log.trace("Pixelmasks will not work in targets other than flash due to hittest not being implemented in OpenFL.",{ fileName : "Grid.hx", lineNumber : 402, className : "com.haxepunk.masks.Grid", methodName : "collidePixelmask"});
		return false;
	}
	,collideHitbox: function(other) {
		var rectX, rectY, pointX, pointY;
		this._rect.x = other.parent.get_x() - other._x - this.parent.get_x() + this._x;
		this._rect.y = other.parent.get_y() - other._y - this.parent.get_y() + this._y;
		pointX = ((this._rect.x + other._width - 1) / this._tile.width | 0) + 1;
		pointY = ((this._rect.y + other._height - 1) / this._tile.height | 0) + 1;
		rectX = this._rect.x / this._tile.width | 0;
		rectY = this._rect.y / this._tile.height | 0;
		var _g = rectY;
		while(_g < pointY) {
			var dy = _g++;
			var _g1 = rectX;
			while(_g1 < pointX) {
				var dx = _g1++;
				if(this.getTile(dx,dy)) return true;
			}
		}
		return false;
	}
	,collideMask: function(other) {
		var rectX, rectY, pointX, pointY;
		this._rect.x = other.parent.get_x() - other.parent.originX - this.parent.get_x() + this.parent.originX;
		this._rect.y = other.parent.get_y() - other.parent.originY - this.parent.get_y() + this.parent.originY;
		pointX = ((this._rect.x + other.parent.width - 1) / this._tile.width | 0) + 1;
		pointY = ((this._rect.y + other.parent.height - 1) / this._tile.height | 0) + 1;
		rectX = this._rect.x / this._tile.width | 0;
		rectY = this._rect.y / this._tile.height | 0;
		var _g = rectY;
		while(_g < pointY) {
			var dy = _g++;
			var _g1 = rectX;
			while(_g1 < pointX) {
				var dx = _g1++;
				if(this.getTile(dx,dy)) return true;
			}
		}
		return false;
	}
	,get_tileHeight: function() {
		return this._tile.height | 0;
	}
	,get_tileWidth: function() {
		return this._tile.width | 0;
	}
	,clone: function() {
		var cloneGrid = new com.haxepunk.masks.Grid(this._width,this._height,this._tile.width | 0,this._tile.height | 0,this._x,this._y);
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0, _g2 = this.columns;
			while(_g3 < _g2) {
				var x = _g3++;
				cloneGrid.setTile(x,y,this.getTile(x,y));
			}
		}
		return cloneGrid;
	}
	,saveToString: function(columnSep,rowSep,solid,empty) {
		if(empty == null) empty = "false";
		if(solid == null) solid = "true";
		if(rowSep == null) rowSep = "\n";
		if(columnSep == null) columnSep = ",";
		var s = "", x, y;
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var y1 = _g1++;
			var _g3 = 0, _g2 = this.columns;
			while(_g3 < _g2) {
				var x1 = _g3++;
				s += Std.string(this.getTileXY(x1,y1)?solid:empty);
				if(x1 != this.columns - 1) s += columnSep;
			}
			if(y1 != this.rows - 1) s += rowSep;
		}
		return s;
	}
	,loadFrom2DArray: function(array) {
		var _g1 = 0, _g = array.length;
		while(_g1 < _g) {
			var y = _g1++;
			var _g3 = 0, _g2 = array[0].length;
			while(_g3 < _g2) {
				var x = _g3++;
				this.setTile(x,y,array[y][x] > 0);
			}
		}
	}
	,loadFromString: function(str,columnSep,rowSep) {
		if(rowSep == null) rowSep = "\n";
		if(columnSep == null) columnSep = ",";
		var row = str.split(rowSep), rows = row.length, col, cols, x, y;
		var _g = 0;
		while(_g < rows) {
			var y1 = _g++;
			if(row[y1] == "") continue;
			col = row[y1].split(columnSep);
			cols = col.length;
			var _g1 = 0;
			while(_g1 < cols) {
				var x1 = _g1++;
				if(col[x1] == "") continue;
				this.setTile(x1,y1,Std.parseInt(col[x1]) > 0);
			}
		}
	}
	,clearRect: function(column,row,width,height) {
		if(height == null) height = 1;
		if(width == null) width = 1;
		if(row == null) row = 0;
		if(column == null) column = 0;
		this.setRect(column,row,width,height,false);
	}
	,setRect: function(column,row,width,height,solid) {
		if(solid == null) solid = true;
		if(height == null) height = 1;
		if(width == null) width = 1;
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(this.usePositions) {
			column = column / this._tile.width | 0;
			row = row / this._tile.height | 0;
			width = width / this._tile.width | 0;
			height = height / this._tile.height | 0;
		}
		var _g1 = row, _g = row + height;
		while(_g1 < _g) {
			var yy = _g1++;
			var _g3 = column, _g2 = column + width;
			while(_g3 < _g2) {
				var xx = _g3++;
				this.setTileXY(xx,yy,solid);
			}
		}
	}
	,getTileXY: function(x,y) {
		if(y == null) y = 0;
		if(x == null) x = 0;
		if(!(x < 0 || x > this.columns - 1 || y < 0 || y > this.rows - 1?false:true)) return false;
		return this.data[y][x];
	}
	,getTile: function(column,row) {
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(this.usePositions) {
			column = column / this._tile.width | 0;
			row = row / this._tile.height | 0;
		}
		return this.getTileXY(column,row);
	}
	,checkTile: function(column,row) {
		if(column < 0 || column > this.columns - 1 || row < 0 || row > this.rows - 1) return false; else return true;
	}
	,clearTile: function(column,row) {
		if(row == null) row = 0;
		if(column == null) column = 0;
		this.setTile(column,row,false);
	}
	,setTileXY: function(x,y,solid) {
		if(solid == null) solid = true;
		if(y == null) y = 0;
		if(x == null) x = 0;
		if(!(x < 0 || x > this.columns - 1 || y < 0 || y > this.rows - 1?false:true)) return;
		this.data[y][x] = solid;
	}
	,setTile: function(column,row,solid) {
		if(solid == null) solid = true;
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(this.usePositions) {
			column = column / this._tile.width | 0;
			row = row / this._tile.height | 0;
		}
		this.setTileXY(column,row,solid);
	}
	,__class__: com.haxepunk.masks.Grid
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{get_tileWidth:"get_tileWidth",get_tileHeight:"get_tileHeight"})
});
com.haxepunk.masks.Masklist = function(masks) {
	com.haxepunk.masks.Hitbox.call(this);
	this._masks = new Array();
	this._temp = new Array();
	this._count = 0;
	var _g = 0;
	while(_g < masks.length) {
		var m = masks[_g];
		++_g;
		this.add(m);
	}
};
$hxClasses["com.haxepunk.masks.Masklist"] = com.haxepunk.masks.Masklist;
com.haxepunk.masks.Masklist.__name__ = ["com","haxepunk","masks","Masklist"];
com.haxepunk.masks.Masklist.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Masklist.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	get_count: function() {
		return this._count;
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			m.debugDraw(graphics,scaleX,scaleY);
		}
	}
	,update: function() {
		var t = 0, l = 0, r = 0, b = 0, h;
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if((h = js.Boot.__cast(m , com.haxepunk.masks.Hitbox)) != null) {
				if(h.get_x() < l) l = h.get_x();
				if(h.get_y() < t) t = h.get_y();
				if(h.get_x() + h.get_width() > r) r = h.get_x() + h.get_width();
				if(h.get_y() + h.get_height() > b) b = h.get_y() + h.get_height();
			}
		}
		this._x = l;
		this._y = t;
		this._width = r - l;
		this._height = b - t;
		com.haxepunk.masks.Hitbox.prototype.update.call(this);
	}
	,assignTo: function(parent) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			m.parent = parent;
		}
		com.haxepunk.masks.Hitbox.prototype.assignTo.call(this,parent);
	}
	,getMask: function(index) {
		if(index == null) index = 0;
		return this._masks[index % this._masks.length];
	}
	,removeAll: function() {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			m.list = null;
		}
		this._count = 0;
		this._masks.length = 0;
		this._temp.length = 0;
		this.update();
	}
	,removeAt: function(index) {
		if(index == null) index = 0;
		this._temp.length = 0;
		var i = this._masks.length;
		index %= i;
		while(i-- > 0) if(i == index) {
			this._masks[index].list = null;
			this._count--;
			this.update();
		} else this._temp[this._temp.length] = this._masks[index];
		var temp = this._masks;
		this._masks = this._temp;
		this._temp = temp;
	}
	,remove: function(mask) {
		if(this._masks.indexOf(mask) < 0) return mask;
		this._temp.length = 0;
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m == mask) {
				mask.list = null;
				mask.parent = null;
				this._count--;
				this.update();
			} else this._temp[this._temp.length] = m;
		}
		var temp = this._masks;
		this._masks = this._temp;
		this._temp = temp;
		return mask;
	}
	,add: function(mask) {
		this._masks[this._count++] = mask;
		mask.list = this;
		mask.parent = this.parent;
		this.update();
		return mask;
	}
	,collideMasklist: function(other) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = other._masks;
			while(_g2 < _g3.length) {
				var b = _g3[_g2];
				++_g2;
				if(a.collide(b)) return true;
			}
		}
		return true;
	}
	,collide: function(mask) {
		var _g = 0, _g1 = this._masks;
		while(_g < _g1.length) {
			var m = _g1[_g];
			++_g;
			if(m.collide(mask)) return true;
		}
		return false;
	}
	,__class__: com.haxepunk.masks.Masklist
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{get_count:"get_count"})
});
com.haxepunk.masks.Pixelmask = function(source,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.masks.Hitbox.call(this);
	if(js.Boot.__instanceof(source,flash.display.BitmapData)) this._data = source; else this._data = com.haxepunk.HXP.getBitmap(source);
	if(this._data == null) throw "Invalid Pixelmask source image.";
	this.threshold = 1;
	this._rect = com.haxepunk.HXP.rect;
	this._point = com.haxepunk.HXP.point;
	this._point2 = com.haxepunk.HXP.point2;
	this._width = this.get_data().get_width();
	this._height = this.get_data().get_height();
	this._x = x;
	this._y = y;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Pixelmask),$bind(this,this.collidePixelmask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
};
$hxClasses["com.haxepunk.masks.Pixelmask"] = com.haxepunk.masks.Pixelmask;
com.haxepunk.masks.Pixelmask.__name__ = ["com","haxepunk","masks","Pixelmask"];
com.haxepunk.masks.Pixelmask.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Pixelmask.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	set_data: function(value) {
		this._data = value;
		this._width = value.___textureBuffer != null?value.___textureBuffer.width:0;
		this._height = value.___textureBuffer != null?value.___textureBuffer.height:0;
		this.update();
		return this._data;
	}
	,get_data: function() {
		return this._data;
	}
	,collidePixelmask: function(other) {
		this._point.x = other.parent.get_x() + other._x - (this.parent.get_x() + this._x);
		this._point.y = other.parent.get_y() + other._y - (this.parent.get_y() + this._y);
		var r1 = new flash.geom.Rectangle(0,0,this._data.get_width(),this._data.get_height());
		var r2 = new flash.geom.Rectangle(this._point.x,this._point.y,other._data.get_width(),other._data.get_height());
		var intersect = r1.intersection(r2);
		if(intersect.isEmpty()) return false;
		var _g1 = Math.floor(intersect.x), _g = Math.floor(intersect.x + intersect.width + 1);
		while(_g1 < _g) {
			var dx = _g1++;
			var _g3 = Math.floor(intersect.y), _g2 = Math.floor(intersect.y + intersect.height + 1);
			while(_g3 < _g2) {
				var dy = _g3++;
				var p1 = this._data.getPixel32(dx,dy) >> 24 & 255;
				var p2 = other._data.getPixel32(Math.floor(dx - this._point.x),Math.floor(dy - this._point.y)) >> 24 & 255;
				if(p1 > 0 && p2 > 0) return true;
			}
		}
		return false;
	}
	,collideHitbox: function(other) {
		this._point.x = this.parent.get_x() + this._x;
		this._point.y = this.parent.get_y() + this._y;
		this._rect.x = other.parent.get_x() + other._x;
		this._rect.y = other.parent.get_y() + other._y;
		this._rect.width = other._width;
		this._rect.height = other._height;
		return false;
	}
	,collideMask: function(other) {
		this._point.x = this.parent.get_x() + this._x;
		this._point.y = this.parent.get_y() + this._y;
		this._rect.x = other.parent.get_x() - other.parent.originX;
		this._rect.y = other.parent.get_y() - other.parent.originY;
		this._rect.width = other.parent.width;
		this._rect.height = other.parent.height;
		return false;
	}
	,__class__: com.haxepunk.masks.Pixelmask
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{set_data:"set_data",get_data:"get_data"})
});
com.haxepunk.math = {}
com.haxepunk.math.Projection = function() {
	this.max = this.min = 0;
};
$hxClasses["com.haxepunk.math.Projection"] = com.haxepunk.math.Projection;
com.haxepunk.math.Projection.__name__ = ["com","haxepunk","math","Projection"];
com.haxepunk.math.Projection.prototype = {
	toString: function() {
		return "[ " + this.min + ", " + this.max + " ]";
	}
	,getOverlap: function(other) {
		return this.max > other.max?this.max - other.min:other.max - this.min;
	}
	,overlaps: function(other) {
		return !(this.min > other.max || this.max < other.min);
	}
	,__class__: com.haxepunk.math.Projection
}
com.haxepunk.math.Vector = function(x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	flash.geom.Point.call(this,x,y);
};
$hxClasses["com.haxepunk.math.Vector"] = com.haxepunk.math.Vector;
com.haxepunk.math.Vector.__name__ = ["com","haxepunk","math","Vector"];
com.haxepunk.math.Vector.__super__ = flash.geom.Point;
com.haxepunk.math.Vector.prototype = $extend(flash.geom.Point.prototype,{
	cross: function() {
		return new com.haxepunk.math.Vector(this.y,-this.x);
	}
	,dot: function(p) {
		return this.x * p.x + this.y * p.y;
	}
	,__class__: com.haxepunk.math.Vector
});
com.haxepunk.masks.Polygon = function(points,origin) {
	com.haxepunk.masks.Hitbox.call(this);
	if(points.length < 3) throw "The polygon needs at least 3 sides.";
	this._points = points;
	this._fakeEntity = new com.haxepunk.Entity();
	this._fakeTileHitbox = new com.haxepunk.masks.Hitbox();
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this._check.set(Type.getClassName(com.haxepunk.masks.Grid),$bind(this,this.collideGrid));
	this._check.set(Type.getClassName(com.haxepunk.masks.Circle),$bind(this,this.collideCircle));
	this._check.set(Type.getClassName(com.haxepunk.masks.Polygon),$bind(this,this.collidePolygon));
	this.origin = origin != null?origin:new flash.geom.Point();
	this._angle = 0;
	this.updateAxes();
};
$hxClasses["com.haxepunk.masks.Polygon"] = com.haxepunk.masks.Polygon;
com.haxepunk.masks.Polygon.__name__ = ["com","haxepunk","masks","Polygon"];
com.haxepunk.masks.Polygon.createPolygon = function(sides,radius,angle) {
	if(angle == null) angle = 0;
	if(radius == null) radius = 100;
	if(sides == null) sides = 3;
	if(sides < 3) throw "The polygon needs at least 3 sides.";
	var rotationAngle = Math.PI * 2 / sides;
	var points = new Array();
	var _g = 0;
	while(_g < sides) {
		var i = _g++;
		var tempAngle = Math.PI + i * rotationAngle;
		var p = new flash.geom.Point();
		p.x = Math.cos(tempAngle) * radius + radius;
		p.y = Math.sin(tempAngle) * radius + radius;
		points.push(p);
	}
	var poly = new com.haxepunk.masks.Polygon(points);
	poly.origin.x = radius;
	poly.origin.y = radius;
	poly.set_angle(angle);
	return poly;
}
com.haxepunk.masks.Polygon.createFromArray = function(points) {
	var p = new Array();
	var i = 0;
	while(i < points.length) p.push(new flash.geom.Point(points[i++],points[i++]));
	return new com.haxepunk.masks.Polygon(p);
}
com.haxepunk.masks.Polygon.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.Polygon.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	updateAxes: function() {
		this.generateAxes();
		this.removeDuplicateAxes();
		this.update();
	}
	,removeDuplicateAxes: function() {
		var nAxes = this._axes.length;
		this._indicesToRemove.length = 0;
		var _g = 0;
		while(_g < nAxes) {
			var i = _g++;
			var _g1 = 0;
			while(_g1 < nAxes) {
				var j = _g1++;
				if(i == j || Math.max(i,j) >= nAxes) continue;
				if(this._axes[i].x == this._axes[j].x && this._axes[i].y == this._axes[j].y || -this._axes[i].x == this._axes[j].x && -this._axes[i].y == this._axes[j].y) this._indicesToRemove.push(j);
			}
		}
		var indexToRemove;
		while((indexToRemove = this._indicesToRemove.pop()) != null) this._axes.splice(indexToRemove,1);
	}
	,generateAxes: function() {
		this._axes = new Array();
		this._indicesToRemove = new Array();
		var temp;
		var nPoints = this._points.length;
		var edge;
		var i, j;
		i = 0;
		j = nPoints - 1;
		while(i < nPoints) {
			edge = new com.haxepunk.math.Vector();
			edge.x = this._points[i].x - this._points[j].x;
			edge.y = this._points[i].y - this._points[j].y;
			temp = edge.y;
			edge.y = -edge.x;
			edge.x = temp;
			edge.normalize(1);
			this._axes.push(edge);
			j = i;
			i++;
		}
	}
	,rotate: function(angleDelta) {
		this._angle += angleDelta;
		angleDelta *= Math.PI / -180;
		var p;
		var _g1 = 0, _g = this._points.length;
		while(_g1 < _g) {
			var i = _g1++;
			p = this._points[i];
			var dx = p.x - this.origin.x;
			var dy = p.y - this.origin.y;
			var pointAngle = Math.atan2(dy,dx);
			var length = Math.sqrt(dx * dx + dy * dy);
			p.x = Math.cos(pointAngle + angleDelta) * length + this.origin.x;
			p.y = Math.sin(pointAngle + angleDelta) * length + this.origin.y;
		}
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			var axisAngle = Math.atan2(a.y,a.x);
			a.x = Math.cos(axisAngle + angleDelta);
			a.y = Math.sin(axisAngle + angleDelta);
		}
	}
	,update: function() {
		this.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.firstProj);
		var projX = Math.round(com.haxepunk.masks.Polygon.firstProj.min);
		this._width = Math.round(com.haxepunk.masks.Polygon.firstProj.max - com.haxepunk.masks.Polygon.firstProj.min);
		this.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.secondProj);
		var projY = Math.round(com.haxepunk.masks.Polygon.secondProj.min);
		this._height = Math.round(com.haxepunk.masks.Polygon.secondProj.max - com.haxepunk.masks.Polygon.secondProj.min);
		if(this.list != null) this.list.update(); else if(this.parent != null) {
			this.parent.originX = -this._x - projX;
			this.parent.originY = -this._y - projY;
			this.parent.width = this._width;
			this.parent.height = this._height;
		}
	}
	,set_points: function(value) {
		if(this._points != value) {
			this._points = value;
			if(this.list != null || this.parent != null) this.updateAxes();
		}
		return value;
	}
	,get_points: function() {
		return this._points;
	}
	,set_angle: function(value) {
		if(value != this._angle) {
			this.rotate(value - this._angle);
			if(this.list != null || this.parent != null) this.update();
		}
		return value;
	}
	,get_angle: function() {
		return this._angle;
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		if(this.parent != null) {
			var offsetX = this.parent.get_x() + this._x - com.haxepunk.HXP.camera.x, offsetY = this.parent.get_y() + this._y - com.haxepunk.HXP.camera.y;
			graphics.beginFill(255,.3);
			graphics.moveTo((this._points[this._points.length - 1].x + offsetX) * scaleX,(this._points[this._points.length - 1].y + offsetY) * scaleY);
			var _g1 = 0, _g = this._points.length;
			while(_g1 < _g) {
				var i = _g1++;
				graphics.lineTo((this._points[i].x + offsetX) * scaleX,(this._points[i].y + offsetY) * scaleY);
			}
			graphics.endFill();
			graphics.drawCircle((offsetX + this.origin.x) * scaleX,(offsetY + this.origin.y) * scaleY,2);
		}
	}
	,project: function(axis,projection) {
		var p = this._points[0];
		var min = axis.x * p.x + axis.y * p.y, max = min;
		var _g1 = 1, _g = this._points.length;
		while(_g1 < _g) {
			var i = _g1++;
			p = this._points[i];
			var cur = axis.x * p.x + axis.y * p.y;
			if(cur < min) min = cur; else if(cur > max) max = cur;
		}
		projection.min = min;
		projection.max = max;
	}
	,collidePolygon: function(other) {
		var offset;
		var offsetX = this.parent.get_x() + this._x - other.parent.get_x();
		var offsetY = this.parent.get_y() + this._y - other.parent.get_y();
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			other.project(a,com.haxepunk.masks.Polygon.secondProj);
			offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		var _g = 0, _g1 = other._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			other.project(a,com.haxepunk.masks.Polygon.secondProj);
			offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,collideCircle: function(circle) {
		var edgesCrossed = 0;
		var p1, p2;
		var i, j;
		var nPoints = this._points.length;
		var offsetX = this.parent.get_x() + this._x;
		var offsetY = this.parent.get_y() + this._y;
		i = 0;
		j = nPoints - 1;
		while(i < nPoints) {
			p1 = this._points[i];
			p2 = this._points[j];
			var distFromCenter = (p2.x - p1.x) * (circle._y + circle.parent.get_y() - p1.y - offsetY) / (p2.y - p1.y) + p1.x + offsetX;
			if(p1.y + offsetY > circle._y + circle.parent.get_y() != p2.y + offsetY > circle._y + circle.parent.get_y() && circle._x + circle.parent.get_x() < distFromCenter) edgesCrossed++;
			j = i;
			i++;
		}
		if((edgesCrossed & 1) > 0) return true;
		var radiusSqr = circle._radius * circle._radius;
		var cx = circle._x + circle.parent.get_x();
		var cy = circle._y + circle.parent.get_y();
		var minDistanceSqr = 0;
		var closestX;
		var closestY;
		i = 0;
		j = nPoints - 1;
		while(i < nPoints) {
			p1 = this._points[i];
			p2 = this._points[j];
			var segmentLenSqr = (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
			var t = ((cx - p1.x - offsetX) * (p2.x - p1.x) + (cy - p1.y - offsetY) * (p2.y - p1.y)) / segmentLenSqr;
			if(t < 0) {
				closestX = p1.x;
				closestY = p1.y;
			} else if(t > 1) {
				closestX = p2.x;
				closestY = p2.y;
			} else {
				closestX = p1.x + t * (p2.x - p1.x);
				closestY = p1.y + t * (p2.y - p1.y);
			}
			closestX += offsetX;
			closestY += offsetY;
			minDistanceSqr = (cx - closestX) * (cx - closestX) + (cy - closestY) * (cy - closestY);
			if(minDistanceSqr <= radiusSqr) return true;
			j = i;
			i++;
		}
		return false;
	}
	,collideGrid: function(grid) {
		var tileW = grid._tile.width | 0;
		var tileH = grid._tile.height | 0;
		var solidTile;
		this._fakeEntity.width = tileW;
		this._fakeEntity.height = tileH;
		this._fakeEntity.x = this.parent.get_x();
		this._fakeEntity.y = this.parent.get_y();
		this._fakeEntity.originX = grid.parent.originX + grid._x;
		this._fakeEntity.originY = grid.parent.originY + grid._y;
		this._fakeTileHitbox._width = tileW;
		this._fakeTileHitbox._height = tileH;
		this._fakeTileHitbox.parent = this._fakeEntity;
		var _g1 = 0, _g = grid.rows;
		while(_g1 < _g) {
			var r = _g1++;
			var _g3 = 0, _g2 = grid.columns;
			while(_g3 < _g2) {
				var c = _g3++;
				this._fakeEntity.x = grid.parent.get_x() + grid._x + c * tileW;
				this._fakeEntity.y = grid.parent.get_y() + grid._y + r * tileH;
				solidTile = grid.getTile(c,r);
				if(solidTile && this.collideHitbox(this._fakeTileHitbox)) return true;
			}
		}
		return false;
	}
	,collideHitbox: function(hitbox) {
		var offset, offsetX = this.parent.get_x() + this._x - hitbox.parent.get_x(), offsetY = this.parent.get_y() + this._y - hitbox.parent.get_y();
		this.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.firstProj);
		hitbox.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetY;
		com.haxepunk.masks.Polygon.firstProj.max += offsetY;
		if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		this.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.firstProj);
		hitbox.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetX;
		com.haxepunk.masks.Polygon.firstProj.max += offsetX;
		if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			hitbox.project(a,com.haxepunk.masks.Polygon.secondProj);
			offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,collideMask: function(other) {
		var offset, offsetX = this.parent.get_x() + this._x - other.parent.get_x(), offsetY = this.parent.get_y() + this._y - other.parent.get_y();
		this.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.firstProj);
		other.project(com.haxepunk.masks.Polygon.vertical,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetY;
		com.haxepunk.masks.Polygon.firstProj.max += offsetY;
		if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		this.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.firstProj);
		other.project(com.haxepunk.masks.Polygon.horizontal,com.haxepunk.masks.Polygon.secondProj);
		com.haxepunk.masks.Polygon.firstProj.min += offsetX;
		com.haxepunk.masks.Polygon.firstProj.max += offsetX;
		if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		var _g = 0, _g1 = this._axes;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			this.project(a,com.haxepunk.masks.Polygon.firstProj);
			other.project(a,com.haxepunk.masks.Polygon.secondProj);
			offset = offsetX * a.x + offsetY * a.y;
			com.haxepunk.masks.Polygon.firstProj.min += offset;
			com.haxepunk.masks.Polygon.firstProj.max += offset;
			if(!com.haxepunk.masks.Polygon.firstProj.overlaps(com.haxepunk.masks.Polygon.secondProj)) return false;
		}
		return true;
	}
	,__class__: com.haxepunk.masks.Polygon
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{set_angle:"set_angle",get_angle:"get_angle",set_points:"set_points",get_points:"get_points"})
});
com.haxepunk.masks.TileType = $hxClasses["com.haxepunk.masks.TileType"] = { __ename__ : true, __constructs__ : ["Empty","Solid","AboveSlope","BelowSlope","TopLeft","TopRight","BottomLeft","BottomRight"] }
com.haxepunk.masks.TileType.Empty = ["Empty",0];
com.haxepunk.masks.TileType.Empty.toString = $estr;
com.haxepunk.masks.TileType.Empty.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.Solid = ["Solid",1];
com.haxepunk.masks.TileType.Solid.toString = $estr;
com.haxepunk.masks.TileType.Solid.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.AboveSlope = ["AboveSlope",2];
com.haxepunk.masks.TileType.AboveSlope.toString = $estr;
com.haxepunk.masks.TileType.AboveSlope.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.BelowSlope = ["BelowSlope",3];
com.haxepunk.masks.TileType.BelowSlope.toString = $estr;
com.haxepunk.masks.TileType.BelowSlope.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.TopLeft = ["TopLeft",4];
com.haxepunk.masks.TileType.TopLeft.toString = $estr;
com.haxepunk.masks.TileType.TopLeft.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.TopRight = ["TopRight",5];
com.haxepunk.masks.TileType.TopRight.toString = $estr;
com.haxepunk.masks.TileType.TopRight.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.BottomLeft = ["BottomLeft",6];
com.haxepunk.masks.TileType.BottomLeft.toString = $estr;
com.haxepunk.masks.TileType.BottomLeft.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.TileType.BottomRight = ["BottomRight",7];
com.haxepunk.masks.TileType.BottomRight.toString = $estr;
com.haxepunk.masks.TileType.BottomRight.__enum__ = com.haxepunk.masks.TileType;
com.haxepunk.masks.SlopedGrid = function(width,height,tileWidth,tileHeight,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	com.haxepunk.masks.Hitbox.call(this);
	if(width == 0 || height == 0 || tileWidth == 0 || tileHeight == 0) throw "Illegal Grid, sizes cannot be 0.";
	this._rect = com.haxepunk.HXP.rect;
	this._point = com.haxepunk.HXP.point;
	this._point2 = com.haxepunk.HXP.point2;
	this.columns = width / tileWidth | 0;
	this.rows = height / tileHeight | 0;
	this._tile = new flash.geom.Rectangle(0,0,tileWidth,tileHeight);
	this._x = x;
	this._y = y;
	this._width = width;
	this._height = height;
	this.usePositions = false;
	this._check.set(Type.getClassName(com.haxepunk.Mask),$bind(this,this.collideMask));
	this._check.set(Type.getClassName(com.haxepunk.masks.Hitbox),$bind(this,this.collideHitbox));
	this.data = new Array();
	var _g1 = 0, _g = this.rows;
	while(_g1 < _g) {
		var x1 = _g1++;
		this.data.push(new Array());
	}
};
$hxClasses["com.haxepunk.masks.SlopedGrid"] = com.haxepunk.masks.SlopedGrid;
com.haxepunk.masks.SlopedGrid.__name__ = ["com","haxepunk","masks","SlopedGrid"];
com.haxepunk.masks.SlopedGrid.__super__ = com.haxepunk.masks.Hitbox;
com.haxepunk.masks.SlopedGrid.prototype = $extend(com.haxepunk.masks.Hitbox.prototype,{
	squareProjection: function(axis,point) {
		if(axis.x < axis.y) {
			point.x = axis.x;
			point.y = axis.y;
		} else {
			point.y = axis.x;
			point.x = axis.y;
		}
	}
	,debugDraw: function(graphics,scaleX,scaleY) {
		com.haxepunk.HXP.point.x = (this._x + this.parent.get_x() - com.haxepunk.HXP.camera.x) * com.haxepunk.HXP.screen.fullScaleX;
		com.haxepunk.HXP.point.y = (this._y + this.parent.get_y() - com.haxepunk.HXP.camera.y) * com.haxepunk.HXP.screen.fullScaleY;
		graphics.beginFill(255,0.3);
		var stepX = (this._tile.width | 0) * com.haxepunk.HXP.screen.fullScaleX, stepY = (this._tile.height | 0) * com.haxepunk.HXP.screen.fullScaleY, pos = com.haxepunk.HXP.point.x + stepX;
		var _g1 = 1, _g = this.columns;
		while(_g1 < _g) {
			var i = _g1++;
			graphics.drawRect(pos,com.haxepunk.HXP.point.y,1,this._height * com.haxepunk.HXP.screen.fullScaleX);
			pos += stepX;
		}
		pos = com.haxepunk.HXP.point.y + stepY;
		var _g1 = 1, _g = this.rows;
		while(_g1 < _g) {
			var i = _g1++;
			graphics.drawRect(com.haxepunk.HXP.point.x,pos,this._width * com.haxepunk.HXP.screen.fullScaleY,1);
			pos += stepY;
		}
		var ry = com.haxepunk.HXP.point.y;
		var _g1 = 0, _g = this.rows;
		while(_g1 < _g) {
			var y = _g1++;
			var rx = com.haxepunk.HXP.point.x;
			var _g3 = 0, _g2 = this.columns;
			while(_g3 < _g2) {
				var x = _g3++;
				var tile = this.data[y][x];
				if(tile == null || tile.type == null) {
				} else if(tile.type == com.haxepunk.masks.TileType.Solid) graphics.drawRect(rx,ry,stepX,stepY); else if(tile.type == com.haxepunk.masks.TileType.BelowSlope || tile.type == com.haxepunk.masks.TileType.AboveSlope) {
					var ypos = ry + tile.yOffset * com.haxepunk.HXP.screen.fullScaleY;
					graphics.moveTo(rx,ypos);
					graphics.lineTo(rx + stepX,ypos + tile.slope * stepX);
				}
				rx += stepX;
			}
			ry += stepY;
		}
		graphics.endFill();
	}
	,collideHitbox: function(other) {
		return this.collideBox(other.parent.get_x() - other._x,other.parent.get_y() - other._y,other._width,other._height,this.parent.get_x() + this._x,this.parent.get_y() + this._y);
	}
	,collideMask: function(other) {
		return this.collideBox(other.parent.get_x() - other.parent.originX,other.parent.get_y() - other.parent.originY,other.parent.width,other.parent.height,this.parent.get_x() + this.parent.originX,this.parent.get_y() + this.parent.originY);
	}
	,collideBox: function(opx,opy,opw,oph,px,py) {
		var rectX, rectY, pointX, pointY;
		this._rect.x = opx - px;
		this._rect.y = opy - py;
		pointX = ((this._rect.x + opw - 1) / this._tile.width | 0) + 1;
		pointY = ((this._rect.y + oph - 1) / this._tile.height | 0) + 1;
		rectX = this._rect.x / this._tile.width | 0;
		rectY = this._rect.y / this._tile.height | 0;
		var collide = false;
		var _g = rectY;
		while(_g < pointY) {
			var dy = _g++;
			var _g1 = rectX;
			while(_g1 < pointX) {
				var dx = _g1++;
				var tile = this.getTile(dx,dy);
				if(tile == null || tile.type == null) continue;
				switch( (tile.type)[1] ) {
				case 1:
					collide = true;
					break;
				case 3:
					var y = this._rect.y - tile.yOffset - dy * (this._tile.height | 0);
					var x = this._rect.x - dx * (this._tile.width | 0);
					var end = x + opw;
					while(x < end) {
						var mx = tile.slope * x;
						if(y > mx || y + oph > mx) {
							collide = true;
							break;
						}
						x += 1;
					}
					break;
				case 2:
					var y = this._rect.y - tile.yOffset - dy * (this._tile.height | 0);
					var x = this._rect.x - dx * (this._tile.width | 0);
					var end = x + opw;
					while(x < end) {
						var mx = tile.slope * x;
						if(y < mx || y + oph < mx) {
							collide = true;
							break;
						}
						x += 1;
					}
					break;
				default:
				}
				if(collide) break;
			}
		}
		return collide;
	}
	,get_tileHeight: function() {
		return this._tile.height | 0;
	}
	,get_tileWidth: function() {
		return this._tile.width | 0;
	}
	,clearRect: function(column,row,width,height) {
		if(height == null) height = 1;
		if(width == null) width = 1;
		if(row == null) row = 0;
		if(column == null) column = 0;
		this.setRect(column,row,width,height,com.haxepunk.masks.TileType.Empty);
	}
	,setRect: function(column,row,width,height,type,slope,yOffset) {
		if(yOffset == null) yOffset = 0;
		if(slope == null) slope = 0;
		if(height == null) height = 1;
		if(width == null) width = 1;
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(type == null) type = com.haxepunk.masks.TileType.Solid;
		if(this.usePositions) {
			column = column / this._tile.width | 0;
			row = row / this._tile.height | 0;
			width = width / this._tile.width | 0;
			height = height / this._tile.height | 0;
		}
		var _g1 = row, _g = row + height;
		while(_g1 < _g) {
			var yy = _g1++;
			var _g3 = column, _g2 = column + width;
			while(_g3 < _g2) {
				var xx = _g3++;
				this.setTile(xx,yy,type,slope,yOffset);
			}
		}
	}
	,getTile: function(column,row) {
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(!(column >= 0 && column < this.columns && row >= 0 && row < this.rows)) return { type : com.haxepunk.masks.TileType.Empty}; else {
			if(this.usePositions) {
				column = column / this._tile.width | 0;
				row = row / this._tile.height | 0;
			}
			return this.data[row][column];
		}
	}
	,checkTile: function(column,row) {
		return column >= 0 && column < this.columns && row >= 0 && row < this.rows;
	}
	,clearTile: function(column,row) {
		if(row == null) row = 0;
		if(column == null) column = 0;
		this.setTile(column,row,com.haxepunk.masks.TileType.Empty);
	}
	,setTile: function(column,row,type,slope,yOffset) {
		if(yOffset == null) yOffset = 0;
		if(slope == null) slope = 0;
		if(row == null) row = 0;
		if(column == null) column = 0;
		if(!(column >= 0 && column < this.columns && row >= 0 && row < this.rows)) return;
		if(type == null) type = com.haxepunk.masks.TileType.Solid;
		if(this.usePositions) {
			column = column / this._tile.width | 0;
			row = row / this._tile.height | 0;
		}
		switch( (type)[1] ) {
		case 4:
			this.data[row][column] = { type : com.haxepunk.masks.TileType.AboveSlope, slope : -1, yOffset : this._tile.height};
			break;
		case 5:
			this.data[row][column] = { type : com.haxepunk.masks.TileType.AboveSlope, slope : 1, yOffset : 0};
			break;
		case 6:
			this.data[row][column] = { type : com.haxepunk.masks.TileType.BelowSlope, slope : 1, yOffset : 0};
			break;
		case 7:
			this.data[row][column] = { type : com.haxepunk.masks.TileType.BelowSlope, slope : -1, yOffset : this._tile.height};
			break;
		default:
			this.data[row][column] = { type : type, slope : slope, yOffset : yOffset * this._tile.height};
		}
	}
	,__class__: com.haxepunk.masks.SlopedGrid
	,__properties__: $extend(com.haxepunk.masks.Hitbox.prototype.__properties__,{get_tileWidth:"get_tileWidth",get_tileHeight:"get_tileHeight"})
});
com.haxepunk.tweens = {}
com.haxepunk.tweens.TweenEvent = function(inType,inBubbles,inCancelable) {
	flash.events.Event.call(this,inType,inBubbles,inCancelable);
};
$hxClasses["com.haxepunk.tweens.TweenEvent"] = com.haxepunk.tweens.TweenEvent;
com.haxepunk.tweens.TweenEvent.__name__ = ["com","haxepunk","tweens","TweenEvent"];
com.haxepunk.tweens.TweenEvent.__super__ = flash.events.Event;
com.haxepunk.tweens.TweenEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: com.haxepunk.tweens.TweenEvent
});
com.haxepunk.tweens.misc = {}
com.haxepunk.tweens.misc.Alarm = function(duration,complete,type) {
	com.haxepunk.Tween.call(this,duration,type,complete,null);
};
$hxClasses["com.haxepunk.tweens.misc.Alarm"] = com.haxepunk.tweens.misc.Alarm;
com.haxepunk.tweens.misc.Alarm.__name__ = ["com","haxepunk","tweens","misc","Alarm"];
com.haxepunk.tweens.misc.Alarm.__super__ = com.haxepunk.Tween;
com.haxepunk.tweens.misc.Alarm.prototype = $extend(com.haxepunk.Tween.prototype,{
	get_remaining: function() {
		return this._target - this._time;
	}
	,get_duration: function() {
		return this._target;
	}
	,get_elapsed: function() {
		return this._time;
	}
	,reset: function(duration) {
		this._target = duration;
		this.start();
	}
	,__class__: com.haxepunk.tweens.misc.Alarm
	,__properties__: $extend(com.haxepunk.Tween.prototype.__properties__,{get_elapsed:"get_elapsed",get_duration:"get_duration",get_remaining:"get_remaining"})
});
com.haxepunk.tweens.misc.MultiVarTween = function(complete,type) {
	this._vars = new Array();
	this._start = new Array();
	this._range = new Array();
	com.haxepunk.Tween.call(this,0,type,complete);
};
$hxClasses["com.haxepunk.tweens.misc.MultiVarTween"] = com.haxepunk.tweens.misc.MultiVarTween;
com.haxepunk.tweens.misc.MultiVarTween.__name__ = ["com","haxepunk","tweens","misc","MultiVarTween"];
com.haxepunk.tweens.misc.MultiVarTween.__super__ = com.haxepunk.Tween;
com.haxepunk.tweens.misc.MultiVarTween.prototype = $extend(com.haxepunk.Tween.prototype,{
	update: function() {
		com.haxepunk.Tween.prototype.update.call(this);
		var i = this._vars.length;
		while(i-- > 0) Reflect.setProperty(this._object,this._vars[i],this._start[i] + this._range[i] * this._t);
	}
	,tween: function(object,properties,duration,ease) {
		this._object = object;
		this._vars.length = 0;
		this._start.length = 0;
		this._range.length = 0;
		this._target = duration;
		this._ease = ease;
		var p;
		var fields = null;
		if(Reflect.isObject(properties)) fields = Reflect.fields(properties); else throw "Unsupported MultiVar properties container - use Object containing key/value pairs.";
		var _g = 0;
		while(_g < fields.length) {
			var p1 = fields[_g];
			++_g;
			var a = Reflect.getProperty(object,p1);
			if(Math.isNaN(a)) throw "The property \"" + p1 + "\" is not numeric.";
			this._vars.push(p1);
			this._start.push(a);
			this._range.push(Reflect.field(properties,p1) - a);
		}
		this.start();
	}
	,__class__: com.haxepunk.tweens.misc.MultiVarTween
});
com.haxepunk.utils = {}
com.haxepunk.utils.Draw = function() { }
$hxClasses["com.haxepunk.utils.Draw"] = com.haxepunk.utils.Draw;
com.haxepunk.utils.Draw.__name__ = ["com","haxepunk","utils","Draw"];
com.haxepunk.utils.Draw.init = function() {
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.HARDWARE) {
		var sprite = new flash.display.Sprite();
		com.haxepunk.HXP.stage.addChild(sprite);
		com.haxepunk.utils.Draw._graphics = sprite.get_graphics();
	} else com.haxepunk.utils.Draw._graphics = com.haxepunk.HXP.sprite.get_graphics();
	com.haxepunk.utils.Draw._rect = com.haxepunk.HXP.rect;
}
com.haxepunk.utils.Draw.setTarget = function(target,camera,blend) {
	com.haxepunk.utils.Draw._target = target;
	com.haxepunk.utils.Draw._camera = camera != null?camera:com.haxepunk.HXP.zero;
	com.haxepunk.utils.Draw.blend = blend;
}
com.haxepunk.utils.Draw.resetTarget = function() {
	com.haxepunk.utils.Draw._target = com.haxepunk.HXP.buffer;
	com.haxepunk.utils.Draw._camera = com.haxepunk.HXP.camera;
	com.haxepunk.utils.Draw.blend = null;
	com.haxepunk.utils.Draw._graphics.clear();
}
com.haxepunk.utils.Draw.drawToScreen = function() {
	if(com.haxepunk.utils.Draw.blend == null) com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite); else com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite,null,null,com.haxepunk.utils.Draw.blend);
}
com.haxepunk.utils.Draw.line = function(x1,y1,x2,y2,color) {
	if(color == null) color = 16777215;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		color = -16777216 | 16777215 & color;
		var screen = com.haxepunk.utils.Draw._target, X = Math.abs(x2 - x1), Y = Math.abs(y2 - y1), xx, yy;
		x1 -= com.haxepunk.utils.Draw._camera.x | 0;
		y1 -= com.haxepunk.utils.Draw._camera.y | 0;
		x2 -= com.haxepunk.utils.Draw._camera.x | 0;
		y2 -= com.haxepunk.utils.Draw._camera.y | 0;
		if(X == 0) {
			if(Y == 0) {
				screen.setPixel32(x1,y1,color);
				return;
			}
			yy = y2 > y1?1:-1;
			while(y1 != y2) {
				screen.setPixel32(x1,y1,color);
				y1 += yy;
			}
			screen.setPixel32(x2,y2,color);
			return;
		}
		if(Y == 0) {
			xx = x2 > x1?1:-1;
			while(x1 != x2) {
				screen.setPixel32(x1,y1,color);
				x1 += xx;
			}
			screen.setPixel32(x2,y2,color);
			return;
		}
		xx = x2 > x1?1:-1;
		yy = y2 > y1?1:-1;
		var c = 0, slope;
		if(X > Y) {
			slope = Y / X;
			c = .5;
			while(x1 != x2) {
				screen.setPixel32(x1,y1,color);
				x1 += xx;
				c += slope;
				if(c >= 1) {
					y1 += yy;
					c -= 1;
				}
			}
			screen.setPixel32(x2,y2,color);
		} else {
			slope = X / Y;
			c = .5;
			while(y1 != y2) {
				screen.setPixel32(x1,y1,color);
				y1 += yy;
				c += slope;
				if(c >= 1) {
					x1 += xx;
					c -= 1;
				}
			}
			screen.setPixel32(x2,y2,color);
		}
	} else com.haxepunk.utils.Draw.linePlus(x1,y1,x2,y2,color);
}
com.haxepunk.utils.Draw.linePlus = function(x1,y1,x2,y2,color,alpha,thick) {
	if(thick == null) thick = 1;
	if(alpha == null) alpha = 1;
	if(color == null) color = -16777216;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		com.haxepunk.utils.Draw._graphics.clear();
		com.haxepunk.utils.Draw._graphics.lineStyle(thick,color,alpha,false,flash.display.LineScaleMode.NONE);
		com.haxepunk.utils.Draw._graphics.moveTo(x1 - com.haxepunk.utils.Draw._camera.x,y1 - com.haxepunk.utils.Draw._camera.y);
		com.haxepunk.utils.Draw._graphics.lineTo(x2 - com.haxepunk.utils.Draw._camera.x,y2 - com.haxepunk.utils.Draw._camera.y);
		if(com.haxepunk.utils.Draw.blend == null) com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite); else com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite,null,null,com.haxepunk.utils.Draw.blend);
	} else {
		com.haxepunk.utils.Draw._graphics.lineStyle(thick,color,alpha,false,flash.display.LineScaleMode.NONE);
		com.haxepunk.utils.Draw._graphics.moveTo(x1 - com.haxepunk.utils.Draw._camera.x,y1 - com.haxepunk.utils.Draw._camera.y);
		com.haxepunk.utils.Draw._graphics.lineTo(x2 - com.haxepunk.utils.Draw._camera.x,y2 - com.haxepunk.utils.Draw._camera.y);
		com.haxepunk.utils.Draw._graphics.lineStyle(0);
	}
}
com.haxepunk.utils.Draw.rect = function(x,y,width,height,color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 16777215;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		if(alpha >= 1 && com.haxepunk.utils.Draw.blend == null) {
			color = -16777216 | 16777215 & color;
			com.haxepunk.utils.Draw._rect.x = x - com.haxepunk.utils.Draw._camera.x;
			com.haxepunk.utils.Draw._rect.y = y - com.haxepunk.utils.Draw._camera.y;
			com.haxepunk.utils.Draw._rect.width = width;
			com.haxepunk.utils.Draw._rect.height = height;
			com.haxepunk.utils.Draw._target.fillRect(com.haxepunk.utils.Draw._rect,color);
			return;
		}
		com.haxepunk.utils.Draw._graphics.clear();
		com.haxepunk.utils.Draw._graphics.beginFill(color,alpha);
		com.haxepunk.utils.Draw._graphics.drawRect(x - com.haxepunk.utils.Draw._camera.x,y - com.haxepunk.utils.Draw._camera.y,width,height);
		if(com.haxepunk.utils.Draw.blend == null) com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite); else com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite,null,null,com.haxepunk.utils.Draw.blend);
	} else {
		com.haxepunk.utils.Draw._graphics.beginFill(color,alpha);
		com.haxepunk.utils.Draw._graphics.drawRect(x - com.haxepunk.utils.Draw._camera.x,y - com.haxepunk.utils.Draw._camera.y,width,height);
		com.haxepunk.utils.Draw._graphics.endFill();
	}
}
com.haxepunk.utils.Draw.circle = function(x,y,radius,color) {
	if(color == null) color = 16777215;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		color = -16777216 | 16777215 & color;
		x -= com.haxepunk.utils.Draw._camera.x | 0;
		y -= com.haxepunk.utils.Draw._camera.y | 0;
		var f = 1 - radius, fx = 1, fy = -2 * radius, xx = 0, yy = radius;
		com.haxepunk.utils.Draw._target.setPixel32(x,y + radius,color);
		com.haxepunk.utils.Draw._target.setPixel32(x,y - radius,color);
		com.haxepunk.utils.Draw._target.setPixel32(x + radius,y,color);
		com.haxepunk.utils.Draw._target.setPixel32(x - radius,y,color);
		while(xx < yy) {
			if(f >= 0) {
				yy--;
				fy += 2;
				f += fy;
			}
			xx++;
			fx += 2;
			f += fx;
			com.haxepunk.utils.Draw._target.setPixel32(x + xx,y + yy,color);
			com.haxepunk.utils.Draw._target.setPixel32(x - xx,y + yy,color);
			com.haxepunk.utils.Draw._target.setPixel32(x + xx,y - yy,color);
			com.haxepunk.utils.Draw._target.setPixel32(x - xx,y - yy,color);
			com.haxepunk.utils.Draw._target.setPixel32(x + yy,y + xx,color);
			com.haxepunk.utils.Draw._target.setPixel32(x - yy,y + xx,color);
			com.haxepunk.utils.Draw._target.setPixel32(x + yy,y - xx,color);
			com.haxepunk.utils.Draw._target.setPixel32(x - yy,y - xx,color);
		}
	} else com.haxepunk.utils.Draw.circlePlus(x,y,radius,color);
}
com.haxepunk.utils.Draw.circlePlus = function(x,y,radius,color,alpha,fill,thick) {
	if(thick == null) thick = 1;
	if(fill == null) fill = true;
	if(alpha == null) alpha = 1;
	if(color == null) color = 16777215;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		com.haxepunk.utils.Draw._graphics.clear();
		if(fill) {
			com.haxepunk.utils.Draw._graphics.beginFill(color & 16777215,alpha);
			com.haxepunk.utils.Draw._graphics.drawCircle(x - com.haxepunk.utils.Draw._camera.x,y - com.haxepunk.utils.Draw._camera.y,radius);
			com.haxepunk.utils.Draw._graphics.endFill();
		} else {
			com.haxepunk.utils.Draw._graphics.lineStyle(thick,color & 16777215,alpha);
			com.haxepunk.utils.Draw._graphics.drawCircle(x - com.haxepunk.utils.Draw._camera.x,y - com.haxepunk.utils.Draw._camera.y,radius);
		}
		if(com.haxepunk.utils.Draw.blend == null) com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite); else com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite,null,null,com.haxepunk.utils.Draw.blend);
	} else if(fill) {
		com.haxepunk.utils.Draw._graphics.beginFill(color & 16777215,alpha);
		com.haxepunk.utils.Draw._graphics.drawCircle(x - com.haxepunk.utils.Draw._camera.x,y - com.haxepunk.utils.Draw._camera.y,radius);
		com.haxepunk.utils.Draw._graphics.endFill();
	} else {
		com.haxepunk.utils.Draw._graphics.lineStyle(thick,color & 16777215,alpha);
		com.haxepunk.utils.Draw._graphics.drawCircle(x - com.haxepunk.utils.Draw._camera.x,y - com.haxepunk.utils.Draw._camera.y,radius);
		com.haxepunk.utils.Draw._graphics.lineStyle(0);
	}
}
com.haxepunk.utils.Draw.hitbox = function(e,outline,color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 16777215;
	if(outline == null) outline = true;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		if(outline) {
			color = -16777216 | 16777215 & color;
			var x = (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX - com.haxepunk.utils.Draw._camera.x | 0, y = (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY - com.haxepunk.utils.Draw._camera.y | 0;
			com.haxepunk.utils.Draw._rect.x = x;
			com.haxepunk.utils.Draw._rect.y = y;
			com.haxepunk.utils.Draw._rect.width = e.width;
			com.haxepunk.utils.Draw._rect.height = 1;
			com.haxepunk.utils.Draw._target.fillRect(com.haxepunk.utils.Draw._rect,color);
			com.haxepunk.utils.Draw._rect.y += e.height - 1;
			com.haxepunk.utils.Draw._target.fillRect(com.haxepunk.utils.Draw._rect,color);
			com.haxepunk.utils.Draw._rect.y = y;
			com.haxepunk.utils.Draw._rect.width = 1;
			com.haxepunk.utils.Draw._rect.height = e.height;
			com.haxepunk.utils.Draw._target.fillRect(com.haxepunk.utils.Draw._rect,color);
			com.haxepunk.utils.Draw._rect.x += e.width - 1;
			com.haxepunk.utils.Draw._target.fillRect(com.haxepunk.utils.Draw._rect,color);
			return;
		}
		if(alpha >= 1 && com.haxepunk.utils.Draw.blend == null) {
			color = -16777216 | 16777215 & color;
			com.haxepunk.utils.Draw._rect.x = (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX - com.haxepunk.utils.Draw._camera.x;
			com.haxepunk.utils.Draw._rect.y = (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY - com.haxepunk.utils.Draw._camera.y;
			com.haxepunk.utils.Draw._rect.width = e.width;
			com.haxepunk.utils.Draw._rect.height = e.height;
			com.haxepunk.utils.Draw._target.fillRect(com.haxepunk.utils.Draw._rect,color);
			return;
		}
		com.haxepunk.utils.Draw._graphics.clear();
		com.haxepunk.utils.Draw._graphics.beginFill(color,alpha);
		com.haxepunk.utils.Draw._graphics.drawRect((e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX - com.haxepunk.utils.Draw._camera.x,(e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY - com.haxepunk.utils.Draw._camera.y,e.width,e.height);
		if(com.haxepunk.utils.Draw.blend == null) com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite); else com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite,null,null,com.haxepunk.utils.Draw.blend);
	} else {
		com.haxepunk.utils.Draw._graphics.beginFill(color,alpha);
		com.haxepunk.utils.Draw._graphics.drawRect((e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) - e.originX - com.haxepunk.utils.Draw._camera.x,(e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) - e.originY - com.haxepunk.utils.Draw._camera.y,e.width,e.height);
		com.haxepunk.utils.Draw._graphics.endFill();
	}
}
com.haxepunk.utils.Draw.curve = function(x1,y1,x2,y2,x3,y3,thick,color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 0;
	if(thick == null) thick = 1;
	if(com.haxepunk.HXP.renderMode == com.haxepunk.RenderMode.BUFFER) {
		com.haxepunk.utils.Draw._graphics.clear();
		com.haxepunk.utils.Draw._graphics.lineStyle(thick,color,alpha);
		com.haxepunk.utils.Draw._graphics.moveTo(x1 - com.haxepunk.utils.Draw._camera.x,y1 - com.haxepunk.utils.Draw._camera.y);
		com.haxepunk.utils.Draw._graphics.curveTo(x2 - com.haxepunk.utils.Draw._camera.x,y2 - com.haxepunk.utils.Draw._camera.y,x3 - com.haxepunk.utils.Draw._camera.x,y3 - com.haxepunk.utils.Draw._camera.y);
		if(com.haxepunk.utils.Draw.blend == null) com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite); else com.haxepunk.utils.Draw._target.draw(com.haxepunk.HXP.sprite,null,null,com.haxepunk.utils.Draw.blend);
	} else {
		com.haxepunk.utils.Draw._graphics.lineStyle(thick,color,alpha);
		com.haxepunk.utils.Draw._graphics.moveTo(x1 - com.haxepunk.utils.Draw._camera.x,y1 - com.haxepunk.utils.Draw._camera.y);
		com.haxepunk.utils.Draw._graphics.curveTo(x2 - com.haxepunk.utils.Draw._camera.x,y2 - com.haxepunk.utils.Draw._camera.y,x3 - com.haxepunk.utils.Draw._camera.x,y3 - com.haxepunk.utils.Draw._camera.y);
		com.haxepunk.utils.Draw._graphics.lineStyle(0);
	}
}
com.haxepunk.utils.Draw.graphic = function(g,x,y) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(g.get_visible()) {
		if(g.relative) {
			com.haxepunk.HXP.point.x = x;
			com.haxepunk.HXP.point.y = y;
		} else com.haxepunk.HXP.point.x = com.haxepunk.HXP.point.y = 0;
		com.haxepunk.HXP.point2.x = com.haxepunk.HXP.camera.x;
		com.haxepunk.HXP.point2.y = com.haxepunk.HXP.camera.y;
		g.render(com.haxepunk.utils.Draw._target,com.haxepunk.HXP.point,com.haxepunk.HXP.point2);
	}
}
com.haxepunk.utils.Draw.entity = function(e,x,y,addEntityPosition) {
	if(addEntityPosition == null) addEntityPosition = false;
	if(y == null) y = 0;
	if(x == null) x = 0;
	if(e.visible && e._graphic != null) {
		if(addEntityPosition) com.haxepunk.utils.Draw.graphic(e._graphic,x + (e.followCamera?e.x + com.haxepunk.HXP.camera.x:e.x) | 0,y + (e.followCamera?e.y + com.haxepunk.HXP.camera.y:e.y) | 0); else com.haxepunk.utils.Draw.graphic(e._graphic,x,y);
	}
}
com.haxepunk.utils.Draw.text = function(text,x,y,options) {
	if(y == null) y = 0;
	if(x == null) x = 0;
	var textGfx = new com.haxepunk.graphics.Text(text,x,y,0,0,options);
	textGfx.render(com.haxepunk.utils.Draw._target,com.haxepunk.HXP.zero,com.haxepunk.utils.Draw._camera);
}
com.haxepunk.utils.Ease = function() { }
$hxClasses["com.haxepunk.utils.Ease"] = com.haxepunk.utils.Ease;
com.haxepunk.utils.Ease.__name__ = ["com","haxepunk","utils","Ease"];
com.haxepunk.utils.Ease.__properties__ = {get_EL:"get_EL",get_PI2:"get_PI2",get_PI:"get_PI"}
com.haxepunk.utils.Ease.quadIn = function(t) {
	return t * t;
}
com.haxepunk.utils.Ease.quadOut = function(t) {
	return -t * (t - 2);
}
com.haxepunk.utils.Ease.quadInOut = function(t) {
	return t <= .5?t * t * 2:1 - --t * t * 2;
}
com.haxepunk.utils.Ease.cubeIn = function(t) {
	return t * t * t;
}
com.haxepunk.utils.Ease.cubeOut = function(t) {
	return 1 + --t * t * t;
}
com.haxepunk.utils.Ease.cubeInOut = function(t) {
	return t <= .5?t * t * t * 4:1 + --t * t * t * 4;
}
com.haxepunk.utils.Ease.quartIn = function(t) {
	return t * t * t * t;
}
com.haxepunk.utils.Ease.quartOut = function(t) {
	return 1 - (t -= 1) * t * t * t;
}
com.haxepunk.utils.Ease.quartInOut = function(t) {
	return t <= .5?t * t * t * t * 8:(1 - (t = t * 2 - 2) * t * t * t) / 2 + .5;
}
com.haxepunk.utils.Ease.quintIn = function(t) {
	return t * t * t * t * t;
}
com.haxepunk.utils.Ease.quintOut = function(t) {
	return (t = t - 1) * t * t * t * t + 1;
}
com.haxepunk.utils.Ease.quintInOut = function(t) {
	return (t *= 2) < 1?t * t * t * t * t / 2:((t -= 2) * t * t * t * t + 2) / 2;
}
com.haxepunk.utils.Ease.sineIn = function(t) {
	return -Math.cos(com.haxepunk.utils.Ease.get_PI2() * t) + 1;
}
com.haxepunk.utils.Ease.sineOut = function(t) {
	return Math.sin(com.haxepunk.utils.Ease.get_PI2() * t);
}
com.haxepunk.utils.Ease.sineInOut = function(t) {
	return -Math.cos(com.haxepunk.utils.Ease.get_PI() * t) / 2 + .5;
}
com.haxepunk.utils.Ease.bounceIn = function(t) {
	t = 1 - t;
	if(t < 1 / 2.75) return 1 - 7.5625 * t * t;
	if(t < 2 / 2.75) return 1 - (7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + .75);
	if(t < 2.5 / 2.75) return 1 - (7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + .9375);
	return 1 - (7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + .984375);
}
com.haxepunk.utils.Ease.bounceOut = function(t) {
	if(t < 1 / 2.75) return 7.5625 * t * t;
	if(t < 2 / 2.75) return 7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + .75;
	if(t < 2.5 / 2.75) return 7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + .9375;
	return 7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + .984375;
}
com.haxepunk.utils.Ease.bounceInOut = function(t) {
	if(t < .5) {
		t = 1 - t * 2;
		if(t < 1 / 2.75) return (1 - 7.5625 * t * t) / 2;
		if(t < 2 / 2.75) return (1 - (7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + .75)) / 2;
		if(t < 2.5 / 2.75) return (1 - (7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + .9375)) / 2;
		return (1 - (7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + .984375)) / 2;
	}
	t = t * 2 - 1;
	if(t < 1 / 2.75) return 7.5625 * t * t / 2 + .5;
	if(t < 2 / 2.75) return (7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + .75) / 2 + .5;
	if(t < 2.5 / 2.75) return (7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + .9375) / 2 + .5;
	return (7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + .984375) / 2 + .5;
}
com.haxepunk.utils.Ease.circIn = function(t) {
	return -(Math.sqrt(1 - t * t) - 1);
}
com.haxepunk.utils.Ease.circOut = function(t) {
	return Math.sqrt(1 - (t - 1) * (t - 1));
}
com.haxepunk.utils.Ease.circInOut = function(t) {
	return t <= .5?(Math.sqrt(1 - t * t * 4) - 1) / -2:(Math.sqrt(1 - (t * 2 - 2) * (t * 2 - 2)) + 1) / 2;
}
com.haxepunk.utils.Ease.expoIn = function(t) {
	return Math.pow(2,10 * (t - 1));
}
com.haxepunk.utils.Ease.expoOut = function(t) {
	return -Math.pow(2,-10 * t) + 1;
}
com.haxepunk.utils.Ease.expoInOut = function(t) {
	return t < .5?Math.pow(2,10 * (t * 2 - 1)) / 2:(-Math.pow(2,-10 * (t * 2 - 1)) + 2) / 2;
}
com.haxepunk.utils.Ease.backIn = function(t) {
	return t * t * (2.70158 * t - 1.70158);
}
com.haxepunk.utils.Ease.backOut = function(t) {
	return 1 - --t * t * (-2.70158 * t - 1.70158);
}
com.haxepunk.utils.Ease.backInOut = function(t) {
	t *= 2;
	if(t < 1) return t * t * (2.70158 * t - 1.70158) / 2;
	t--;
	return (1 - --t * t * (-2.70158 * t - 1.70158)) / 2 + .5;
}
com.haxepunk.utils.Ease.get_PI = function() {
	return Math.PI;
}
com.haxepunk.utils.Ease.get_PI2 = function() {
	return Math.PI / 2;
}
com.haxepunk.utils.Ease.get_EL = function() {
	return 2 * com.haxepunk.utils.Ease.get_PI() / 0.45;
}
com.haxepunk.utils.HaxelibInfoBuilder = function() { }
$hxClasses["com.haxepunk.utils.HaxelibInfoBuilder"] = com.haxepunk.utils.HaxelibInfoBuilder;
com.haxepunk.utils.HaxelibInfoBuilder.__name__ = ["com","haxepunk","utils","HaxelibInfoBuilder"];
com.haxepunk.utils.HaxelibInfo = function() { }
$hxClasses["com.haxepunk.utils.HaxelibInfo"] = com.haxepunk.utils.HaxelibInfo;
com.haxepunk.utils.HaxelibInfo.__name__ = ["com","haxepunk","utils","HaxelibInfo"];
com.haxepunk.utils.Input = function() { }
$hxClasses["com.haxepunk.utils.Input"] = com.haxepunk.utils.Input;
com.haxepunk.utils.Input.__name__ = ["com","haxepunk","utils","Input"];
com.haxepunk.utils.Input.__properties__ = {get_joysticks:"get_joysticks",get_touches:"get_touches",get_mouseFlashY:"get_mouseFlashY",get_mouseFlashX:"get_mouseFlashX",get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",get_mouseWheelDelta:"get_mouseWheelDelta"}
com.haxepunk.utils.Input.get_mouseWheelDelta = function() {
	if(com.haxepunk.utils.Input.mouseWheel) {
		com.haxepunk.utils.Input.mouseWheel = false;
		return com.haxepunk.utils.Input._mouseWheelDelta;
	}
	return 0;
}
com.haxepunk.utils.Input.get_mouseX = function() {
	return com.haxepunk.HXP.screen.get_mouseX();
}
com.haxepunk.utils.Input.get_mouseY = function() {
	return com.haxepunk.HXP.screen.get_mouseY();
}
com.haxepunk.utils.Input.get_mouseFlashX = function() {
	return com.haxepunk.HXP.stage.get_mouseX() | 0;
}
com.haxepunk.utils.Input.get_mouseFlashY = function() {
	return com.haxepunk.HXP.stage.get_mouseY() | 0;
}
com.haxepunk.utils.Input.define = function(name,keys) {
	com.haxepunk.utils.Input._control.set(name,keys);
}
com.haxepunk.utils.Input.check = function(input) {
	if(js.Boot.__instanceof(input,String)) {
		var v = (function($this) {
			var $r;
			var key = input;
			$r = com.haxepunk.utils.Input._control.get(key);
			return $r;
		}(this)), i = v.length;
		while(i-- > 0) {
			if(v[i] < 0) {
				if(com.haxepunk.utils.Input._keyNum > 0) return true;
				continue;
			}
			if(com.haxepunk.utils.Input._key[v[i]] == true) return true;
		}
		return false;
	}
	return input < 0?com.haxepunk.utils.Input._keyNum > 0:com.haxepunk.utils.Input._key[input];
}
com.haxepunk.utils.Input.pressed = function(input) {
	if(js.Boot.__instanceof(input,String) && (function($this) {
		var $r;
		var key = input;
		$r = com.haxepunk.utils.Input._control.exists(key);
		return $r;
	}(this))) {
		var v = (function($this) {
			var $r;
			var key = input;
			$r = com.haxepunk.utils.Input._control.get(key);
			return $r;
		}(this)), i = v.length;
		while(i-- > 0) if(v[i] < 0?com.haxepunk.utils.Input._pressNum != 0:com.haxepunk.utils.Input._press.indexOf(v[i]) >= 0) return true;
		return false;
	}
	return input < 0?com.haxepunk.utils.Input._pressNum != 0:com.haxepunk.HXP.indexOf(com.haxepunk.utils.Input._press,input) >= 0;
}
com.haxepunk.utils.Input.released = function(input) {
	if(js.Boot.__instanceof(input,String)) {
		var v = (function($this) {
			var $r;
			var key = input;
			$r = com.haxepunk.utils.Input._control.get(key);
			return $r;
		}(this)), i = v.length;
		while(i-- > 0) if(v[i] < 0?com.haxepunk.utils.Input._releaseNum != 0:com.haxepunk.utils.Input._release.indexOf(v[i]) >= 0) return true;
		return false;
	}
	return input < 0?com.haxepunk.utils.Input._releaseNum != 0:com.haxepunk.HXP.indexOf(com.haxepunk.utils.Input._release,input) >= 0;
}
com.haxepunk.utils.Input.touchPoints = function(touchCallback) {
	var $it0 = com.haxepunk.utils.Input._touches.iterator();
	while( $it0.hasNext() ) {
		var touch = $it0.next();
		touchCallback(touch);
	}
}
com.haxepunk.utils.Input.get_touches = function() {
	return com.haxepunk.utils.Input._touches;
}
com.haxepunk.utils.Input.joystick = function(id) {
	var joy = com.haxepunk.utils.Input._joysticks.get(id);
	if(joy == null) {
		joy = new com.haxepunk.utils.Joystick();
		com.haxepunk.utils.Input._joysticks.set(id,joy);
	}
	return joy;
}
com.haxepunk.utils.Input.get_joysticks = function() {
	var count = 0;
	var $it0 = com.haxepunk.utils.Input._joysticks.iterator();
	while( $it0.hasNext() ) {
		var joystick = $it0.next();
		if(joystick.get_connected()) count += 1;
	}
	return count;
}
com.haxepunk.utils.Input.enable = function() {
	if(!com.haxepunk.utils.Input._enabled && com.haxepunk.HXP.stage != null) {
		com.haxepunk.HXP.stage.addEventListener(flash.events.KeyboardEvent.KEY_DOWN,com.haxepunk.utils.Input.onKeyDown,false,2);
		com.haxepunk.HXP.stage.addEventListener(flash.events.KeyboardEvent.KEY_UP,com.haxepunk.utils.Input.onKeyUp,false,2);
		com.haxepunk.HXP.stage.addEventListener(flash.events.MouseEvent.MOUSE_DOWN,com.haxepunk.utils.Input.onMouseDown,false,2);
		com.haxepunk.HXP.stage.addEventListener(flash.events.MouseEvent.MOUSE_UP,com.haxepunk.utils.Input.onMouseUp,false,2);
		com.haxepunk.HXP.stage.addEventListener(flash.events.MouseEvent.MOUSE_WHEEL,com.haxepunk.utils.Input.onMouseWheel,false,2);
		com.haxepunk.utils.Input.multiTouchSupported = flash.ui.Multitouch.get_supportsTouchEvents();
		if(com.haxepunk.utils.Input.multiTouchSupported) {
			flash.ui.Multitouch.set_inputMode(flash.ui.MultitouchInputMode.TOUCH_POINT);
			com.haxepunk.HXP.stage.addEventListener("touchBegin",com.haxepunk.utils.Input.onTouchBegin);
			com.haxepunk.HXP.stage.addEventListener("touchMove",com.haxepunk.utils.Input.onTouchMove);
			com.haxepunk.HXP.stage.addEventListener("touchEnd",com.haxepunk.utils.Input.onTouchEnd);
		}
	}
}
com.haxepunk.utils.Input.update = function() {
	while(com.haxepunk.utils.Input._pressNum-- > -1) com.haxepunk.utils.Input._press[com.haxepunk.utils.Input._pressNum] = -1;
	com.haxepunk.utils.Input._pressNum = 0;
	while(com.haxepunk.utils.Input._releaseNum-- > -1) com.haxepunk.utils.Input._release[com.haxepunk.utils.Input._releaseNum] = -1;
	com.haxepunk.utils.Input._releaseNum = 0;
	if(com.haxepunk.utils.Input.mousePressed) com.haxepunk.utils.Input.mousePressed = false;
	if(com.haxepunk.utils.Input.mouseReleased) com.haxepunk.utils.Input.mouseReleased = false;
	if(com.haxepunk.utils.Input.multiTouchSupported) {
		var $it0 = com.haxepunk.utils.Input._touches.iterator();
		while( $it0.hasNext() ) {
			var touch = $it0.next();
			touch.update();
		}
	}
}
com.haxepunk.utils.Input.onKeyDown = function(e) {
	var code = com.haxepunk.utils.Input.keyCode(e);
	if(code == -1) return;
	com.haxepunk.utils.Input.lastKey = code;
	if(code == 8) com.haxepunk.utils.Input.keyString = HxOverrides.substr(com.haxepunk.utils.Input.keyString,0,com.haxepunk.utils.Input.keyString.length - 1); else if(code > 47 && code < 58 || code > 64 && code < 91 || code == 32) {
		if(com.haxepunk.utils.Input.keyString.length > 100) com.haxepunk.utils.Input.keyString = HxOverrides.substr(com.haxepunk.utils.Input.keyString,1,null);
		var $char = String.fromCharCode(code);
		if(e.shiftKey != com.haxepunk.utils.Input.check(20)) $char = $char.toUpperCase(); else $char = $char.toLowerCase();
		com.haxepunk.utils.Input.keyString += $char;
	}
	if(!com.haxepunk.utils.Input._key[code]) {
		com.haxepunk.utils.Input._key[code] = true;
		com.haxepunk.utils.Input._keyNum++;
		com.haxepunk.utils.Input._press[com.haxepunk.utils.Input._pressNum++] = code;
	}
}
com.haxepunk.utils.Input.onKeyUp = function(e) {
	var code = com.haxepunk.utils.Input.keyCode(e);
	if(code == -1) return;
	if(com.haxepunk.utils.Input._key[code]) {
		com.haxepunk.utils.Input._key[code] = false;
		com.haxepunk.utils.Input._keyNum--;
		com.haxepunk.utils.Input._release[com.haxepunk.utils.Input._releaseNum++] = code;
	}
}
com.haxepunk.utils.Input.keyCode = function(e) {
	return e.keyCode;
}
com.haxepunk.utils.Input.onMouseDown = function(e) {
	if(!com.haxepunk.utils.Input.mouseDown) {
		com.haxepunk.utils.Input.mouseDown = true;
		com.haxepunk.utils.Input.mouseUp = false;
		com.haxepunk.utils.Input.mousePressed = true;
	}
}
com.haxepunk.utils.Input.onMouseUp = function(e) {
	com.haxepunk.utils.Input.mouseDown = false;
	com.haxepunk.utils.Input.mouseUp = true;
	com.haxepunk.utils.Input.mouseReleased = true;
}
com.haxepunk.utils.Input.onMouseWheel = function(e) {
	com.haxepunk.utils.Input.mouseWheel = true;
	com.haxepunk.utils.Input._mouseWheelDelta = e.delta;
}
com.haxepunk.utils.Input.onTouchBegin = function(e) {
	var touchPoint = new com.haxepunk.utils.Touch(e.stageX / com.haxepunk.HXP.screen.fullScaleX,e.stageY / com.haxepunk.HXP.screen.fullScaleY,e.touchPointID);
	com.haxepunk.utils.Input._touches.set(e.touchPointID,touchPoint);
	com.haxepunk.utils.Input._touchNum += 1;
}
com.haxepunk.utils.Input.onTouchMove = function(e) {
	var point = com.haxepunk.utils.Input._touches.get(e.touchPointID);
	point.x = e.stageX / com.haxepunk.HXP.screen.fullScaleX;
	point.y = e.stageY / com.haxepunk.HXP.screen.fullScaleY;
}
com.haxepunk.utils.Input.onTouchEnd = function(e) {
	com.haxepunk.utils.Input._touches.remove(e.touchPointID);
	com.haxepunk.utils.Input._touchNum -= 1;
}
com.haxepunk.utils.JoyButtonState = $hxClasses["com.haxepunk.utils.JoyButtonState"] = { __ename__ : true, __constructs__ : ["BUTTON_ON","BUTTON_OFF","BUTTON_PRESSED","BUTTON_RELEASED"] }
com.haxepunk.utils.JoyButtonState.BUTTON_ON = ["BUTTON_ON",0];
com.haxepunk.utils.JoyButtonState.BUTTON_ON.toString = $estr;
com.haxepunk.utils.JoyButtonState.BUTTON_ON.__enum__ = com.haxepunk.utils.JoyButtonState;
com.haxepunk.utils.JoyButtonState.BUTTON_OFF = ["BUTTON_OFF",1];
com.haxepunk.utils.JoyButtonState.BUTTON_OFF.toString = $estr;
com.haxepunk.utils.JoyButtonState.BUTTON_OFF.__enum__ = com.haxepunk.utils.JoyButtonState;
com.haxepunk.utils.JoyButtonState.BUTTON_PRESSED = ["BUTTON_PRESSED",2];
com.haxepunk.utils.JoyButtonState.BUTTON_PRESSED.toString = $estr;
com.haxepunk.utils.JoyButtonState.BUTTON_PRESSED.__enum__ = com.haxepunk.utils.JoyButtonState;
com.haxepunk.utils.JoyButtonState.BUTTON_RELEASED = ["BUTTON_RELEASED",3];
com.haxepunk.utils.JoyButtonState.BUTTON_RELEASED.toString = $estr;
com.haxepunk.utils.JoyButtonState.BUTTON_RELEASED.__enum__ = com.haxepunk.utils.JoyButtonState;
com.haxepunk.utils.Joystick = function() {
	this.buttons = new haxe.ds.IntMap();
	this.ball = new flash.geom.Point(0,0);
	this.axis = new Array();
	this.hat = new flash.geom.Point(0,0);
	this.set_connected(false);
	this._timeout = 0;
};
$hxClasses["com.haxepunk.utils.Joystick"] = com.haxepunk.utils.Joystick;
com.haxepunk.utils.Joystick.__name__ = ["com","haxepunk","utils","Joystick"];
com.haxepunk.utils.Joystick.prototype = {
	set_connected: function(value) {
		if(value) this._timeout = 3; else this._timeout = 0;
		return value;
	}
	,get_connected: function() {
		return this._timeout > 0;
	}
	,getAxis: function(a) {
		if(a < 0 || a >= this.axis.length) return 0; else return Math.abs(this.axis[a]) < 0.15?0:this.axis[a];
	}
	,check: function(button) {
		if(this.buttons.exists(button)) {
			var b = this.buttons.get(button);
			return b != com.haxepunk.utils.JoyButtonState.BUTTON_OFF && b != com.haxepunk.utils.JoyButtonState.BUTTON_RELEASED;
		}
		return false;
	}
	,released: function(button) {
		if(this.buttons.exists(button)) return this.buttons.get(button) == com.haxepunk.utils.JoyButtonState.BUTTON_RELEASED;
		return false;
	}
	,pressed: function(button) {
		if(this.buttons.exists(button)) return this.buttons.get(button) == com.haxepunk.utils.JoyButtonState.BUTTON_PRESSED;
		return false;
	}
	,update: function() {
		this._timeout -= com.haxepunk.HXP.elapsed;
		var $it0 = this.buttons.keys();
		while( $it0.hasNext() ) {
			var button = $it0.next();
			var _g = this.buttons.get(button);
			switch( (_g)[1] ) {
			case 2:
				this.buttons.set(button,com.haxepunk.utils.JoyButtonState.BUTTON_ON);
				break;
			case 3:
				this.buttons.set(button,com.haxepunk.utils.JoyButtonState.BUTTON_OFF);
				break;
			default:
			}
		}
	}
	,__class__: com.haxepunk.utils.Joystick
	,__properties__: {set_connected:"set_connected",get_connected:"get_connected"}
}
com.haxepunk.utils.OUYA_GAMEPAD = function() { }
$hxClasses["com.haxepunk.utils.OUYA_GAMEPAD"] = com.haxepunk.utils.OUYA_GAMEPAD;
com.haxepunk.utils.OUYA_GAMEPAD.__name__ = ["com","haxepunk","utils","OUYA_GAMEPAD"];
com.haxepunk.utils.XBOX_GAMEPAD = function() { }
$hxClasses["com.haxepunk.utils.XBOX_GAMEPAD"] = com.haxepunk.utils.XBOX_GAMEPAD;
com.haxepunk.utils.XBOX_GAMEPAD.__name__ = ["com","haxepunk","utils","XBOX_GAMEPAD"];
com.haxepunk.utils.PS3_GAMEPAD = function() { }
$hxClasses["com.haxepunk.utils.PS3_GAMEPAD"] = com.haxepunk.utils.PS3_GAMEPAD;
com.haxepunk.utils.PS3_GAMEPAD.__name__ = ["com","haxepunk","utils","PS3_GAMEPAD"];
com.haxepunk.utils.Key = function() { }
$hxClasses["com.haxepunk.utils.Key"] = com.haxepunk.utils.Key;
com.haxepunk.utils.Key.__name__ = ["com","haxepunk","utils","Key"];
com.haxepunk.utils.Key.nameOfKey = function($char) {
	if($char == -1) return "";
	if($char >= 65 && $char <= 90) return String.fromCharCode($char);
	if($char >= 112 && $char <= 126) return "F" + Std.string($char - 111);
	if($char >= 96 && $char <= 105) return "NUMPAD " + Std.string($char - 96);
	switch($char) {
	case 37:
		return "LEFT";
	case 38:
		return "UP";
	case 39:
		return "RIGHT";
	case 40:
		return "DOWN";
	case 219:
		return "{";
	case 221:
		return "}";
	case 192:
		return "~";
	case 13:
		return "ENTER";
	case 17:
		return "CONTROL";
	case 32:
		return "SPACE";
	case 16:
		return "SHIFT";
	case 8:
		return "BACKSPACE";
	case 20:
		return "CAPS LOCK";
	case 46:
		return "DELETE";
	case 35:
		return "END";
	case 27:
		return "ESCAPE";
	case 36:
		return "HOME";
	case 45:
		return "INSERT";
	case 9:
		return "TAB";
	case 34:
		return "PAGE DOWN";
	case 33:
		return "PAGE UP";
	case 107:
		return "NUMPAD ADD";
	case 110:
		return "NUMPAD DECIMAL";
	case 111:
		return "NUMPAD DIVIDE";
	case 108:
		return "NUMPAD ENTER";
	case 106:
		return "NUMPAD MULTIPLY";
	case 109:
		return "NUMPAD SUBTRACT";
	}
	return String.fromCharCode($char);
}
com.haxepunk.utils.Touch = function(x,y,id) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.time = 0;
};
$hxClasses["com.haxepunk.utils.Touch"] = com.haxepunk.utils.Touch;
com.haxepunk.utils.Touch.__name__ = ["com","haxepunk","utils","Touch"];
com.haxepunk.utils.Touch.prototype = {
	update: function() {
		this.time += com.haxepunk.HXP.elapsed;
	}
	,get_pressed: function() {
		return this.time == 0;
	}
	,get_sceneY: function() {
		return this.y + com.haxepunk.HXP.camera.y;
	}
	,get_sceneX: function() {
		return this.x + com.haxepunk.HXP.camera.x;
	}
	,__class__: com.haxepunk.utils.Touch
	,__properties__: {get_sceneX:"get_sceneX",get_sceneY:"get_sceneY",get_pressed:"get_pressed"}
}
flash._Lib = {}
flash._Lib.CursorType = $hxClasses["flash._Lib.CursorType"] = { __ename__ : true, __constructs__ : ["Pointer","Text","Default"] }
flash._Lib.CursorType.Pointer = ["Pointer",0];
flash._Lib.CursorType.Pointer.toString = $estr;
flash._Lib.CursorType.Pointer.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Text = ["Text",1];
flash._Lib.CursorType.Text.toString = $estr;
flash._Lib.CursorType.Text.__enum__ = flash._Lib.CursorType;
flash._Lib.CursorType.Default = ["Default",2];
flash._Lib.CursorType.Default.toString = $estr;
flash._Lib.CursorType.Default.__enum__ = flash._Lib.CursorType;
flash._Vector = {}
flash._Vector.Vector_Impl_ = function() { }
$hxClasses["flash._Vector.Vector_Impl_"] = flash._Vector.Vector_Impl_;
flash._Vector.Vector_Impl_.__name__ = ["flash","_Vector","Vector_Impl_"];
flash._Vector.Vector_Impl_.__properties__ = {set_fixed:"set_fixed",get_fixed:"get_fixed",set_length:"set_length",get_length:"get_length"}
flash._Vector.Vector_Impl_._new = function(length,fixed) {
	return new Array();
}
flash._Vector.Vector_Impl_.concat = function(this1,a) {
	return this1.concat(a);
}
flash._Vector.Vector_Impl_.copy = function(this1) {
	return this1.slice();
}
flash._Vector.Vector_Impl_.iterator = function(this1) {
	return HxOverrides.iter(this1);
}
flash._Vector.Vector_Impl_.join = function(this1,sep) {
	return this1.join(sep);
}
flash._Vector.Vector_Impl_.pop = function(this1) {
	return this1.pop();
}
flash._Vector.Vector_Impl_.push = function(this1,x) {
	return this1.push(x);
}
flash._Vector.Vector_Impl_.reverse = function(this1) {
	this1.reverse();
}
flash._Vector.Vector_Impl_.shift = function(this1) {
	return this1.shift();
}
flash._Vector.Vector_Impl_.unshift = function(this1,x) {
	this1.unshift(x);
}
flash._Vector.Vector_Impl_.slice = function(this1,pos,end) {
	return this1.slice(pos,end);
}
flash._Vector.Vector_Impl_.sort = function(this1,f) {
	this1.sort(f);
}
flash._Vector.Vector_Impl_.splice = function(this1,pos,len) {
	return this1.splice(pos,len);
}
flash._Vector.Vector_Impl_.toString = function(this1) {
	return this1.toString();
}
flash._Vector.Vector_Impl_.indexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var _g1 = from, _g = this1.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(this1[i] == x) return i;
	}
	return -1;
}
flash._Vector.Vector_Impl_.lastIndexOf = function(this1,x,from) {
	if(from == null) from = 0;
	var i = this1.length - 1;
	while(i >= from) {
		if(this1[i] == x) return i;
		i--;
	}
	return -1;
}
flash._Vector.Vector_Impl_.ofArray = function(a) {
	return flash._Vector.Vector_Impl_.concat(flash._Vector.Vector_Impl_._new(),a);
}
flash._Vector.Vector_Impl_.convert = function(v) {
	return v;
}
flash._Vector.Vector_Impl_.fromArray = function(a) {
	return a;
}
flash._Vector.Vector_Impl_.toArray = function(this1) {
	return this1;
}
flash._Vector.Vector_Impl_.get_length = function(this1) {
	return this1.length;
}
flash._Vector.Vector_Impl_.set_length = function(this1,value) {
	if(value < this1.length) this1 = this1.slice(0,value);
	while(value > this1.length) this1.push(null);
	return value;
}
flash._Vector.Vector_Impl_.get_fixed = function(this1) {
	return false;
}
flash._Vector.Vector_Impl_.set_fixed = function(this1,value) {
	return value;
}
flash.accessibility = {}
flash.accessibility.AccessibilityProperties = function() {
	this.description = "";
	this.forceSimple = false;
	this.name = "";
	this.noAutoLabeling = false;
	this.shortcut = "";
	this.silent = false;
};
$hxClasses["flash.accessibility.AccessibilityProperties"] = flash.accessibility.AccessibilityProperties;
flash.accessibility.AccessibilityProperties.__name__ = ["flash","accessibility","AccessibilityProperties"];
flash.accessibility.AccessibilityProperties.prototype = {
	__class__: flash.accessibility.AccessibilityProperties
}
flash.display.Bitmap = function(inBitmapData,inPixelSnapping,inSmoothing) {
	if(inSmoothing == null) inSmoothing = false;
	flash.display.DisplayObject.call(this);
	this.pixelSnapping = inPixelSnapping;
	this.smoothing = inSmoothing;
	if(inBitmapData != null) {
		this.set_bitmapData(inBitmapData);
		if(this.bitmapData.__referenceCount == 1) this.__graphics = new flash.display.Graphics(this.bitmapData.___textureBuffer);
	}
	if(this.pixelSnapping == null) this.pixelSnapping = flash.display.PixelSnapping.AUTO;
	if(this.__graphics == null) this.__graphics = new flash.display.Graphics();
	if(this.bitmapData != null) this.__render();
};
$hxClasses["flash.display.Bitmap"] = flash.display.Bitmap;
flash.display.Bitmap.__name__ = ["flash","display","Bitmap"];
flash.display.Bitmap.__super__ = flash.display.DisplayObject;
flash.display.Bitmap.prototype = $extend(flash.display.DisplayObject.prototype,{
	set_bitmapData: function(inBitmapData) {
		if(inBitmapData != this.bitmapData) {
			if(this.bitmapData != null) {
				this.bitmapData.__referenceCount--;
				if(this.__graphics.__surface == this.bitmapData.___textureBuffer) flash.Lib.__setSurfaceOpacity(this.bitmapData.___textureBuffer,0);
			}
			if(inBitmapData != null) inBitmapData.__referenceCount++;
		}
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		this.bitmapData = inBitmapData;
		return inBitmapData;
	}
	,__render: function(inMask,clipRect) {
		if(!this.__combinedVisible) return;
		if(this.bitmapData == null) return;
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if(this.bitmapData.___textureBuffer != this.__graphics.__surface) {
			var imageDataLease = this.bitmapData.__lease;
			if(imageDataLease != null && (this.__currentLease == null || imageDataLease.seed != this.__currentLease.seed || imageDataLease.time != this.__currentLease.time)) {
				var srcCanvas = this.bitmapData.___textureBuffer;
				this.__graphics.__surface.width = srcCanvas.width;
				this.__graphics.__surface.height = srcCanvas.height;
				this.__graphics.clear();
				flash.Lib.__drawToSurface(srcCanvas,this.__graphics.__surface);
				this.__currentLease = imageDataLease.clone();
				this.___renderFlags |= 64;
				if(this.parent != null) this.parent.___renderFlags |= 64;
				this.__applyFilters(this.__graphics.__surface);
				this.___renderFlags |= 32;
			}
		}
		if(inMask != null) {
			this.__applyFilters(this.__graphics.__surface);
			var m = this.getBitmapSurfaceTransform(this.__graphics);
			flash.Lib.__drawToSurface(this.__graphics.__surface,inMask,m,(this.parent != null?this.parent.__combinedAlpha:1) * this.alpha,clipRect,this.smoothing);
		} else {
			if((this.___renderFlags & 32) != 0) {
				var m = this.getBitmapSurfaceTransform(this.__graphics);
				flash.Lib.__setSurfaceTransform(this.__graphics.__surface,m);
				this.___renderFlags &= -33;
			}
			if(!this.__init) {
				flash.Lib.__setSurfaceOpacity(this.__graphics.__surface,0);
				this.__init = true;
			} else flash.Lib.__setSurfaceOpacity(this.__graphics.__surface,(this.parent != null?this.parent.__combinedAlpha:1) * this.alpha);
		}
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.bitmapData != null) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.get_width() / this.get_scaleX() || local.y > this.get_height() / this.get_scaleY()) return null; else return this;
		} else return flash.display.DisplayObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.DisplayObject.prototype.validateBounds.call(this);
			if(this.bitmapData != null) {
				var r = new flash.geom.Rectangle(0,0,this.bitmapData.get_width(),this.bitmapData.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.__boundsRect.width == 0 && this.__boundsRect.height == 0) this.__boundsRect = r.clone(); else this.__boundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.__boundsRect.width *= this.__scaleX;
				this.__boundsRect.height *= this.__scaleY;
				this.__width = this.__boundsRect.width;
				this.__height = this.__boundsRect.height;
			} else {
				this.__width = this.__boundsRect.width * this.__scaleX;
				this.__height = this.__boundsRect.height * this.__scaleY;
			}
		}
	}
	,toString: function() {
		return "[Bitmap name=" + this.name + " id=" + this.___id + "]";
	}
	,getBitmapSurfaceTransform: function(gfx) {
		var extent = gfx.__extentWithFilters;
		var fm = this.transform.__getFullMatrix(null);
		fm.__translateTransformed(extent.get_topLeft());
		return fm;
	}
	,__class__: flash.display.Bitmap
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{set_bitmapData:"set_bitmapData"})
});
flash.display.BitmapData = function(width,height,transparent,inFillColor) {
	if(inFillColor == null) inFillColor = -1;
	if(transparent == null) transparent = true;
	this.__locked = false;
	this.__referenceCount = 0;
	this.__leaseNum = 0;
	this.__lease = new flash.display.ImageDataLease();
	this.__lease.set(this.__leaseNum++,new Date().getTime());
	this.___textureBuffer = js.Browser.document.createElement("canvas");
	this.___textureBuffer.width = width;
	this.___textureBuffer.height = height;
	this.___id = flash.utils.Uuid.uuid();
	flash.Lib.__setSurfaceId(this.___textureBuffer,this.___id);
	this.__transparent = transparent;
	this.rect = new flash.geom.Rectangle(0,0,width,height);
	if(this.__transparent) {
		this.__transparentFiller = js.Browser.document.createElement("canvas");
		this.__transparentFiller.width = width;
		this.__transparentFiller.height = height;
		var ctx = this.__transparentFiller.getContext("2d");
		ctx.fillStyle = "rgba(0,0,0,0);";
		ctx.fill();
	}
	if(inFillColor != null && width > 0 && height > 0) {
		if(!this.__transparent) inFillColor |= -16777216;
		this.__initColor = inFillColor;
		this.__fillRect(this.rect,inFillColor);
	}
};
$hxClasses["flash.display.BitmapData"] = flash.display.BitmapData;
flash.display.BitmapData.__name__ = ["flash","display","BitmapData"];
flash.display.BitmapData.__interfaces__ = [flash.display.IBitmapDrawable];
flash.display.BitmapData.getRGBAPixels = function(bitmapData) {
	var p = bitmapData.getPixels(new flash.geom.Rectangle(0,0,bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.width:0,bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.height:0));
	var num = (bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.width:0) * (bitmapData.___textureBuffer != null?bitmapData.___textureBuffer.height:0);
	p.position = 0;
	var _g = 0;
	while(_g < num) {
		var i = _g++;
		var pos = p.position;
		var alpha = p.readByte();
		var red = p.readByte();
		var green = p.readByte();
		var blue = p.readByte();
		p.position = pos;
		p.writeByte(red);
		p.writeByte(green);
		p.writeByte(blue);
		p.writeByte(alpha);
	}
	return p;
}
flash.display.BitmapData.loadFromBase64 = function(base64,type,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	bitmapData.__loadFromBase64(base64,type,onload);
	return bitmapData;
}
flash.display.BitmapData.loadFromBytes = function(bytes,inRawAlpha,onload) {
	var bitmapData = new flash.display.BitmapData(0,0);
	bitmapData.__loadFromBytes(bytes,inRawAlpha,onload);
	return bitmapData;
}
flash.display.BitmapData.__base64Encode = function(bytes) {
	var blob = "";
	var codex = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	bytes.position = 0;
	while(bytes.position < bytes.length) {
		var by1 = 0, by2 = 0, by3 = 0;
		by1 = bytes.readByte();
		if(bytes.position < bytes.length) by2 = bytes.readByte();
		if(bytes.position < bytes.length) by3 = bytes.readByte();
		var by4 = 0, by5 = 0, by6 = 0, by7 = 0;
		by4 = by1 >> 2;
		by5 = (by1 & 3) << 4 | by2 >> 4;
		by6 = (by2 & 15) << 2 | by3 >> 6;
		by7 = by3 & 63;
		blob += codex.charAt(by4);
		blob += codex.charAt(by5);
		if(bytes.position < bytes.length) blob += codex.charAt(by6); else blob += "=";
		if(bytes.position < bytes.length) blob += codex.charAt(by7); else blob += "=";
	}
	return blob;
}
flash.display.BitmapData.__createFromHandle = function(inHandle) {
	var result = new flash.display.BitmapData(0,0);
	result.___textureBuffer = inHandle;
	return result;
}
flash.display.BitmapData.__isJPG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 255 && bytes.readByte() == 216;
}
flash.display.BitmapData.__isPNG = function(bytes) {
	bytes.position = 0;
	return bytes.readByte() == 137 && bytes.readByte() == 80 && bytes.readByte() == 78 && bytes.readByte() == 71 && bytes.readByte() == 13 && bytes.readByte() == 10 && bytes.readByte() == 26 && bytes.readByte() == 10;
}
flash.display.BitmapData.prototype = {
	get_width: function() {
		if(this.___textureBuffer != null) return this.___textureBuffer.width; else return 0;
	}
	,get_transparent: function() {
		return this.__transparent;
	}
	,get_height: function() {
		if(this.___textureBuffer != null) return this.___textureBuffer.height; else return 0;
	}
	,__onLoad: function(data,e) {
		var canvas = data.texture;
		var width = data.image.width;
		var height = data.image.height;
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(data.image,0,0,width,height);
		data.bitmapData.width = width;
		data.bitmapData.height = height;
		data.bitmapData.rect = new flash.geom.Rectangle(0,0,width,height);
		data.bitmapData.__buildLease();
		if(data.inLoader != null) {
			var e1 = new flash.events.Event(flash.events.Event.COMPLETE);
			e1.target = data.inLoader;
			data.inLoader.dispatchEvent(e1);
		}
	}
	,__loadFromFile: function(inFilename,inLoader) {
		var _g = this;
		var image = js.Browser.document.createElement("img");
		if(inLoader != null) {
			var data = { image : image, texture : this.___textureBuffer, inLoader : inLoader, bitmapData : this};
			image.addEventListener("load",(function(f,a1) {
				return function(e) {
					return f(a1,e);
				};
			})($bind(this,this.__onLoad),data),false);
			image.addEventListener("error",function(e) {
				if(!image.complete) _g.__onLoad(data,e);
			},false);
		}
		image.src = inFilename;
		if(image.complete) {
		}
	}
	,__incrNumRefBitmaps: function() {
		this.__assignedBitmaps++;
	}
	,__getNumRefBitmaps: function() {
		return this.__assignedBitmaps;
	}
	,__loadFromBytes: function(bytes,inRawAlpha,onload) {
		var _g = this;
		var type = "";
		if(flash.display.BitmapData.__isPNG(bytes)) type = "image/png"; else if(flash.display.BitmapData.__isJPG(bytes)) type = "image/jpeg"; else throw new flash.errors.IOError("BitmapData tried to read a PNG/JPG ByteArray, but found an invalid header.");
		if(inRawAlpha != null) this.__loadFromBase64(flash.display.BitmapData.__base64Encode(bytes),type,function(_) {
			var ctx = _g.___textureBuffer.getContext("2d");
			var pixels = ctx.getImageData(0,0,_g.___textureBuffer.width,_g.___textureBuffer.height);
			var _g2 = 0, _g1 = inRawAlpha.length;
			while(_g2 < _g1) {
				var i = _g2++;
				pixels.data[i * 4 + 3] = inRawAlpha.readUnsignedByte();
			}
			ctx.putImageData(pixels,0,0);
			if(onload != null) onload(_g);
		}); else this.__loadFromBase64(flash.display.BitmapData.__base64Encode(bytes),type,onload);
	}
	,__loadFromBase64: function(base64,type,onload) {
		var _g = this;
		var img = js.Browser.document.createElement("img");
		var canvas = this.___textureBuffer;
		var drawImage = function(_) {
			canvas.width = img.width;
			canvas.height = img.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img,0,0);
			_g.rect = new flash.geom.Rectangle(0,0,canvas.width,canvas.height);
			if(onload != null) onload(_g);
		};
		img.addEventListener("load",drawImage,false);
		img.src = "data:" + type + ";base64," + base64;
	}
	,__getLease: function() {
		return this.__lease;
	}
	,__fillRect: function(rect,color) {
		this.__lease.set(this.__leaseNum++,new Date().getTime());
		var ctx = this.___textureBuffer.getContext("2d");
		var r = (color & 16711680) >>> 16;
		var g = (color & 65280) >>> 8;
		var b = color & 255;
		var a = this.__transparent?color >>> 24:255;
		if(!this.__locked) {
			var style = "rgba(" + r + ", " + g + ", " + b + ", " + a / 255 + ")";
			ctx.fillStyle = style;
			ctx.fillRect(rect.x,rect.y,rect.width,rect.height);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.__imageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.__imageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.__imageData.data[s + offsetX] = r;
					this.__imageData.data[s + offsetX + 1] = g;
					this.__imageData.data[s + offsetX + 2] = b;
					this.__imageData.data[s + offsetX + 3] = a;
				}
			}
			this.__imageDataChanged = true;
		}
	}
	,__decrNumRefBitmaps: function() {
		this.__assignedBitmaps--;
	}
	,__clearCanvas: function() {
		var ctx = this.___textureBuffer.getContext("2d");
		ctx.clearRect(0,0,this.___textureBuffer.width,this.___textureBuffer.height);
	}
	,__buildLease: function() {
		this.__lease.set(this.__leaseNum++,new Date().getTime());
	}
	,unlock: function(changeRect) {
		this.__locked = false;
		var ctx = this.___textureBuffer.getContext("2d");
		if(this.__imageDataChanged) {
			if(changeRect != null) ctx.putImageData(this.__imageData,0,0,changeRect.x,changeRect.y,changeRect.width,changeRect.height); else ctx.putImageData(this.__imageData,0,0);
		}
		var _g = 0, _g1 = this.__copyPixelList;
		while(_g < _g1.length) {
			var copyCache = _g1[_g];
			++_g;
			if(this.__transparent && copyCache.transparentFiller != null) {
				var trpCtx = copyCache.transparentFiller.getContext("2d");
				var trpData = trpCtx.getImageData(copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight);
				ctx.putImageData(trpData,copyCache.destX,copyCache.destY);
			}
			ctx.drawImage(copyCache.handle,copyCache.sourceX,copyCache.sourceY,copyCache.sourceWidth,copyCache.sourceHeight,copyCache.destX,copyCache.destY,copyCache.sourceWidth,copyCache.sourceHeight);
		}
		this.__lease.set(this.__leaseNum++,new Date().getTime());
	}
	,threshold: function(sourceBitmapData,sourceRect,destPoint,operation,threshold,color,mask,copySource) {
		if(copySource == null) copySource = false;
		if(mask == null) mask = -1;
		if(color == null) color = 0;
		haxe.Log.trace("BitmapData.threshold not implemented",{ fileName : "BitmapData.hx", lineNumber : 1164, className : "flash.display.BitmapData", methodName : "threshold"});
		return 0;
	}
	,setPixels: function(rect,byteArray) {
		rect = this.clipRect(rect);
		if(rect == null) return;
		var len = Math.round(4 * rect.width * rect.height);
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.createImageData(rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				imageData.data[i] = byteArray.readByte();
			}
			ctx.putImageData(imageData,rect.x,rect.y);
		} else {
			var offset = Math.round(4 * this.__imageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.__imageData.width * 4) > boundR - 1) pos += this.__imageData.width * 4 - boundR;
				this.__imageData.data[pos] = byteArray.readByte();
				pos++;
			}
			this.__imageDataChanged = true;
		}
	}
	,setPixel32: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return;
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.__transparent) imageData.data[3] = (color & -16777216) >>> 24; else imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.__imageData.width + x * 4;
			this.__imageData.data[offset] = (color & 16711680) >>> 16;
			this.__imageData.data[offset + 1] = (color & 65280) >>> 8;
			this.__imageData.data[offset + 2] = color & 255;
			if(this.__transparent) this.__imageData.data[offset + 3] = (color & -16777216) >>> 24; else this.__imageData.data[offset + 3] = 255;
			this.__imageDataChanged = true;
		}
	}
	,setPixel: function(x,y,color) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return;
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.createImageData(1,1);
			imageData.data[0] = (color & 16711680) >>> 16;
			imageData.data[1] = (color & 65280) >>> 8;
			imageData.data[2] = color & 255;
			if(this.__transparent) imageData.data[3] = 255;
			ctx.putImageData(imageData,x,y);
		} else {
			var offset = 4 * y * this.__imageData.width + x * 4;
			this.__imageData.data[offset] = (color & 16711680) >>> 16;
			this.__imageData.data[offset + 1] = (color & 65280) >>> 8;
			this.__imageData.data[offset + 2] = color & 255;
			if(this.__transparent) this.__imageData.data[offset + 3] = 255;
			this.__imageDataChanged = true;
		}
	}
	,scroll: function(x,y) {
		throw "bitmapData.scroll is currently not supported for HTML5";
	}
	,noise: function(randomSeed,low,high,channelOptions,grayScale) {
		if(grayScale == null) grayScale = false;
		if(channelOptions == null) channelOptions = 7;
		if(high == null) high = 255;
		if(low == null) low = 0;
		var generator = new flash.display._BitmapData.MinstdGenerator(randomSeed);
		var ctx = this.___textureBuffer.getContext("2d");
		var imageData = null;
		if(this.__locked) imageData = this.__imageData; else imageData = ctx.createImageData(this.___textureBuffer.width,this.___textureBuffer.height);
		var _g1 = 0, _g = this.___textureBuffer.width * this.___textureBuffer.height;
		while(_g1 < _g) {
			var i = _g1++;
			if(grayScale) imageData.data[i * 4] = imageData.data[i * 4 + 1] = imageData.data[i * 4 + 2] = low + generator.nextValue() % (high - low + 1); else {
				imageData.data[i * 4] = (channelOptions & 1) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 1] = (channelOptions & 2) == 0?0:low + generator.nextValue() % (high - low + 1);
				imageData.data[i * 4 + 2] = (channelOptions & 4) == 0?0:low + generator.nextValue() % (high - low + 1);
			}
			imageData.data[i * 4 + 3] = (channelOptions & 8) == 0?255:low + generator.nextValue() % (high - low + 1);
		}
		if(this.__locked) this.__imageDataChanged = true; else ctx.putImageData(imageData,0,0);
	}
	,lock: function() {
		this.__locked = true;
		var ctx = this.___textureBuffer.getContext("2d");
		this.__imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
		this.__imageDataChanged = false;
		this.__copyPixelList = [];
	}
	,hitTest: function(firstPoint,firstAlphaThreshold,secondObject,secondBitmapDataPoint,secondAlphaThreshold) {
		if(secondAlphaThreshold == null) secondAlphaThreshold = 1;
		var type = Type.getClassName(Type.getClass(secondObject));
		firstAlphaThreshold = firstAlphaThreshold & -1;
		var me = this;
		var doHitTest = function(imageData) {
			if(secondObject.__proto__ == null || secondObject.__proto__.__class__ == null || secondObject.__proto__.__class__.__name__ == null) return false;
			var _g = secondObject.__proto__.__class__.__name__[2];
			switch(_g) {
			case "Rectangle":
				var rect = secondObject;
				rect.x -= firstPoint.x;
				rect.y -= firstPoint.y;
				rect = me.clipRect(me.rect);
				if(me.rect == null) return false;
				var boundingBox = new flash.geom.Rectangle(0,0,me.___textureBuffer != null?me.___textureBuffer.width:0,me.___textureBuffer != null?me.___textureBuffer.height:0);
				if(!rect.intersects(boundingBox)) return false;
				var diff = rect.intersection(boundingBox);
				var offset = 4 * (Math.round(diff.x) + Math.round(diff.y) * imageData.width) + 3;
				var pos = offset;
				var boundR = Math.round(4 * (diff.x + diff.width));
				while(pos < offset + Math.round(4 * (diff.width + imageData.width * diff.height))) {
					if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
					if(imageData.data[pos] - firstAlphaThreshold >= 0) return true;
					pos += 4;
				}
				return false;
			case "Point":
				var point = secondObject;
				var x = point.x - firstPoint.x;
				var y = point.y - firstPoint.y;
				if(x < 0 || y < 0 || x >= (me.___textureBuffer != null?me.___textureBuffer.width:0) || y >= (me.___textureBuffer != null?me.___textureBuffer.height:0)) return false;
				if(imageData.data[Math.round(4 * (y * (me.___textureBuffer != null?me.___textureBuffer.width:0) + x)) + 3] - firstAlphaThreshold > 0) return true;
				return false;
			case "Bitmap":
				throw "bitmapData.hitTest with a second object of type Bitmap is currently not supported for HTML5";
				return false;
			case "BitmapData":
				throw "bitmapData.hitTest with a second object of type BitmapData is currently not supported for HTML5";
				return false;
			default:
				throw "BitmapData::hitTest secondObject argument must be either a Rectangle, a Point, a Bitmap or a BitmapData object.";
				return false;
			}
		};
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
			return doHitTest(imageData);
		} else return doHitTest(this.__imageData);
	}
	,handle: function() {
		return this.___textureBuffer;
	}
	,getPixels: function(rect) {
		var len = Math.round(4 * rect.width * rect.height);
		var byteArray = new flash.utils.ByteArray();
		if(byteArray.allocated < len) byteArray.___resizeBuffer(byteArray.allocated = Math.max(len,byteArray.allocated * 2) | 0); else if(byteArray.allocated > len) byteArray.___resizeBuffer(byteArray.allocated = len);
		byteArray.length = len;
		len;
		rect = this.clipRect(rect);
		if(rect == null) return byteArray;
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				byteArray.writeByte(imagedata.data[i]);
			}
		} else {
			var offset = Math.round(4 * this.__imageData.width * rect.y + rect.x * 4);
			var pos = offset;
			var boundR = Math.round(4 * (rect.x + rect.width));
			var _g = 0;
			while(_g < len) {
				var i = _g++;
				if(pos % (this.__imageData.width * 4) > boundR - 1) pos += this.__imageData.width * 4 - boundR;
				byteArray.writeByte(this.__imageData.data[pos]);
				pos++;
			}
		}
		byteArray.position = 0;
		return byteArray;
	}
	,getPixel32: function(x,y) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return 0;
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			return this.getInt32(0,ctx.getImageData(x,y,1,1).data);
		} else return this.getInt32(4 * y * this.___textureBuffer.width + x * 4,this.__imageData.data);
	}
	,getPixel: function(x,y) {
		if(x < 0 || y < 0 || x >= (this.___textureBuffer != null?this.___textureBuffer.width:0) || y >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) return 0;
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(x,y,1,1);
			return imagedata.data[0] << 16 | imagedata.data[1] << 8 | imagedata.data[2];
		} else {
			var offset = 4 * y * (this.___textureBuffer != null?this.___textureBuffer.width:0) + x * 4;
			return this.__imageData.data[offset] << 16 | this.__imageData.data[offset + 1] << 8 | this.__imageData.data[offset + 2];
		}
	}
	,getInt32: function(offset,data) {
		return (this.__transparent?data[offset + 3]:255) << 24 | data[offset] << 16 | data[offset + 1] << 8 | data[offset + 2];
	}
	,getColorBoundsRect: function(mask,color,findColor) {
		if(findColor == null) findColor = true;
		var me = this;
		var doGetColorBoundsRect = function(data) {
			var minX = me.___textureBuffer != null?me.___textureBuffer.width:0, maxX = 0, minY = me.___textureBuffer != null?me.___textureBuffer.height:0, maxY = 0, i = 0;
			while(i < data.length) {
				var value = me.getInt32(i,data);
				if(findColor) {
					if((value & mask) == color) {
						var x = Math.round(i % ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4) / 4);
						var y = Math.round(i / ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4));
						if(x < minX) minX = x;
						if(x > maxX) maxX = x;
						if(y < minY) minY = y;
						if(y > maxY) maxY = y;
					}
				} else if((value & mask) != color) {
					var x = Math.round(i % ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4) / 4);
					var y = Math.round(i / ((me.___textureBuffer != null?me.___textureBuffer.width:0) * 4));
					if(x < minX) minX = x;
					if(x > maxX) maxX = x;
					if(y < minY) minY = y;
					if(y > maxY) maxY = y;
				}
				i += 4;
			}
			if(minX < maxX && minY < maxY) return new flash.geom.Rectangle(minX,minY,maxX - minX + 1,maxY - minY); else return new flash.geom.Rectangle(0,0,me.___textureBuffer != null?me.___textureBuffer.width:0,me.___textureBuffer != null?me.___textureBuffer.height:0);
		};
		if(!this.__locked) {
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
			return doGetColorBoundsRect(imageData.data);
		} else return doGetColorBoundsRect(this.__imageData.data);
	}
	,floodFill: function(x,y,color) {
		var wasLocked = this.__locked;
		if(!this.__locked) this.lock();
		var queue = new Array();
		queue.push(new flash.geom.Point(x,y));
		var old = this.getPixel32(x,y);
		var iterations = 0;
		var search = new Array();
		var _g1 = 0, _g = (this.___textureBuffer != null?this.___textureBuffer.width:0) + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var column = new Array();
			var _g3 = 0, _g2 = (this.___textureBuffer != null?this.___textureBuffer.height:0) + 1;
			while(_g3 < _g2) {
				var i1 = _g3++;
				column.push(false);
			}
			search.push(column);
		}
		var currPoint, newPoint;
		while(queue.length > 0) {
			currPoint = queue.shift();
			++iterations;
			var x1 = currPoint.x | 0;
			var y1 = currPoint.y | 0;
			if(x1 < 0 || x1 >= (this.___textureBuffer != null?this.___textureBuffer.width:0)) continue;
			if(y1 < 0 || y1 >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) continue;
			search[x1][y1] = true;
			if(this.getPixel32(x1,y1) == old) {
				this.setPixel32(x1,y1,color);
				if(!search[x1 + 1][y1]) queue.push(new flash.geom.Point(x1 + 1,y1));
				if(!search[x1][y1 + 1]) queue.push(new flash.geom.Point(x1,y1 + 1));
				if(x1 > 0 && !search[x1 - 1][y1]) queue.push(new flash.geom.Point(x1 - 1,y1));
				if(y1 > 0 && !search[x1][y1 - 1]) queue.push(new flash.geom.Point(x1,y1 - 1));
			}
		}
		if(!wasLocked) this.unlock();
	}
	,fillRect: function(rect,color) {
		if(rect == null) return;
		if(rect.width <= 0 || rect.height <= 0) return;
		if(rect.x == 0 && rect.y == 0 && rect.width == this.___textureBuffer.width && rect.height == this.___textureBuffer.height) {
			if(this.__transparent) {
				if(color >>> 24 == 0 || color == this.__initColor) return this.__clearCanvas();
			} else if((color | -16777216) == (this.__initColor | -16777216)) return this.__clearCanvas();
		}
		return this.__fillRect(rect,color);
	}
	,drawToSurface: function(inSurface,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		this.__lease.set(this.__leaseNum++,new Date().getTime());
		var ctx = inSurface.getContext("2d");
		if(matrix != null) {
			ctx.save();
			if(matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1) ctx.translate(matrix.tx,matrix.ty); else {
				flash.Lib.__setImageSmoothing(ctx,smoothing);
				ctx.setTransform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
			}
			ctx.drawImage(this.___textureBuffer,0,0);
			ctx.restore();
		} else ctx.drawImage(this.___textureBuffer,0,0);
		if(inColorTransform != null) this.colorTransform(new flash.geom.Rectangle(0,0,this.___textureBuffer.width,this.___textureBuffer.height),inColorTransform);
	}
	,draw: function(source,matrix,inColorTransform,blendMode,clipRect,smoothing) {
		if(smoothing == null) smoothing = false;
		this.__lease.set(this.__leaseNum++,new Date().getTime());
		source.drawToSurface(this.___textureBuffer,matrix,inColorTransform,blendMode,clipRect,smoothing);
		if(inColorTransform != null) {
			var rect = new flash.geom.Rectangle();
			var object = source;
			rect.x = matrix != null?matrix.tx:0;
			rect.y = matrix != null?matrix.ty:0;
			try {
				rect.width = Reflect.getProperty(source,"width");
				rect.height = Reflect.getProperty(source,"height");
			} catch( e ) {
				rect.width = this.___textureBuffer.width;
				rect.height = this.___textureBuffer.height;
			}
			this.colorTransform(rect,inColorTransform);
		}
	}
	,dispose: function() {
		this.__clearCanvas();
		this.___textureBuffer = null;
		this.__leaseNum = 0;
		this.__lease = null;
		this.__imageData = null;
	}
	,destroy: function() {
		this.___textureBuffer = null;
	}
	,copyPixels: function(sourceBitmapData,sourceRect,destPoint,alphaBitmapData,alphaPoint,mergeAlpha) {
		if(mergeAlpha == null) mergeAlpha = false;
		if(sourceBitmapData.___textureBuffer == null || this.___textureBuffer == null || sourceBitmapData.___textureBuffer.width == 0 || sourceBitmapData.___textureBuffer.height == 0 || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData.___textureBuffer.width) sourceRect.width = sourceBitmapData.___textureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData.___textureBuffer.height) sourceRect.height = sourceBitmapData.___textureBuffer.height - sourceRect.y;
		if(alphaBitmapData != null && alphaBitmapData.__transparent) {
			if(alphaPoint == null) alphaPoint = new flash.geom.Point();
			var bitmapData = new flash.display.BitmapData(sourceBitmapData.___textureBuffer != null?sourceBitmapData.___textureBuffer.width:0,sourceBitmapData.___textureBuffer != null?sourceBitmapData.___textureBuffer.height:0,true);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point(sourceRect.x,sourceRect.y));
			bitmapData.copyChannel(alphaBitmapData,new flash.geom.Rectangle(alphaPoint.x,alphaPoint.y,sourceRect.width,sourceRect.height),new flash.geom.Point(sourceRect.x,sourceRect.y),8,8);
			sourceBitmapData = bitmapData;
		}
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			if(!mergeAlpha) {
				if(this.__transparent && sourceBitmapData.__transparent) {
					var trpCtx = sourceBitmapData.__transparentFiller.getContext("2d");
					var trpData = trpCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
					ctx.putImageData(trpData,destPoint.x,destPoint.y);
				}
			}
			ctx.drawImage(sourceBitmapData.___textureBuffer,sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destPoint.x,destPoint.y,sourceRect.width,sourceRect.height);
		} else this.__copyPixelList[this.__copyPixelList.length] = { handle : sourceBitmapData.___textureBuffer, transparentFiller : mergeAlpha?null:sourceBitmapData.__transparentFiller, sourceX : sourceRect.x, sourceY : sourceRect.y, sourceWidth : sourceRect.width, sourceHeight : sourceRect.height, destX : destPoint.x, destY : destPoint.y};
	}
	,copyChannel: function(sourceBitmapData,sourceRect,destPoint,sourceChannel,destChannel) {
		this.rect = this.clipRect(this.rect);
		if(this.rect == null) return;
		if(destChannel == 8 && !this.__transparent) return;
		if(sourceBitmapData.___textureBuffer == null || this.___textureBuffer == null || sourceRect.width <= 0 || sourceRect.height <= 0) return;
		if(sourceRect.x + sourceRect.width > sourceBitmapData.___textureBuffer.width) sourceRect.width = sourceBitmapData.___textureBuffer.width - sourceRect.x;
		if(sourceRect.y + sourceRect.height > sourceBitmapData.___textureBuffer.height) sourceRect.height = sourceBitmapData.___textureBuffer.height - sourceRect.y;
		var doChannelCopy = function(imageData) {
			var srcCtx = sourceBitmapData.___textureBuffer.getContext("2d");
			var srcImageData = srcCtx.getImageData(sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height);
			var destIdx = -1;
			if(destChannel == 8) destIdx = 3; else if(destChannel == 4) destIdx = 2; else if(destChannel == 2) destIdx = 1; else if(destChannel == 1) destIdx = 0; else throw "Invalid destination BitmapDataChannel passed to BitmapData::copyChannel.";
			var pos = 4 * (Math.round(destPoint.x) + Math.round(destPoint.y) * imageData.width) + destIdx;
			var boundR = Math.round(4 * (destPoint.x + sourceRect.width));
			var setPos = function(val) {
				if(pos % (imageData.width * 4) > boundR - 1) pos += imageData.width * 4 - boundR;
				imageData.data[pos] = val;
				pos += 4;
			};
			var srcIdx = -1;
			if(sourceChannel == 8) srcIdx = 3; else if(sourceChannel == 4) srcIdx = 2; else if(sourceChannel == 2) srcIdx = 1; else if(sourceChannel == 1) srcIdx = 0; else throw "Invalid source BitmapDataChannel passed to BitmapData::copyChannel.";
			while(srcIdx < srcImageData.data.length) {
				setPos(srcImageData.data[srcIdx]);
				srcIdx += 4;
			}
		};
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imageData = ctx.getImageData(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
			doChannelCopy(imageData);
			ctx.putImageData(imageData,0,0);
		} else {
			doChannelCopy(this.__imageData);
			this.__imageDataChanged = true;
		}
	}
	,compare: function(inBitmapTexture) {
		throw "bitmapData.compare is currently not supported for HTML5";
		return 0;
	}
	,colorTransform: function(rect,colorTransform) {
		if(rect == null) return;
		rect = this.clipRect(rect);
		if(!this.__locked) {
			this.__lease.set(this.__leaseNum++,new Date().getTime());
			var ctx = this.___textureBuffer.getContext("2d");
			var imagedata = ctx.getImageData(rect.x,rect.y,rect.width,rect.height);
			var offsetX;
			var _g1 = 0, _g = imagedata.data.length >> 2;
			while(_g1 < _g) {
				var i = _g1++;
				offsetX = i * 4;
				imagedata.data[offsetX] = imagedata.data[offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
				imagedata.data[offsetX + 1] = imagedata.data[offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
				imagedata.data[offsetX + 2] = imagedata.data[offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
				imagedata.data[offsetX + 3] = imagedata.data[offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
			}
			ctx.putImageData(imagedata,rect.x,rect.y);
		} else {
			var s = 4 * (Math.round(rect.x) + Math.round(rect.y) * this.__imageData.width);
			var offsetY;
			var offsetX;
			var _g1 = 0, _g = Math.round(rect.height);
			while(_g1 < _g) {
				var i = _g1++;
				offsetY = i * this.__imageData.width;
				var _g3 = 0, _g2 = Math.round(rect.width);
				while(_g3 < _g2) {
					var j = _g3++;
					offsetX = 4 * (j + offsetY);
					this.__imageData.data[s + offsetX] = this.__imageData.data[s + offsetX] * colorTransform.redMultiplier + colorTransform.redOffset | 0;
					this.__imageData.data[s + offsetX + 1] = this.__imageData.data[s + offsetX + 1] * colorTransform.greenMultiplier + colorTransform.greenOffset | 0;
					this.__imageData.data[s + offsetX + 2] = this.__imageData.data[s + offsetX + 2] * colorTransform.blueMultiplier + colorTransform.blueOffset | 0;
					this.__imageData.data[s + offsetX + 3] = this.__imageData.data[s + offsetX + 3] * colorTransform.alphaMultiplier + colorTransform.alphaOffset | 0;
				}
			}
			this.__imageDataChanged = true;
		}
	}
	,clone: function() {
		var bitmapData = new flash.display.BitmapData(this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0,this.__transparent);
		var rect = new flash.geom.Rectangle(0,0,this.___textureBuffer != null?this.___textureBuffer.width:0,this.___textureBuffer != null?this.___textureBuffer.height:0);
		bitmapData.setPixels(rect,this.getPixels(rect));
		bitmapData.__lease.set(bitmapData.__leaseNum++,new Date().getTime());
		return bitmapData;
	}
	,clipRect: function(r) {
		if(r.x < 0) {
			r.width -= -r.x;
			r.x = 0;
			if(r.x + r.width <= 0) return null;
		}
		if(r.y < 0) {
			r.height -= -r.y;
			r.y = 0;
			if(r.y + r.height <= 0) return null;
		}
		if(r.x + r.width >= (this.___textureBuffer != null?this.___textureBuffer.width:0)) {
			r.width -= r.x + r.width - (this.___textureBuffer != null?this.___textureBuffer.width:0);
			if(r.width <= 0) return null;
		}
		if(r.y + r.height >= (this.___textureBuffer != null?this.___textureBuffer.height:0)) {
			r.height -= r.y + r.height - (this.___textureBuffer != null?this.___textureBuffer.height:0);
			if(r.height <= 0) return null;
		}
		return r;
	}
	,clear: function(color) {
		this.fillRect(this.rect,color);
	}
	,applyFilter: function(sourceBitmapData,sourceRect,destPoint,filter) {
		if(sourceBitmapData == this && sourceRect.x == destPoint.x && sourceRect.y == destPoint.y) filter.__applyFilter(this.___textureBuffer,sourceRect); else {
			var bitmapData = new flash.display.BitmapData(sourceRect.width | 0,sourceRect.height | 0);
			bitmapData.copyPixels(sourceBitmapData,sourceRect,new flash.geom.Point());
			filter.__applyFilter(bitmapData.___textureBuffer);
			this.copyPixels(bitmapData,bitmapData.rect,destPoint);
		}
	}
	,__class__: flash.display.BitmapData
	,__properties__: {get_height:"get_height",get_transparent:"get_transparent",get_width:"get_width"}
}
flash.display.ImageDataLease = function() {
};
$hxClasses["flash.display.ImageDataLease"] = flash.display.ImageDataLease;
flash.display.ImageDataLease.__name__ = ["flash","display","ImageDataLease"];
flash.display.ImageDataLease.prototype = {
	set: function(s,t) {
		this.seed = s;
		this.time = t;
	}
	,clone: function() {
		var leaseClone = new flash.display.ImageDataLease();
		leaseClone.seed = this.seed;
		leaseClone.time = this.time;
		return leaseClone;
	}
	,__class__: flash.display.ImageDataLease
}
flash.display._BitmapData = {}
flash.display._BitmapData.MinstdGenerator = function(seed) {
	if(seed == 0) this.value = 1; else this.value = seed;
};
$hxClasses["flash.display._BitmapData.MinstdGenerator"] = flash.display._BitmapData.MinstdGenerator;
flash.display._BitmapData.MinstdGenerator.__name__ = ["flash","display","_BitmapData","MinstdGenerator"];
flash.display._BitmapData.MinstdGenerator.prototype = {
	nextValue: function() {
		var lo = 16807 * (this.value & 65535);
		var hi = 16807 * (this.value >>> 16);
		lo += (hi & 32767) << 16;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		lo += hi >>> 15;
		if(lo < 0 || lo > -2147483648 - 1) {
			lo &= -2147483648 - 1;
			++lo;
		}
		return this.value = lo;
	}
	,__class__: flash.display._BitmapData.MinstdGenerator
}
flash.display.BitmapDataChannel = function() { }
$hxClasses["flash.display.BitmapDataChannel"] = flash.display.BitmapDataChannel;
flash.display.BitmapDataChannel.__name__ = ["flash","display","BitmapDataChannel"];
flash.display.BlendMode = $hxClasses["flash.display.BlendMode"] = { __ename__ : true, __constructs__ : ["ADD","ALPHA","DARKEN","DIFFERENCE","ERASE","HARDLIGHT","INVERT","LAYER","LIGHTEN","MULTIPLY","NORMAL","OVERLAY","SCREEN","SUBTRACT"] }
flash.display.BlendMode.ADD = ["ADD",0];
flash.display.BlendMode.ADD.toString = $estr;
flash.display.BlendMode.ADD.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ALPHA = ["ALPHA",1];
flash.display.BlendMode.ALPHA.toString = $estr;
flash.display.BlendMode.ALPHA.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DARKEN = ["DARKEN",2];
flash.display.BlendMode.DARKEN.toString = $estr;
flash.display.BlendMode.DARKEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.DIFFERENCE = ["DIFFERENCE",3];
flash.display.BlendMode.DIFFERENCE.toString = $estr;
flash.display.BlendMode.DIFFERENCE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.ERASE = ["ERASE",4];
flash.display.BlendMode.ERASE.toString = $estr;
flash.display.BlendMode.ERASE.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.HARDLIGHT = ["HARDLIGHT",5];
flash.display.BlendMode.HARDLIGHT.toString = $estr;
flash.display.BlendMode.HARDLIGHT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.INVERT = ["INVERT",6];
flash.display.BlendMode.INVERT.toString = $estr;
flash.display.BlendMode.INVERT.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LAYER = ["LAYER",7];
flash.display.BlendMode.LAYER.toString = $estr;
flash.display.BlendMode.LAYER.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.LIGHTEN = ["LIGHTEN",8];
flash.display.BlendMode.LIGHTEN.toString = $estr;
flash.display.BlendMode.LIGHTEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.MULTIPLY = ["MULTIPLY",9];
flash.display.BlendMode.MULTIPLY.toString = $estr;
flash.display.BlendMode.MULTIPLY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.NORMAL = ["NORMAL",10];
flash.display.BlendMode.NORMAL.toString = $estr;
flash.display.BlendMode.NORMAL.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.OVERLAY = ["OVERLAY",11];
flash.display.BlendMode.OVERLAY.toString = $estr;
flash.display.BlendMode.OVERLAY.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SCREEN = ["SCREEN",12];
flash.display.BlendMode.SCREEN.toString = $estr;
flash.display.BlendMode.SCREEN.__enum__ = flash.display.BlendMode;
flash.display.BlendMode.SUBTRACT = ["SUBTRACT",13];
flash.display.BlendMode.SUBTRACT.toString = $estr;
flash.display.BlendMode.SUBTRACT.__enum__ = flash.display.BlendMode;
flash.display.CapsStyle = $hxClasses["flash.display.CapsStyle"] = { __ename__ : true, __constructs__ : ["NONE","ROUND","SQUARE"] }
flash.display.CapsStyle.NONE = ["NONE",0];
flash.display.CapsStyle.NONE.toString = $estr;
flash.display.CapsStyle.NONE.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.ROUND = ["ROUND",1];
flash.display.CapsStyle.ROUND.toString = $estr;
flash.display.CapsStyle.ROUND.__enum__ = flash.display.CapsStyle;
flash.display.CapsStyle.SQUARE = ["SQUARE",2];
flash.display.CapsStyle.SQUARE.toString = $estr;
flash.display.CapsStyle.SQUARE.__enum__ = flash.display.CapsStyle;
flash.display.GradientType = $hxClasses["flash.display.GradientType"] = { __ename__ : true, __constructs__ : ["RADIAL","LINEAR"] }
flash.display.GradientType.RADIAL = ["RADIAL",0];
flash.display.GradientType.RADIAL.toString = $estr;
flash.display.GradientType.RADIAL.__enum__ = flash.display.GradientType;
flash.display.GradientType.LINEAR = ["LINEAR",1];
flash.display.GradientType.LINEAR.toString = $estr;
flash.display.GradientType.LINEAR.__enum__ = flash.display.GradientType;
flash.display.Drawable = function(inPoints,inFillColour,inFillAlpha,inSolidGradient,inBitmap,inLineJobs,inTileJob) {
	this.points = inPoints;
	this.fillColour = inFillColour;
	this.fillAlpha = inFillAlpha;
	this.solidGradient = inSolidGradient;
	this.bitmap = inBitmap;
	this.lineJobs = inLineJobs;
	this.tileJob = inTileJob;
};
$hxClasses["flash.display.Drawable"] = flash.display.Drawable;
flash.display.Drawable.__name__ = ["flash","display","Drawable"];
flash.display.Drawable.prototype = {
	__class__: flash.display.Drawable
}
flash.display.GfxPoint = function(inX,inY,inCX,inCY,inType) {
	this.x = inX;
	this.y = inY;
	this.cx = inCX;
	this.cy = inCY;
	this.type = inType;
};
$hxClasses["flash.display.GfxPoint"] = flash.display.GfxPoint;
flash.display.GfxPoint.__name__ = ["flash","display","GfxPoint"];
flash.display.GfxPoint.prototype = {
	__class__: flash.display.GfxPoint
}
flash.display.Grad = function(inPoints,inMatrix,inFlags,inFocal) {
	this.points = inPoints;
	this.matrix = inMatrix;
	this.flags = inFlags;
	this.focal = inFocal;
};
$hxClasses["flash.display.Grad"] = flash.display.Grad;
flash.display.Grad.__name__ = ["flash","display","Grad"];
flash.display.Grad.prototype = {
	__class__: flash.display.Grad
}
flash.display.GradPoint = function(inCol,inAlpha,inRatio) {
	this.col = inCol;
	this.alpha = inAlpha;
	this.ratio = inRatio;
};
$hxClasses["flash.display.GradPoint"] = flash.display.GradPoint;
flash.display.GradPoint.__name__ = ["flash","display","GradPoint"];
flash.display.GradPoint.prototype = {
	__class__: flash.display.GradPoint
}
flash.display.LineJob = function(inGrad,inPoint_idx0,inPoint_idx1,inThickness,inAlpha,inColour,inPixel_hinting,inJoints,inCaps,inScale_mode,inMiter_limit) {
	this.grad = inGrad;
	this.point_idx0 = inPoint_idx0;
	this.point_idx1 = inPoint_idx1;
	this.thickness = inThickness;
	this.alpha = inAlpha;
	this.colour = inColour;
	this.pixel_hinting = inPixel_hinting;
	this.joints = inJoints;
	this.caps = inCaps;
	this.scale_mode = inScale_mode;
	this.miter_limit = inMiter_limit;
};
$hxClasses["flash.display.LineJob"] = flash.display.LineJob;
flash.display.LineJob.__name__ = ["flash","display","LineJob"];
flash.display.LineJob.prototype = {
	__class__: flash.display.LineJob
}
flash.display.TileJob = function(sheet,drawList,flags) {
	this.sheet = sheet;
	this.drawList = drawList;
	this.flags = flags;
};
$hxClasses["flash.display.TileJob"] = flash.display.TileJob;
flash.display.TileJob.__name__ = ["flash","display","TileJob"];
flash.display.TileJob.prototype = {
	__class__: flash.display.TileJob
}
flash.display.IGraphicsFill = function() { }
$hxClasses["flash.display.IGraphicsFill"] = flash.display.IGraphicsFill;
flash.display.IGraphicsFill.__name__ = ["flash","display","IGraphicsFill"];
flash.display.IGraphicsFill.prototype = {
	__class__: flash.display.IGraphicsFill
}
flash.display.IGraphicsData = function() { }
$hxClasses["flash.display.IGraphicsData"] = flash.display.IGraphicsData;
flash.display.IGraphicsData.__name__ = ["flash","display","IGraphicsData"];
flash.display.IGraphicsData.prototype = {
	__class__: flash.display.IGraphicsData
}
flash.display.GraphicsGradientFill = function(type,colors,alphas,ratios,matrix,spreadMethod,interpolationMethod,focalPointRatio) {
	if(focalPointRatio == null) focalPointRatio = 0;
	this.type = type;
	this.colors = colors;
	this.alphas = alphas;
	this.ratios = ratios;
	this.matrix = matrix;
	this.spreadMethod = spreadMethod;
	this.interpolationMethod = interpolationMethod;
	this.focalPointRatio = focalPointRatio;
	this.__graphicsDataType = flash.display.GraphicsDataType.GRADIENT;
	this.__graphicsFillType = flash.display.GraphicsFillType.GRADIENT_FILL;
};
$hxClasses["flash.display.GraphicsGradientFill"] = flash.display.GraphicsGradientFill;
flash.display.GraphicsGradientFill.__name__ = ["flash","display","GraphicsGradientFill"];
flash.display.GraphicsGradientFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsGradientFill.prototype = {
	__class__: flash.display.GraphicsGradientFill
}
flash.display.IGraphicsPath = function() { }
$hxClasses["flash.display.IGraphicsPath"] = flash.display.IGraphicsPath;
flash.display.IGraphicsPath.__name__ = ["flash","display","IGraphicsPath"];
flash.display.GraphicsPath = function(commands,data,winding) {
	this.commands = commands;
	this.data = data;
	this.winding = winding;
	this.__graphicsDataType = flash.display.GraphicsDataType.PATH;
};
$hxClasses["flash.display.GraphicsPath"] = flash.display.GraphicsPath;
flash.display.GraphicsPath.__name__ = ["flash","display","GraphicsPath"];
flash.display.GraphicsPath.__interfaces__ = [flash.display.IGraphicsPath,flash.display.IGraphicsData];
flash.display.GraphicsPath.prototype = {
	moveTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,1);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,lineTo: function(x,y) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,2);
			flash._Vector.Vector_Impl_.push(this.data,x);
			flash._Vector.Vector_Impl_.push(this.data,y);
		}
	}
	,curveTo: function(controlX,controlY,anchorX,anchorY) {
		if(this.commands != null && this.data != null) {
			flash._Vector.Vector_Impl_.push(this.commands,3);
			flash._Vector.Vector_Impl_.push(this.data,anchorX);
			flash._Vector.Vector_Impl_.push(this.data,anchorY);
			flash._Vector.Vector_Impl_.push(this.data,controlX);
			flash._Vector.Vector_Impl_.push(this.data,controlY);
		}
	}
	,__class__: flash.display.GraphicsPath
}
flash.display.GraphicsPathCommand = function() { }
$hxClasses["flash.display.GraphicsPathCommand"] = flash.display.GraphicsPathCommand;
flash.display.GraphicsPathCommand.__name__ = ["flash","display","GraphicsPathCommand"];
flash.display.GraphicsPathWinding = $hxClasses["flash.display.GraphicsPathWinding"] = { __ename__ : true, __constructs__ : ["EVEN_ODD","NON_ZERO"] }
flash.display.GraphicsPathWinding.EVEN_ODD = ["EVEN_ODD",0];
flash.display.GraphicsPathWinding.EVEN_ODD.toString = $estr;
flash.display.GraphicsPathWinding.EVEN_ODD.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsPathWinding.NON_ZERO = ["NON_ZERO",1];
flash.display.GraphicsPathWinding.NON_ZERO.toString = $estr;
flash.display.GraphicsPathWinding.NON_ZERO.__enum__ = flash.display.GraphicsPathWinding;
flash.display.GraphicsSolidFill = function(color,alpha) {
	if(alpha == null) alpha = 1;
	if(color == null) color = 0;
	this.alpha = alpha;
	this.color = color;
	this.__graphicsDataType = flash.display.GraphicsDataType.SOLID;
	this.__graphicsFillType = flash.display.GraphicsFillType.SOLID_FILL;
};
$hxClasses["flash.display.GraphicsSolidFill"] = flash.display.GraphicsSolidFill;
flash.display.GraphicsSolidFill.__name__ = ["flash","display","GraphicsSolidFill"];
flash.display.GraphicsSolidFill.__interfaces__ = [flash.display.IGraphicsFill,flash.display.IGraphicsData];
flash.display.GraphicsSolidFill.prototype = {
	__class__: flash.display.GraphicsSolidFill
}
flash.display.IGraphicsStroke = function() { }
$hxClasses["flash.display.IGraphicsStroke"] = flash.display.IGraphicsStroke;
flash.display.IGraphicsStroke.__name__ = ["flash","display","IGraphicsStroke"];
flash.display.GraphicsStroke = function(thickness,pixelHinting,scaleMode,caps,joints,miterLimit,fill) {
	if(miterLimit == null) miterLimit = 3;
	if(pixelHinting == null) pixelHinting = false;
	if(thickness == null) thickness = 0.0;
	this.caps = caps != null?caps:null;
	this.fill = fill;
	this.joints = joints != null?joints:null;
	this.miterLimit = miterLimit;
	this.pixelHinting = pixelHinting;
	this.scaleMode = scaleMode != null?scaleMode:null;
	this.thickness = thickness;
	this.__graphicsDataType = flash.display.GraphicsDataType.STROKE;
};
$hxClasses["flash.display.GraphicsStroke"] = flash.display.GraphicsStroke;
flash.display.GraphicsStroke.__name__ = ["flash","display","GraphicsStroke"];
flash.display.GraphicsStroke.__interfaces__ = [flash.display.IGraphicsStroke,flash.display.IGraphicsData];
flash.display.GraphicsStroke.prototype = {
	__class__: flash.display.GraphicsStroke
}
flash.display.GraphicsDataType = $hxClasses["flash.display.GraphicsDataType"] = { __ename__ : true, __constructs__ : ["STROKE","SOLID","GRADIENT","PATH"] }
flash.display.GraphicsDataType.STROKE = ["STROKE",0];
flash.display.GraphicsDataType.STROKE.toString = $estr;
flash.display.GraphicsDataType.STROKE.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.SOLID = ["SOLID",1];
flash.display.GraphicsDataType.SOLID.toString = $estr;
flash.display.GraphicsDataType.SOLID.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.GRADIENT = ["GRADIENT",2];
flash.display.GraphicsDataType.GRADIENT.toString = $estr;
flash.display.GraphicsDataType.GRADIENT.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsDataType.PATH = ["PATH",3];
flash.display.GraphicsDataType.PATH.toString = $estr;
flash.display.GraphicsDataType.PATH.__enum__ = flash.display.GraphicsDataType;
flash.display.GraphicsFillType = $hxClasses["flash.display.GraphicsFillType"] = { __ename__ : true, __constructs__ : ["SOLID_FILL","GRADIENT_FILL"] }
flash.display.GraphicsFillType.SOLID_FILL = ["SOLID_FILL",0];
flash.display.GraphicsFillType.SOLID_FILL.toString = $estr;
flash.display.GraphicsFillType.SOLID_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.GraphicsFillType.GRADIENT_FILL = ["GRADIENT_FILL",1];
flash.display.GraphicsFillType.GRADIENT_FILL.toString = $estr;
flash.display.GraphicsFillType.GRADIENT_FILL.__enum__ = flash.display.GraphicsFillType;
flash.display.InterpolationMethod = $hxClasses["flash.display.InterpolationMethod"] = { __ename__ : true, __constructs__ : ["RGB","LINEAR_RGB"] }
flash.display.InterpolationMethod.RGB = ["RGB",0];
flash.display.InterpolationMethod.RGB.toString = $estr;
flash.display.InterpolationMethod.RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.InterpolationMethod.LINEAR_RGB = ["LINEAR_RGB",1];
flash.display.InterpolationMethod.LINEAR_RGB.toString = $estr;
flash.display.InterpolationMethod.LINEAR_RGB.__enum__ = flash.display.InterpolationMethod;
flash.display.JointStyle = $hxClasses["flash.display.JointStyle"] = { __ename__ : true, __constructs__ : ["MITER","ROUND","BEVEL"] }
flash.display.JointStyle.MITER = ["MITER",0];
flash.display.JointStyle.MITER.toString = $estr;
flash.display.JointStyle.MITER.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.ROUND = ["ROUND",1];
flash.display.JointStyle.ROUND.toString = $estr;
flash.display.JointStyle.ROUND.__enum__ = flash.display.JointStyle;
flash.display.JointStyle.BEVEL = ["BEVEL",2];
flash.display.JointStyle.BEVEL.toString = $estr;
flash.display.JointStyle.BEVEL.__enum__ = flash.display.JointStyle;
flash.display.LineScaleMode = $hxClasses["flash.display.LineScaleMode"] = { __ename__ : true, __constructs__ : ["HORIZONTAL","NONE","NORMAL","VERTICAL"] }
flash.display.LineScaleMode.HORIZONTAL = ["HORIZONTAL",0];
flash.display.LineScaleMode.HORIZONTAL.toString = $estr;
flash.display.LineScaleMode.HORIZONTAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NONE = ["NONE",1];
flash.display.LineScaleMode.NONE.toString = $estr;
flash.display.LineScaleMode.NONE.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.NORMAL = ["NORMAL",2];
flash.display.LineScaleMode.NORMAL.toString = $estr;
flash.display.LineScaleMode.NORMAL.__enum__ = flash.display.LineScaleMode;
flash.display.LineScaleMode.VERTICAL = ["VERTICAL",3];
flash.display.LineScaleMode.VERTICAL.toString = $estr;
flash.display.LineScaleMode.VERTICAL.__enum__ = flash.display.LineScaleMode;
flash.display.Loader = function() {
	flash.display.Sprite.call(this);
	this.contentLoaderInfo = flash.display.LoaderInfo.create(this);
};
$hxClasses["flash.display.Loader"] = flash.display.Loader;
flash.display.Loader.__name__ = ["flash","display","Loader"];
flash.display.Loader.__super__ = flash.display.Sprite;
flash.display.Loader.prototype = $extend(flash.display.Sprite.prototype,{
	handleLoad: function(e) {
		e.currentTarget = this;
		this.content.__invalidateBounds();
		this.content.__render(null,null);
		this.contentLoaderInfo.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad));
	}
	,validateBounds: function() {
		if(this.get__boundsInvalid()) {
			flash.display.Sprite.prototype.validateBounds.call(this);
			if(this.mImage != null) {
				var r = new flash.geom.Rectangle(0,0,this.mImage.get_width(),this.mImage.get_height());
				if(r.width != 0 || r.height != 0) {
					if(this.__boundsRect.width == 0 && this.__boundsRect.height == 0) this.__boundsRect = r.clone(); else this.__boundsRect.extendBounds(r);
				}
			}
			if(this.scale9Grid != null) {
				this.__boundsRect.width *= this.__scaleX;
				this.__boundsRect.height *= this.__scaleY;
				this.__width = this.__boundsRect.width;
				this.__height = this.__boundsRect.height;
			} else {
				this.__width = this.__boundsRect.width * this.__scaleX;
				this.__height = this.__boundsRect.height * this.__scaleY;
			}
		}
	}
	,toString: function() {
		return "[Loader name=" + this.name + " id=" + this.___id + "]";
	}
	,loadBytes: function(buffer) {
		var _g = this;
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			flash.display.BitmapData.loadFromBytes(buffer,null,function(bmd) {
				_g.content = new flash.display.Bitmap(bmd);
				_g.contentLoaderInfo.content = _g.content;
				_g.addChild(_g.content);
				var evt = new flash.events.Event(flash.events.Event.COMPLETE);
				evt.currentTarget = _g;
				_g.contentLoaderInfo.dispatchEvent(evt);
			});
		} catch( e ) {
			haxe.Log.trace("Error " + Std.string(e),{ fileName : "Loader.hx", lineNumber : 123, className : "flash.display.Loader", methodName : "loadBytes"});
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
		}
	}
	,load: function(request,context) {
		var extension = "";
		var parts = request.url.split(".");
		if(parts.length > 0) extension = parts[parts.length - 1].toLowerCase();
		var transparent = true;
		this.contentLoaderInfo.url = request.url;
		if(request.contentType == null && request.contentType != "") this.contentLoaderInfo.contentType = (function($this) {
			var $r;
			switch(extension) {
			case "swf":
				$r = "application/x-shockwave-flash";
				break;
			case "jpg":case "jpeg":
				$r = (function($this) {
					var $r;
					transparent = false;
					$r = "image/jpeg";
					return $r;
				}($this));
				break;
			case "png":
				$r = "image/png";
				break;
			case "gif":
				$r = "image/gif";
				break;
			default:
				$r = "application/x-www-form-urlencoded";
			}
			return $r;
		}(this)); else this.contentLoaderInfo.contentType = request.contentType;
		this.mImage = new flash.display.BitmapData(0,0,transparent);
		try {
			this.contentLoaderInfo.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.handleLoad),false,2147483647);
			this.mImage.__loadFromFile(request.url,this.contentLoaderInfo);
			this.content = new flash.display.Bitmap(this.mImage);
			this.contentLoaderInfo.content = this.content;
			this.addChild(this.content);
		} catch( e ) {
			haxe.Log.trace("Error " + Std.string(e),{ fileName : "Loader.hx", lineNumber : 86, className : "flash.display.Loader", methodName : "load"});
			var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
			evt.currentTarget = this;
			this.contentLoaderInfo.dispatchEvent(evt);
			return;
		}
		if(this.mShape == null) {
			this.mShape = new flash.display.Shape();
			this.addChild(this.mShape);
		}
	}
	,__class__: flash.display.Loader
});
flash.display.PixelSnapping = $hxClasses["flash.display.PixelSnapping"] = { __ename__ : true, __constructs__ : ["NEVER","AUTO","ALWAYS"] }
flash.display.PixelSnapping.NEVER = ["NEVER",0];
flash.display.PixelSnapping.NEVER.toString = $estr;
flash.display.PixelSnapping.NEVER.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.AUTO = ["AUTO",1];
flash.display.PixelSnapping.AUTO.toString = $estr;
flash.display.PixelSnapping.AUTO.__enum__ = flash.display.PixelSnapping;
flash.display.PixelSnapping.ALWAYS = ["ALWAYS",2];
flash.display.PixelSnapping.ALWAYS.toString = $estr;
flash.display.PixelSnapping.ALWAYS.__enum__ = flash.display.PixelSnapping;
flash.display.Shape = function() {
	flash.display.DisplayObject.call(this);
	this.__graphics = new flash.display.Graphics();
};
$hxClasses["flash.display.Shape"] = flash.display.Shape;
flash.display.Shape.__name__ = ["flash","display","Shape"];
flash.display.Shape.__super__ = flash.display.DisplayObject;
flash.display.Shape.prototype = $extend(flash.display.DisplayObject.prototype,{
	get_graphics: function() {
		return this.__graphics;
	}
	,__getObjectUnderPoint: function(point) {
		if(this.parent == null) return null;
		if(this.parent.mouseEnabled && flash.display.DisplayObject.prototype.__getObjectUnderPoint.call(this,point) == this) return this.parent; else return null;
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,toString: function() {
		return "[Shape name=" + this.name + " id=" + this.___id + "]";
	}
	,__class__: flash.display.Shape
	,__properties__: $extend(flash.display.DisplayObject.prototype.__properties__,{get_graphics:"get_graphics"})
});
flash.display.SpreadMethod = $hxClasses["flash.display.SpreadMethod"] = { __ename__ : true, __constructs__ : ["REPEAT","REFLECT","PAD"] }
flash.display.SpreadMethod.REPEAT = ["REPEAT",0];
flash.display.SpreadMethod.REPEAT.toString = $estr;
flash.display.SpreadMethod.REPEAT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.REFLECT = ["REFLECT",1];
flash.display.SpreadMethod.REFLECT.toString = $estr;
flash.display.SpreadMethod.REFLECT.__enum__ = flash.display.SpreadMethod;
flash.display.SpreadMethod.PAD = ["PAD",2];
flash.display.SpreadMethod.PAD.toString = $estr;
flash.display.SpreadMethod.PAD.__enum__ = flash.display.SpreadMethod;
flash.display._Stage = {}
flash.display._Stage.TouchInfo = function() {
	this.touchOverObjects = [];
};
$hxClasses["flash.display._Stage.TouchInfo"] = flash.display._Stage.TouchInfo;
flash.display._Stage.TouchInfo.__name__ = ["flash","display","_Stage","TouchInfo"];
flash.display._Stage.TouchInfo.prototype = {
	__class__: flash.display._Stage.TouchInfo
}
flash.display.StageAlign = $hxClasses["flash.display.StageAlign"] = { __ename__ : true, __constructs__ : ["TOP_RIGHT","TOP_LEFT","TOP","RIGHT","LEFT","BOTTOM_RIGHT","BOTTOM_LEFT","BOTTOM"] }
flash.display.StageAlign.TOP_RIGHT = ["TOP_RIGHT",0];
flash.display.StageAlign.TOP_RIGHT.toString = $estr;
flash.display.StageAlign.TOP_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP_LEFT = ["TOP_LEFT",1];
flash.display.StageAlign.TOP_LEFT.toString = $estr;
flash.display.StageAlign.TOP_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.TOP = ["TOP",2];
flash.display.StageAlign.TOP.toString = $estr;
flash.display.StageAlign.TOP.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.RIGHT = ["RIGHT",3];
flash.display.StageAlign.RIGHT.toString = $estr;
flash.display.StageAlign.RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.LEFT = ["LEFT",4];
flash.display.StageAlign.LEFT.toString = $estr;
flash.display.StageAlign.LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_RIGHT = ["BOTTOM_RIGHT",5];
flash.display.StageAlign.BOTTOM_RIGHT.toString = $estr;
flash.display.StageAlign.BOTTOM_RIGHT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM_LEFT = ["BOTTOM_LEFT",6];
flash.display.StageAlign.BOTTOM_LEFT.toString = $estr;
flash.display.StageAlign.BOTTOM_LEFT.__enum__ = flash.display.StageAlign;
flash.display.StageAlign.BOTTOM = ["BOTTOM",7];
flash.display.StageAlign.BOTTOM.toString = $estr;
flash.display.StageAlign.BOTTOM.__enum__ = flash.display.StageAlign;
flash.display.StageDisplayState = $hxClasses["flash.display.StageDisplayState"] = { __ename__ : true, __constructs__ : ["NORMAL","FULL_SCREEN","FULL_SCREEN_INTERACTIVE"] }
flash.display.StageDisplayState.NORMAL = ["NORMAL",0];
flash.display.StageDisplayState.NORMAL.toString = $estr;
flash.display.StageDisplayState.NORMAL.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN = ["FULL_SCREEN",1];
flash.display.StageDisplayState.FULL_SCREEN.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN.__enum__ = flash.display.StageDisplayState;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE = ["FULL_SCREEN_INTERACTIVE",2];
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.toString = $estr;
flash.display.StageDisplayState.FULL_SCREEN_INTERACTIVE.__enum__ = flash.display.StageDisplayState;
flash.display.StageQuality = function() { }
$hxClasses["flash.display.StageQuality"] = flash.display.StageQuality;
flash.display.StageQuality.__name__ = ["flash","display","StageQuality"];
flash.errors = {}
flash.errors.Error = function(message,id) {
	if(id == null) id = 0;
	if(message == null) message = "";
	this.message = message;
	this.errorID = id;
};
$hxClasses["flash.errors.Error"] = flash.errors.Error;
flash.errors.Error.__name__ = ["flash","errors","Error"];
flash.errors.Error.prototype = {
	toString: function() {
		if(this.message != null) return this.message; else return "Error";
	}
	,getStackTrace: function() {
		return haxe.CallStack.toString(haxe.CallStack.exceptionStack());
	}
	,__class__: flash.errors.Error
}
flash.errors.IOError = function(message) {
	if(message == null) message = "";
	flash.errors.Error.call(this,message);
};
$hxClasses["flash.errors.IOError"] = flash.errors.IOError;
flash.errors.IOError.__name__ = ["flash","errors","IOError"];
flash.errors.IOError.__super__ = flash.errors.Error;
flash.errors.IOError.prototype = $extend(flash.errors.Error.prototype,{
	__class__: flash.errors.IOError
});
flash.events.TextEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.TextEvent"] = flash.events.TextEvent;
flash.events.TextEvent.__name__ = ["flash","events","TextEvent"];
flash.events.TextEvent.__super__ = flash.events.Event;
flash.events.TextEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.TextEvent
});
flash.events.ErrorEvent = function(type,bubbles,cancelable,text,id) {
	if(id == null) id = 0;
	flash.events.TextEvent.call(this,type,bubbles,cancelable);
	this.text = text;
	this.errorID = id;
};
$hxClasses["flash.events.ErrorEvent"] = flash.events.ErrorEvent;
flash.events.ErrorEvent.__name__ = ["flash","events","ErrorEvent"];
flash.events.ErrorEvent.__super__ = flash.events.TextEvent;
flash.events.ErrorEvent.prototype = $extend(flash.events.TextEvent.prototype,{
	__class__: flash.events.ErrorEvent
});
flash.events.Listener = function(inListener,inUseCapture,inPriority) {
	this.mListner = inListener;
	this.mUseCapture = inUseCapture;
	this.mPriority = inPriority;
	this.mID = flash.events.Listener.sIDs++;
};
$hxClasses["flash.events.Listener"] = flash.events.Listener;
flash.events.Listener.__name__ = ["flash","events","Listener"];
flash.events.Listener.prototype = {
	Is: function(inListener,inCapture) {
		return Reflect.compareMethods(this.mListner,inListener) && this.mUseCapture == inCapture;
	}
	,dispatchEvent: function(event) {
		this.mListner(event);
	}
	,__class__: flash.events.Listener
}
flash.events.EventPhase = function() { }
$hxClasses["flash.events.EventPhase"] = flash.events.EventPhase;
flash.events.EventPhase.__name__ = ["flash","events","EventPhase"];
flash.events.FocusEvent = function(type,bubbles,cancelable,inObject,inShiftKey,inKeyCode) {
	if(inKeyCode == null) inKeyCode = 0;
	if(inShiftKey == null) inShiftKey = false;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.keyCode = inKeyCode;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
	this.target = inObject;
};
$hxClasses["flash.events.FocusEvent"] = flash.events.FocusEvent;
flash.events.FocusEvent.__name__ = ["flash","events","FocusEvent"];
flash.events.FocusEvent.__super__ = flash.events.Event;
flash.events.FocusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.FocusEvent
});
flash.events.HTTPStatusEvent = function(type,bubbles,cancelable,status) {
	if(status == null) status = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	this.status = status;
	flash.events.Event.call(this,type,bubbles,cancelable);
};
$hxClasses["flash.events.HTTPStatusEvent"] = flash.events.HTTPStatusEvent;
flash.events.HTTPStatusEvent.__name__ = ["flash","events","HTTPStatusEvent"];
flash.events.HTTPStatusEvent.__super__ = flash.events.Event;
flash.events.HTTPStatusEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.HTTPStatusEvent
});
flash.events.IOErrorEvent = function(type,bubbles,cancelable,inText) {
	if(inText == null) inText = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.text = inText;
};
$hxClasses["flash.events.IOErrorEvent"] = flash.events.IOErrorEvent;
flash.events.IOErrorEvent.__name__ = ["flash","events","IOErrorEvent"];
flash.events.IOErrorEvent.__super__ = flash.events.Event;
flash.events.IOErrorEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.IOErrorEvent
});
flash.events.KeyboardEvent = function(type,bubbles,cancelable,inCharCode,inKeyCode,inKeyLocation,inCtrlKey,inAltKey,inShiftKey,controlKeyValue,commandKeyValue) {
	if(commandKeyValue == null) commandKeyValue = false;
	if(controlKeyValue == null) controlKeyValue = false;
	if(inShiftKey == null) inShiftKey = false;
	if(inAltKey == null) inAltKey = false;
	if(inCtrlKey == null) inCtrlKey = false;
	if(inKeyLocation == null) inKeyLocation = 0;
	if(inKeyCode == null) inKeyCode = 0;
	if(inCharCode == null) inCharCode = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.altKey = inAltKey == null?false:inAltKey;
	this.charCode = inCharCode == null?0:inCharCode;
	this.ctrlKey = inCtrlKey == null?false:inCtrlKey;
	this.commandKey = commandKeyValue;
	this.controlKey = controlKeyValue;
	this.keyCode = inKeyCode;
	this.keyLocation = inKeyLocation == null?0:inKeyLocation;
	this.shiftKey = inShiftKey == null?false:inShiftKey;
};
$hxClasses["flash.events.KeyboardEvent"] = flash.events.KeyboardEvent;
flash.events.KeyboardEvent.__name__ = ["flash","events","KeyboardEvent"];
flash.events.KeyboardEvent.__super__ = flash.events.Event;
flash.events.KeyboardEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.KeyboardEvent
});
flash.events.ProgressEvent = function(type,bubbles,cancelable,bytesLoaded,bytesTotal) {
	if(bytesTotal == null) bytesTotal = 0;
	if(bytesLoaded == null) bytesLoaded = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.bytesLoaded = bytesLoaded;
	this.bytesTotal = bytesTotal;
};
$hxClasses["flash.events.ProgressEvent"] = flash.events.ProgressEvent;
flash.events.ProgressEvent.__name__ = ["flash","events","ProgressEvent"];
flash.events.ProgressEvent.__super__ = flash.events.Event;
flash.events.ProgressEvent.prototype = $extend(flash.events.Event.prototype,{
	__class__: flash.events.ProgressEvent
});
flash.events.SecurityErrorEvent = function(type,bubbles,cancelable,text) {
	if(text == null) text = "";
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = false;
	flash.events.ErrorEvent.call(this,type,bubbles,cancelable);
	this.text = text;
};
$hxClasses["flash.events.SecurityErrorEvent"] = flash.events.SecurityErrorEvent;
flash.events.SecurityErrorEvent.__name__ = ["flash","events","SecurityErrorEvent"];
flash.events.SecurityErrorEvent.__super__ = flash.events.ErrorEvent;
flash.events.SecurityErrorEvent.prototype = $extend(flash.events.ErrorEvent.prototype,{
	__class__: flash.events.SecurityErrorEvent
});
flash.events.TouchEvent = function(type,bubbles,cancelable,localX,localY,relatedObject,ctrlKey,altKey,shiftKey,buttonDown,delta,commandKey,clickCount) {
	if(clickCount == null) clickCount = 0;
	if(commandKey == null) commandKey = false;
	if(delta == null) delta = 0;
	if(buttonDown == null) buttonDown = false;
	if(shiftKey == null) shiftKey = false;
	if(altKey == null) altKey = false;
	if(ctrlKey == null) ctrlKey = false;
	if(localY == null) localY = 0;
	if(localX == null) localX = 0;
	if(cancelable == null) cancelable = false;
	if(bubbles == null) bubbles = true;
	flash.events.Event.call(this,type,bubbles,cancelable);
	this.shiftKey = shiftKey;
	this.altKey = altKey;
	this.ctrlKey = ctrlKey;
	this.bubbles = bubbles;
	this.relatedObject = relatedObject;
	this.delta = delta;
	this.localX = localX;
	this.localY = localY;
	this.buttonDown = buttonDown;
	this.commandKey = commandKey;
	this.touchPointID = 0;
	this.isPrimaryTouchPoint = true;
};
$hxClasses["flash.events.TouchEvent"] = flash.events.TouchEvent;
flash.events.TouchEvent.__name__ = ["flash","events","TouchEvent"];
flash.events.TouchEvent.__create = function(type,event,touch,local,target) {
	var evt = new flash.events.TouchEvent(type,true,false,local.x,local.y,null,event.ctrlKey,event.altKey,event.shiftKey,false,0,null,0);
	evt.stageX = flash.Lib.get_current().get_stage().get_mouseX();
	evt.stageY = flash.Lib.get_current().get_stage().get_mouseY();
	evt.target = target;
	return evt;
}
flash.events.TouchEvent.__super__ = flash.events.Event;
flash.events.TouchEvent.prototype = $extend(flash.events.Event.prototype,{
	__createSimilar: function(type,related,targ) {
		var result = new flash.events.TouchEvent(type,this.bubbles,this.cancelable,this.localX,this.localY,related == null?this.relatedObject:related,this.ctrlKey,this.altKey,this.shiftKey,this.buttonDown,this.delta,this.commandKey);
		result.touchPointID = this.touchPointID;
		result.isPrimaryTouchPoint = this.isPrimaryTouchPoint;
		if(targ != null) result.target = targ;
		return result;
	}
	,__class__: flash.events.TouchEvent
});
flash.filters = {}
flash.filters.BitmapFilter = function(inType) {
	this._mType = inType;
};
$hxClasses["flash.filters.BitmapFilter"] = flash.filters.BitmapFilter;
flash.filters.BitmapFilter.__name__ = ["flash","filters","BitmapFilter"];
flash.filters.BitmapFilter.prototype = {
	__applyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
	}
	,__preFilter: function(surface) {
	}
	,clone: function() {
		return new flash.filters.BitmapFilter(this._mType);
	}
	,__class__: flash.filters.BitmapFilter
}
flash.filters.DropShadowFilter = function(in_distance,in_angle,in_color,in_alpha,in_blurX,in_blurY,in_strength,in_quality,in_inner,in_knockout,in_hideObject) {
	if(in_hideObject == null) in_hideObject = false;
	if(in_knockout == null) in_knockout = false;
	if(in_inner == null) in_inner = false;
	if(in_quality == null) in_quality = 1;
	if(in_strength == null) in_strength = 1.0;
	if(in_blurY == null) in_blurY = 4.0;
	if(in_blurX == null) in_blurX = 4.0;
	if(in_alpha == null) in_alpha = 1.0;
	if(in_color == null) in_color = 0;
	if(in_angle == null) in_angle = 45.0;
	if(in_distance == null) in_distance = 4.0;
	flash.filters.BitmapFilter.call(this,"DropShadowFilter");
	this.distance = in_distance;
	this.angle = in_angle;
	this.color = in_color;
	this.alpha = in_alpha;
	this.blurX = in_blurX;
	this.blurY = in_blurX;
	this.strength = in_strength;
	this.quality = in_quality;
	this.inner = in_inner;
	this.knockout = in_knockout;
	this.hideObject = in_hideObject;
	this.___cached = false;
};
$hxClasses["flash.filters.DropShadowFilter"] = flash.filters.DropShadowFilter;
flash.filters.DropShadowFilter.__name__ = ["flash","filters","DropShadowFilter"];
flash.filters.DropShadowFilter.__super__ = flash.filters.BitmapFilter;
flash.filters.DropShadowFilter.prototype = $extend(flash.filters.BitmapFilter.prototype,{
	__applyFilter: function(surface,rect,refreshCache) {
		if(refreshCache == null) refreshCache = false;
		if(!this.___cached || refreshCache) {
			var distanceX = this.distance * Math.sin(2 * Math.PI * this.angle / 360.0);
			var distanceY = this.distance * Math.cos(2 * Math.PI * this.angle / 360.0);
			var blurRadius = Math.max(this.blurX,this.blurY);
			var context = surface.getContext("2d");
			context.shadowOffsetX = distanceX;
			context.shadowOffsetY = distanceY;
			context.shadowBlur = blurRadius;
			context.shadowColor = "rgba(" + (this.color >> 16 & 255) + "," + (this.color >> 8 & 255) + "," + (this.color & 255) + "," + this.alpha + ")";
			this.___cached = true;
		}
	}
	,clone: function() {
		return new flash.filters.DropShadowFilter(this.distance,this.angle,this.color,this.alpha,this.blurX,this.blurY,this.strength,this.quality,this.inner,this.knockout,this.hideObject);
	}
	,__class__: flash.filters.DropShadowFilter
});
flash.media.Sound = function(stream,context) {
	flash.events.EventDispatcher.call(this,this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.id3 = null;
	this.isBuffering = false;
	this.length = 0;
	this.url = null;
	this.__soundChannels = new haxe.ds.IntMap();
	this.__soundIdx = 0;
	if(stream != null) this.load(stream,context);
};
$hxClasses["flash.media.Sound"] = flash.media.Sound;
flash.media.Sound.__name__ = ["flash","media","Sound"];
flash.media.Sound.__canPlayMime = function(mime) {
	var audio = js.Browser.document.createElement("audio");
	var playable = function(ok) {
		if(ok != "" && ok != "no") return true; else return false;
	};
	return playable(audio.canPlayType(mime,null));
}
flash.media.Sound.__canPlayType = function(extension) {
	var mime = flash.media.Sound.__mimeForExtension(extension);
	if(mime == null) return false;
	return flash.media.Sound.__canPlayMime(mime);
}
flash.media.Sound.__mimeForExtension = function(extension) {
	var mime = null;
	switch(extension) {
	case "mp3":
		mime = "audio/mpeg";
		break;
	case "ogg":
		mime = "audio/ogg; codecs=\"vorbis\"";
		break;
	case "wav":
		mime = "audio/wav; codecs=\"1\"";
		break;
	case "aac":
		mime = "audio/mp4; codecs=\"mp4a.40.2\"";
		break;
	default:
		mime = null;
	}
	return mime;
}
flash.media.Sound.__super__ = flash.events.EventDispatcher;
flash.media.Sound.prototype = $extend(flash.events.EventDispatcher.prototype,{
	__onSoundLoaded: function(evt) {
		this.__removeEventListeners();
		var evt1 = new flash.events.Event(flash.events.Event.COMPLETE);
		this.dispatchEvent(evt1);
	}
	,__onSoundLoadError: function(evt) {
		this.__removeEventListeners();
		var evt1 = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		this.dispatchEvent(evt1);
	}
	,__removeEventListeners: function() {
		this.__soundCache.removeEventListener(flash.events.Event.COMPLETE,$bind(this,this.__onSoundLoaded),false);
		this.__soundCache.removeEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.__onSoundLoadError),false);
	}
	,__load: function(stream,context,mime) {
		if(mime == null) mime = "";
		this.__streamUrl = stream.url;
		try {
			this.__soundCache = new flash.net.URLLoader();
			this.__addEventListeners();
			this.__soundCache.load(stream);
		} catch( e ) {
		}
	}
	,__addEventListeners: function() {
		this.__soundCache.addEventListener(flash.events.Event.COMPLETE,$bind(this,this.__onSoundLoaded));
		this.__soundCache.addEventListener(flash.events.IOErrorEvent.IO_ERROR,$bind(this,this.__onSoundLoadError));
	}
	,play: function(startTime,loops,sndTransform) {
		if(loops == null) loops = 0;
		if(startTime == null) startTime = 0.0;
		if(this.__streamUrl == null) return null;
		var self = this;
		var curIdx = this.__soundIdx;
		var removeRef = function() {
			self.__soundChannels.remove(curIdx);
		};
		var channel = flash.media.SoundChannel.__create(this.__streamUrl,startTime,loops,sndTransform,removeRef);
		this.__soundChannels.set(curIdx,channel);
		this.__soundIdx++;
		var audio = channel.__audio;
		return channel;
	}
	,load: function(stream,context) {
		this.__load(stream,context);
	}
	,close: function() {
	}
	,__class__: flash.media.Sound
});
flash.media.SoundChannel = function() {
	flash.events.EventDispatcher.call(this,this);
	this.ChannelId = -1;
	this.leftPeak = 0.;
	this.position = 0.;
	this.rightPeak = 0.;
	this.__audioCurrentLoop = 1;
	this.__audioTotalLoops = 1;
};
$hxClasses["flash.media.SoundChannel"] = flash.media.SoundChannel;
flash.media.SoundChannel.__name__ = ["flash","media","SoundChannel"];
flash.media.SoundChannel.__create = function(src,startTime,loops,sndTransform,removeRef) {
	if(loops == null) loops = 0;
	if(startTime == null) startTime = 0.0;
	var channel = new flash.media.SoundChannel();
	channel.__audio = js.Browser.document.createElement("audio");
	channel.__removeRef = removeRef;
	channel.__audio.addEventListener("ended",$bind(channel,channel.__onSoundChannelFinished),false);
	channel.__audio.addEventListener("seeked",$bind(channel,channel.__onSoundSeeked),false);
	channel.__audio.addEventListener("stalled",$bind(channel,channel.__onStalled),false);
	channel.__audio.addEventListener("progress",$bind(channel,channel.__onProgress),false);
	if(loops > 0) {
		channel.__audioTotalLoops = loops;
		channel.__audio.loop = true;
	}
	channel.__startTime = startTime;
	if(startTime > 0.) {
		var onLoad = null;
		onLoad = function(_) {
			channel.__audio.currentTime = channel.__startTime;
			channel.__audio.play();
			channel.__audio.removeEventListener("canplaythrough",onLoad,false);
		};
		channel.__audio.addEventListener("canplaythrough",onLoad,false);
	} else channel.__audio.autoplay = true;
	channel.__audio.src = src;
	return channel;
}
flash.media.SoundChannel.__super__ = flash.events.EventDispatcher;
flash.media.SoundChannel.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_soundTransform: function(v) {
		this.__audio.volume = v.volume;
		return this.soundTransform = v;
	}
	,__onStalled: function(evt) {
		if(this.__audio != null) this.__audio.load();
	}
	,__onSoundSeeked: function(evt) {
		if(this.__audioCurrentLoop >= this.__audioTotalLoops) {
			this.__audio.loop = false;
			this.stop();
		} else this.__audioCurrentLoop++;
	}
	,__onSoundChannelFinished: function(evt) {
		if(this.__audioCurrentLoop >= this.__audioTotalLoops) {
			this.__audio.removeEventListener("ended",$bind(this,this.__onSoundChannelFinished),false);
			this.__audio.removeEventListener("seeked",$bind(this,this.__onSoundSeeked),false);
			this.__audio.removeEventListener("stalled",$bind(this,this.__onStalled),false);
			this.__audio.removeEventListener("progress",$bind(this,this.__onProgress),false);
			this.__audio = null;
			var evt1 = new flash.events.Event(flash.events.Event.SOUND_COMPLETE);
			evt1.target = this;
			this.dispatchEvent(evt1);
			if(this.__removeRef != null) this.__removeRef();
		} else {
			this.__audio.currentTime = this.__startTime;
			this.__audio.play();
		}
	}
	,__onProgress: function(evt) {
	}
	,stop: function() {
		if(this.__audio != null) {
			this.__audio.pause();
			this.__audio = null;
			if(this.__removeRef != null) this.__removeRef();
		}
	}
	,__class__: flash.media.SoundChannel
	,__properties__: {set_soundTransform:"set_soundTransform"}
});
flash.media.SoundLoaderContext = function(bufferTime,checkPolicyFile) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	if(bufferTime == null) bufferTime = 0;
	this.bufferTime = bufferTime;
	this.checkPolicyFile = checkPolicyFile;
};
$hxClasses["flash.media.SoundLoaderContext"] = flash.media.SoundLoaderContext;
flash.media.SoundLoaderContext.__name__ = ["flash","media","SoundLoaderContext"];
flash.media.SoundLoaderContext.prototype = {
	__class__: flash.media.SoundLoaderContext
}
flash.net = {}
flash.net.URLLoader = function(request) {
	flash.events.EventDispatcher.call(this);
	this.bytesLoaded = 0;
	this.bytesTotal = 0;
	this.set_dataFormat(flash.net.URLLoaderDataFormat.TEXT);
	if(request != null) this.load(request);
};
$hxClasses["flash.net.URLLoader"] = flash.net.URLLoader;
flash.net.URLLoader.__name__ = ["flash","net","URLLoader"];
flash.net.URLLoader.__super__ = flash.events.EventDispatcher;
flash.net.URLLoader.prototype = $extend(flash.events.EventDispatcher.prototype,{
	set_dataFormat: function(inputVal) {
		if(inputVal == flash.net.URLLoaderDataFormat.BINARY && !Reflect.hasField(js.Browser.window,"ArrayBuffer")) this.dataFormat = flash.net.URLLoaderDataFormat.TEXT; else this.dataFormat = inputVal;
		return this.dataFormat;
	}
	,onStatus: function(status) {
		var evt = new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS,false,false,status);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onSecurityError: function(msg) {
		var evt = new flash.events.SecurityErrorEvent(flash.events.SecurityErrorEvent.SECURITY_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onProgress: function(event) {
		var evt = new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS);
		evt.currentTarget = this;
		evt.bytesLoaded = event.loaded;
		evt.bytesTotal = event.total;
		this.dispatchEvent(evt);
	}
	,onOpen: function() {
		var evt = new flash.events.Event(flash.events.Event.OPEN);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onError: function(msg) {
		var evt = new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR);
		evt.text = msg;
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,onData: function(_) {
		var content = this.getData();
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			this.data = flash.utils.ByteArray.__ofBuffer(content);
			break;
		default:
			this.data = Std.string(content);
		}
		var evt = new flash.events.Event(flash.events.Event.COMPLETE);
		evt.currentTarget = this;
		this.dispatchEvent(evt);
	}
	,requestUrl: function(url,method,data,requestHeaders) {
		var xmlHttpRequest = new XMLHttpRequest();
		this.registerEvents(xmlHttpRequest);
		var uri = "";
		if(js.Boot.__instanceof(data,flash.utils.ByteArray)) {
			var data1 = data;
			var _g = this;
			switch( (_g.dataFormat)[1] ) {
			case 0:
				uri = data1.data.buffer;
				break;
			default:
				uri = data1.readUTFBytes(data1.length);
			}
		} else if(js.Boot.__instanceof(data,flash.net.URLVariables)) {
			var data1 = data;
			var _g = 0, _g1 = Reflect.fields(data1);
			while(_g < _g1.length) {
				var p = _g1[_g];
				++_g;
				if(uri.length != 0) uri += "&";
				uri += StringTools.urlEncode(p) + "=" + StringTools.urlEncode(Reflect.field(data1,p));
			}
		} else if(data != null) uri = data.toString();
		try {
			if(method == "GET" && uri != null && uri != "") {
				var question = url.split("?").length <= 1;
				xmlHttpRequest.open(method,url + (question?"?":"&") + Std.string(uri),true);
				uri = "";
			} else xmlHttpRequest.open(method,url,true);
		} catch( e ) {
			this.onError(e.toString());
			return;
		}
		var _g = this;
		switch( (_g.dataFormat)[1] ) {
		case 0:
			xmlHttpRequest.responseType = "arraybuffer";
			break;
		default:
		}
		var _g1 = 0;
		while(_g1 < requestHeaders.length) {
			var header = requestHeaders[_g1];
			++_g1;
			xmlHttpRequest.setRequestHeader(header.name,header.value);
		}
		xmlHttpRequest.send(uri);
		this.onOpen();
		this.getData = function() {
			if(xmlHttpRequest.response != null) return xmlHttpRequest.response; else return xmlHttpRequest.responseText;
		};
	}
	,registerEvents: function(subject) {
		var self = this;
		if(typeof XMLHttpRequestProgressEvent != "undefined") subject.addEventListener("progress",$bind(this,this.onProgress),false);
		subject.onreadystatechange = function() {
			if(subject.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = subject.status;
				} catch( e ) {
					$r = null;
				}
				return $r;
			}(this));
			if(s == undefined) s = null;
			if(s != null) self.onStatus(s);
			if(s != null && s >= 200 && s < 400) self.onData(subject.response); else if(s == null) self.onError("Failed to connect or resolve host"); else if(s == 12029) self.onError("Failed to connect to host"); else if(s == 12007) self.onError("Unknown host"); else if(s == 0) {
				self.onError("Unable to make request (may be blocked due to cross-domain permissions)");
				self.onSecurityError("Unable to make request (may be blocked due to cross-domain permissions)");
			} else self.onError("Http Error #" + subject.status);
		};
	}
	,load: function(request) {
		this.requestUrl(request.url,request.method,request.data,request.formatRequestHeaders());
	}
	,getData: function() {
		return null;
	}
	,close: function() {
	}
	,__class__: flash.net.URLLoader
	,__properties__: {set_dataFormat:"set_dataFormat"}
});
flash.net.URLLoaderDataFormat = $hxClasses["flash.net.URLLoaderDataFormat"] = { __ename__ : true, __constructs__ : ["BINARY","TEXT","VARIABLES"] }
flash.net.URLLoaderDataFormat.BINARY = ["BINARY",0];
flash.net.URLLoaderDataFormat.BINARY.toString = $estr;
flash.net.URLLoaderDataFormat.BINARY.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.TEXT = ["TEXT",1];
flash.net.URLLoaderDataFormat.TEXT.toString = $estr;
flash.net.URLLoaderDataFormat.TEXT.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLLoaderDataFormat.VARIABLES = ["VARIABLES",2];
flash.net.URLLoaderDataFormat.VARIABLES.toString = $estr;
flash.net.URLLoaderDataFormat.VARIABLES.__enum__ = flash.net.URLLoaderDataFormat;
flash.net.URLRequest = function(inURL) {
	if(inURL != null) this.url = inURL;
	this.requestHeaders = [];
	this.method = flash.net.URLRequestMethod.GET;
	this.contentType = null;
};
$hxClasses["flash.net.URLRequest"] = flash.net.URLRequest;
flash.net.URLRequest.__name__ = ["flash","net","URLRequest"];
flash.net.URLRequest.prototype = {
	formatRequestHeaders: function() {
		var res = this.requestHeaders;
		if(res == null) res = [];
		if(this.method == flash.net.URLRequestMethod.GET || this.data == null) return res;
		if(js.Boot.__instanceof(this.data,String) || js.Boot.__instanceof(this.data,flash.utils.ByteArray)) {
			res = res.slice();
			res.push(new flash.net.URLRequestHeader("Content-Type",this.contentType != null?this.contentType:"application/x-www-form-urlencoded"));
		}
		return res;
	}
	,__class__: flash.net.URLRequest
}
flash.net.URLRequestHeader = function(name,value) {
	if(value == null) value = "";
	if(name == null) name = "";
	this.name = name;
	this.value = value;
};
$hxClasses["flash.net.URLRequestHeader"] = flash.net.URLRequestHeader;
flash.net.URLRequestHeader.__name__ = ["flash","net","URLRequestHeader"];
flash.net.URLRequestHeader.prototype = {
	__class__: flash.net.URLRequestHeader
}
flash.net.URLRequestMethod = function() { }
$hxClasses["flash.net.URLRequestMethod"] = flash.net.URLRequestMethod;
flash.net.URLRequestMethod.__name__ = ["flash","net","URLRequestMethod"];
flash.net.URLVariables = function(inEncoded) {
	if(inEncoded != null) this.decode(inEncoded);
};
$hxClasses["flash.net.URLVariables"] = flash.net.URLVariables;
flash.net.URLVariables.__name__ = ["flash","net","URLVariables"];
flash.net.URLVariables.prototype = {
	toString: function() {
		var result = new Array();
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			result.push(StringTools.urlEncode(f) + "=" + StringTools.urlEncode(Reflect.field(this,f)));
		}
		return result.join("&");
	}
	,decode: function(inVars) {
		var fields = Reflect.fields(this);
		var _g = 0;
		while(_g < fields.length) {
			var f = fields[_g];
			++_g;
			Reflect.deleteField(this,f);
		}
		var fields1 = inVars.split(";").join("&").split("&");
		var _g = 0;
		while(_g < fields1.length) {
			var f = fields1[_g];
			++_g;
			var eq = f.indexOf("=");
			if(eq > 0) this[StringTools.urlDecode(HxOverrides.substr(f,0,eq))] = StringTools.urlDecode(HxOverrides.substr(f,eq + 1,null)); else if(eq != 0) this[StringTools.urlDecode(f)] = "";
		}
	}
	,__class__: flash.net.URLVariables
}
flash.system.LoaderContext = function(checkPolicyFile,applicationDomain,securityDomain) {
	if(checkPolicyFile == null) checkPolicyFile = false;
	this.checkPolicyFile = checkPolicyFile;
	this.securityDomain = securityDomain;
	if(applicationDomain != null) this.applicationDomain = applicationDomain; else this.applicationDomain = flash.system.ApplicationDomain.currentDomain;
};
$hxClasses["flash.system.LoaderContext"] = flash.system.LoaderContext;
flash.system.LoaderContext.__name__ = ["flash","system","LoaderContext"];
flash.system.LoaderContext.prototype = {
	__class__: flash.system.LoaderContext
}
flash.system.SecurityDomain = function() {
};
$hxClasses["flash.system.SecurityDomain"] = flash.system.SecurityDomain;
flash.system.SecurityDomain.__name__ = ["flash","system","SecurityDomain"];
flash.system.SecurityDomain.prototype = {
	__class__: flash.system.SecurityDomain
}
flash.system.System = function() { }
$hxClasses["flash.system.System"] = flash.system.System;
flash.system.System.__name__ = ["flash","system","System"];
flash.system.System.__properties__ = {get_vmVersion:"get_vmVersion",get_totalMemory:"get_totalMemory"}
flash.system.System.exit = function(code) {
	throw "System.exit is currently not supported for HTML5";
}
flash.system.System.gc = function() {
}
flash.system.System.pause = function() {
	throw "System.pause is currently not supported for HTML5";
}
flash.system.System.resume = function() {
	throw "System.resume is currently not supported for HTML5";
}
flash.system.System.setClipboard = function(string) {
	throw "System.setClipboard is currently not supported for HTML5";
}
flash.system.System.get_totalMemory = function() {
	return 0;
}
flash.system.System.get_vmVersion = function() {
	return "openfl - tip";
}
flash.text.FontStyle = $hxClasses["flash.text.FontStyle"] = { __ename__ : true, __constructs__ : ["REGULAR","ITALIC","BOLD_ITALIC","BOLD"] }
flash.text.FontStyle.REGULAR = ["REGULAR",0];
flash.text.FontStyle.REGULAR.toString = $estr;
flash.text.FontStyle.REGULAR.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.ITALIC = ["ITALIC",1];
flash.text.FontStyle.ITALIC.toString = $estr;
flash.text.FontStyle.ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD_ITALIC = ["BOLD_ITALIC",2];
flash.text.FontStyle.BOLD_ITALIC.toString = $estr;
flash.text.FontStyle.BOLD_ITALIC.__enum__ = flash.text.FontStyle;
flash.text.FontStyle.BOLD = ["BOLD",3];
flash.text.FontStyle.BOLD.toString = $estr;
flash.text.FontStyle.BOLD.__enum__ = flash.text.FontStyle;
flash.text.FontType = $hxClasses["flash.text.FontType"] = { __ename__ : true, __constructs__ : ["EMBEDDED","DEVICE"] }
flash.text.FontType.EMBEDDED = ["EMBEDDED",0];
flash.text.FontType.EMBEDDED.toString = $estr;
flash.text.FontType.EMBEDDED.__enum__ = flash.text.FontType;
flash.text.FontType.DEVICE = ["DEVICE",1];
flash.text.FontType.DEVICE.toString = $estr;
flash.text.FontType.DEVICE.__enum__ = flash.text.FontType;
flash.text.GridFitType = $hxClasses["flash.text.GridFitType"] = { __ename__ : true, __constructs__ : ["NONE","PIXEL","SUBPIXEL"] }
flash.text.GridFitType.NONE = ["NONE",0];
flash.text.GridFitType.NONE.toString = $estr;
flash.text.GridFitType.NONE.__enum__ = flash.text.GridFitType;
flash.text.GridFitType.PIXEL = ["PIXEL",1];
flash.text.GridFitType.PIXEL.toString = $estr;
flash.text.GridFitType.PIXEL.__enum__ = flash.text.GridFitType;
flash.text.GridFitType.SUBPIXEL = ["SUBPIXEL",2];
flash.text.GridFitType.SUBPIXEL.toString = $estr;
flash.text.GridFitType.SUBPIXEL.__enum__ = flash.text.GridFitType;
flash.text.TextField = function() {
	flash.display.InteractiveObject.call(this);
	this.mWidth = 100;
	this.mHeight = 20;
	this.mHTMLMode = false;
	this.multiline = false;
	this.__graphics = new flash.display.Graphics();
	this.mFace = flash.text.TextField.mDefaultFont;
	this.mAlign = flash.text.TextFormatAlign.LEFT;
	this.mParagraphs = new Array();
	this.mSelStart = -1;
	this.mSelEnd = -1;
	this.scrollH = 0;
	this.scrollV = 1;
	this.mType = flash.text.TextFieldType.DYNAMIC;
	this.set_autoSize("NONE");
	this.mTextHeight = 12;
	this.mMaxHeight = this.mTextHeight;
	this.mHTMLText = " ";
	this.mText = " ";
	this.mTextColour = 0;
	this.tabEnabled = false;
	this.mTryFreeType = true;
	this.selectable = true;
	this.mInsertPos = 0;
	this.__inputEnabled = false;
	this.mDownChar = 0;
	this.mSelectDrag = -1;
	this.mLineInfo = [];
	this.set_defaultTextFormat(new flash.text.TextFormat());
	this.set_borderColor(0);
	this.set_border(false);
	this.set_backgroundColor(16777215);
	this.set_background(false);
	this.gridFitType = flash.text.GridFitType.PIXEL;
	this.sharpness = 0;
};
$hxClasses["flash.text.TextField"] = flash.text.TextField;
flash.text.TextField.__name__ = ["flash","text","TextField"];
flash.text.TextField.__super__ = flash.display.InteractiveObject;
flash.text.TextField.prototype = $extend(flash.display.InteractiveObject.prototype,{
	set_wordWrap: function(inWordWrap) {
		this.wordWrap = inWordWrap;
		this.Rebuild();
		return this.get_wordWrap();
	}
	,get_wordWrap: function() {
		return this.wordWrap;
	}
	,set_width: function(inValue) {
		if(this.parent != null) this.parent.__invalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mWidth) {
			this.mWidth = inValue;
			this.Rebuild();
		}
		return this.mWidth;
	}
	,get_width: function() {
		return Math.max(this.mWidth,this.getBounds(this.get_stage()).width);
	}
	,set_type: function(inType) {
		this.mType = inType;
		this.__inputEnabled = this.mType == flash.text.TextFieldType.INPUT;
		if(this.mHTMLMode) {
			if(this.__inputEnabled) flash.Lib.__setContentEditable(this.__graphics.__surface,true); else flash.Lib.__setContentEditable(this.__graphics.__surface,false);
		} else if(this.__inputEnabled) {
			this.set_htmlText(StringTools.replace(this.mText,"\n","<BR />"));
			flash.Lib.__setContentEditable(this.__graphics.__surface,true);
		}
		this.tabEnabled = this.get_type() == flash.text.TextFieldType.INPUT;
		this.Rebuild();
		return inType;
	}
	,get_type: function() {
		return this.mType;
	}
	,get_textHeight: function() {
		return this.mMaxHeight;
	}
	,get_textWidth: function() {
		return this.mMaxWidth;
	}
	,set_textColor: function(inCol) {
		this.mTextColour = inCol;
		this.RebuildText();
		return inCol;
	}
	,get_textColor: function() {
		return this.mTextColour;
	}
	,set_text: function(inText) {
		this.mText = Std.string(inText);
		this.mHTMLMode = false;
		this.RebuildText();
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		return this.mText;
	}
	,get_text: function() {
		if(this.mHTMLMode) this.ConvertHTMLToText(false);
		return this.mText;
	}
	,set_scrollV: function(value) {
		return this.scrollV = value;
	}
	,get_scrollV: function() {
		return this.scrollV;
	}
	,set_scrollH: function(value) {
		return this.scrollH = value;
	}
	,get_scrollH: function() {
		return this.scrollH;
	}
	,get_numLines: function() {
		return 0;
	}
	,set_multiline: function(value) {
		return this.multiline = value;
	}
	,get_multiline: function() {
		return this.multiline;
	}
	,get_maxScrollV: function() {
		return 0;
	}
	,get_maxScrollH: function() {
		return 0;
	}
	,set_htmlText: function(inHTMLText) {
		this.mParagraphs = new Array();
		this.mHTMLText = inHTMLText;
		if(!this.mHTMLMode) {
			var domElement = js.Browser.document.createElement("div");
			if(this.background || this.border) {
				domElement.style.width = this.mWidth + "px";
				domElement.style.height = this.mHeight + "px";
			}
			if(this.background) domElement.style.backgroundColor = "#" + StringTools.hex(this.backgroundColor,6);
			if(this.border) domElement.style.border = "1px solid #" + StringTools.hex(this.borderColor,6);
			domElement.style.color = "#" + StringTools.hex(this.mTextColour,6);
			domElement.style.fontFamily = this.mFace;
			domElement.style.fontSize = this.mTextHeight + "px";
			domElement.style.textAlign = Std.string(this.mAlign);
			var wrapper = domElement;
			wrapper.innerHTML = inHTMLText;
			var destination = new flash.display.Graphics(wrapper);
			var __surface = this.__graphics.__surface;
			if(flash.Lib.__isOnStage(__surface)) {
				flash.Lib.__appendSurface(wrapper);
				flash.Lib.__copyStyle(__surface,wrapper);
				flash.Lib.__swapSurface(__surface,wrapper);
				flash.Lib.__removeSurface(__surface);
			}
			this.__graphics = destination;
			this.__graphics.__extent.width = wrapper.width;
			this.__graphics.__extent.height = wrapper.height;
		} else this.__graphics.__surface.innerHTML = inHTMLText;
		this.mHTMLMode = true;
		this.RebuildText();
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		return this.mHTMLText;
	}
	,get_htmlText: function() {
		return this.mHTMLText;
	}
	,set_height: function(inValue) {
		if(this.parent != null) this.parent.__invalidateBounds();
		if(this.get__boundsInvalid()) this.validateBounds();
		if(inValue != this.mHeight) {
			this.mHeight = inValue;
			this.Rebuild();
		}
		return this.mHeight;
	}
	,get_height: function() {
		return Math.max(this.mHeight,this.getBounds(this.get_stage()).height);
	}
	,set_defaultTextFormat: function(inFmt) {
		this.setTextFormat(inFmt);
		this._defaultTextFormat = inFmt;
		return inFmt;
	}
	,get_defaultTextFormat: function() {
		return this._defaultTextFormat;
	}
	,get_caretPos: function() {
		return this.mInsertPos;
	}
	,get_bottomScrollV: function() {
		return 0;
	}
	,set_borderColor: function(inBorderCol) {
		this.borderColor = inBorderCol;
		this.Rebuild();
		return inBorderCol;
	}
	,set_border: function(inBorder) {
		this.border = inBorder;
		this.Rebuild();
		return inBorder;
	}
	,set_backgroundColor: function(inCol) {
		this.backgroundColor = inCol;
		this.Rebuild();
		return inCol;
	}
	,set_background: function(inBack) {
		this.background = inBack;
		this.Rebuild();
		return inBack;
	}
	,set_autoSize: function(inAutoSize) {
		this.autoSize = inAutoSize;
		this.Rebuild();
		return inAutoSize;
	}
	,get_autoSize: function() {
		return this.autoSize;
	}
	,__render: function(inMask,clipRect) {
		if(!this.__combinedVisible) return;
		if((this.___renderFlags & 4) != 0 || (this.___renderFlags & 8) != 0) this.__validateMatrix();
		if(this.__graphics.__render(inMask,this.__filters,1,1)) {
			this.___renderFlags |= 64;
			if(this.parent != null) this.parent.___renderFlags |= 64;
			this.__applyFilters(this.__graphics.__surface);
			this.___renderFlags |= 32;
		}
		if(!this.mHTMLMode && inMask != null) {
			var m = this.getSurfaceTransform(this.__graphics);
			flash.Lib.__drawToSurface(this.__graphics.__surface,inMask,m,(this.parent != null?this.parent.__combinedAlpha:1) * this.alpha,clipRect,this.gridFitType != flash.text.GridFitType.PIXEL);
		} else {
			if((this.___renderFlags & 32) != 0) {
				var m = this.getSurfaceTransform(this.__graphics);
				flash.Lib.__setSurfaceTransform(this.__graphics.__surface,m);
				this.___renderFlags &= -33;
			}
			flash.Lib.__setSurfaceOpacity(this.__graphics.__surface,(this.parent != null?this.parent.__combinedAlpha:1) * this.alpha);
		}
	}
	,__getObjectUnderPoint: function(point) {
		if(!this.get_visible()) return null; else if(this.mText.length > 1) {
			var local = this.globalToLocal(point);
			if(local.x < 0 || local.y < 0 || local.x > this.mMaxWidth || local.y > this.mMaxHeight) return null; else return this;
		} else return flash.display.InteractiveObject.prototype.__getObjectUnderPoint.call(this,point);
	}
	,__getGraphics: function() {
		return this.__graphics;
	}
	,toString: function() {
		return "[TextField name=" + this.name + " id=" + this.___id + "]";
	}
	,setTextFormat: function(inFmt,beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		if(inFmt.font != null) this.mFace = inFmt.font;
		if(inFmt.size != null) this.mTextHeight = inFmt.size | 0;
		if(inFmt.align != null) this.mAlign = inFmt.align;
		if(inFmt.color != null) this.mTextColour = inFmt.color;
		this.RebuildText();
		this.___renderFlags |= 64;
		if(this.parent != null) this.parent.___renderFlags |= 64;
		return this.getTextFormat();
	}
	,setSelection: function(beginIndex,endIndex) {
	}
	,RenderRow: function(inRow,inY,inCharIdx,inAlign,inInsert) {
		if(inInsert == null) inInsert = 0;
		var h = 0;
		var w = 0;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			if(chr.fh > h) h = chr.fh;
			w += chr.adv;
		}
		if(w > this.mMaxWidth) this.mMaxWidth = w;
		var full_height = h * 1.2 | 0;
		var align_x = 0;
		var insert_x = 0;
		if(inInsert != null) {
			if(this.autoSize != "NONE") {
				this.scrollH = 0;
				insert_x = inInsert;
			} else {
				insert_x = inInsert - this.scrollH;
				if(insert_x < 0) this.scrollH -= (this.mLimitRenderX * 3 >> 2) - insert_x; else if(insert_x > this.mLimitRenderX) this.scrollH += insert_x - (this.mLimitRenderX * 3 >> 2);
				if(this.scrollH < 0) this.scrollH = 0;
			}
		}
		if(this.autoSize == "NONE" && w <= this.mLimitRenderX) {
			if(inAlign == flash.text.TextFormatAlign.CENTER) align_x = Math.round(this.mWidth) - w >> 1; else if(inAlign == flash.text.TextFormatAlign.RIGHT) align_x = Math.round(this.mWidth) - w;
		}
		var x_list = new Array();
		this.mLineInfo.push({ mY0 : inY, mIndex : inCharIdx - 1, mX : x_list});
		var cache_sel_font = null;
		var cache_normal_font = null;
		var x = align_x - this.scrollH;
		var x0 = x;
		var _g = 0;
		while(_g < inRow.length) {
			var chr = inRow[_g];
			++_g;
			var adv = chr.adv;
			if(x + adv > this.mLimitRenderX) break;
			x_list.push(x);
			if(x >= 0) {
				var font = chr.font;
				if(chr.sel) {
					this.__graphics.lineStyle();
					this.__graphics.beginFill(2105440);
					this.__graphics.drawRect(x,inY,adv,full_height);
					this.__graphics.endFill();
					if(cache_normal_font == chr.font) font = cache_sel_font; else {
						font = flash.text.FontInstance.CreateSolid(chr.font.GetFace(),chr.fh,16777215,1.0);
						cache_sel_font = font;
						cache_normal_font = chr.font;
					}
				}
				font.RenderChar(this.__graphics,chr.chr,x,inY + (h - chr.fh) | 0);
			}
			x += adv;
		}
		x += this.scrollH;
		return full_height;
	}
	,RebuildText: function() {
		this.mParagraphs = [];
		if(!this.mHTMLMode) {
			var font = flash.text.FontInstance.CreateSolid(this.mFace,this.mTextHeight,this.mTextColour,1.0);
			var paras = this.mText.split("\n");
			var _g = 0;
			while(_g < paras.length) {
				var paragraph = paras[_g];
				++_g;
				this.mParagraphs.push({ align : this.mAlign, spans : [{ font : font, text : paragraph + "\n"}]});
			}
		}
		this.Rebuild();
	}
	,Rebuild: function() {
		if(this.mHTMLMode) return;
		this.mLineInfo = [];
		this.__graphics.clear();
		if(this.background) {
			this.__graphics.beginFill(this.backgroundColor);
			this.__graphics.drawRect(0,0,this.get_width(),this.get_height());
			this.__graphics.endFill();
		}
		this.__graphics.lineStyle(this.mTextColour);
		var insert_x = null;
		this.mMaxWidth = 0;
		var wrap = this.mLimitRenderX = this.get_wordWrap() && !this.__inputEnabled?this.mWidth | 0:999999;
		var char_idx = 0;
		var h = 0;
		var s0 = this.mSelStart;
		var s1 = this.mSelEnd;
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var row = [];
			var row_width = 0;
			var last_word_break = 0;
			var last_word_break_width = 0;
			var last_word_char_idx = 0;
			var start_idx = char_idx;
			var tx = 0;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				var text = span.text;
				var font = span.font;
				var fh = font.get_height();
				last_word_break = row.length;
				last_word_break_width = row_width;
				last_word_char_idx = char_idx;
				var _g5 = 0, _g4 = text.length;
				while(_g5 < _g4) {
					var ch = _g5++;
					var g = HxOverrides.cca(text,ch);
					var adv = font.__getAdvance(g);
					if(g == 32) {
						last_word_break = row.length;
						last_word_break_width = tx;
						last_word_char_idx = char_idx;
					}
					if(tx + adv > wrap) {
						if(last_word_break > 0) {
							var row_end = row.splice(last_word_break,row.length - last_word_break);
							h += this.RenderRow(row,h,start_idx,paragraph.align);
							row = row_end;
							tx -= last_word_break_width;
							start_idx = last_word_char_idx;
							last_word_break = 0;
							last_word_break_width = 0;
							last_word_char_idx = 0;
							if(row_end.length > 0 && row_end[0].chr == 32) {
								row_end.shift();
								start_idx++;
							}
						} else {
							h += this.RenderRow(row,h,char_idx,paragraph.align);
							row = [];
							tx = 0;
							start_idx = char_idx;
						}
					}
					row.push({ font : font, chr : g, x : tx, fh : fh, sel : char_idx >= s0 && char_idx < s1, adv : adv});
					tx += adv;
					char_idx++;
				}
			}
			if(row.length > 0) {
				h += this.RenderRow(row,h,start_idx,paragraph.align,insert_x);
				insert_x = null;
			}
		}
		var w = this.mMaxWidth;
		if(h < this.mTextHeight) h = this.mTextHeight;
		this.mMaxHeight = h;
		var _g = this;
		switch(_g.autoSize) {
		case "LEFT":
			break;
		case "RIGHT":
			var x0 = this.get_x() + this.get_width();
			this.set_x(this.mWidth - x0);
			break;
		case "CENTER":
			var x0 = this.get_x() + this.get_width() / 2;
			this.set_x(this.mWidth / 2 - x0);
			break;
		default:
			if(this.get_wordWrap()) this.set_height(h);
		}
		if(this.border) {
			this.__graphics.endFill();
			this.__graphics.lineStyle(1,this.borderColor,1,true);
			this.__graphics.drawRect(.5,.5,this.get_width() - .5,this.get_height() - .5);
		}
	}
	,getTextFormat: function(beginIndex,endIndex) {
		if(endIndex == null) endIndex = 0;
		if(beginIndex == null) beginIndex = 0;
		return new flash.text.TextFormat(this.mFace,this.mTextHeight,this.mTextColour);
	}
	,getLineIndexAtPoint: function(inX,inY) {
		if(this.mLineInfo.length < 1) return -1;
		if(inY <= 0) return 0;
		var _g1 = 0, _g = this.mLineInfo.length;
		while(_g1 < _g) {
			var l = _g1++;
			if(this.mLineInfo[l].mY0 > inY) return l == 0?0:l - 1;
		}
		return this.mLineInfo.length - 1;
	}
	,getCharIndexAtPoint: function(inX,inY) {
		var li = this.getLineIndexAtPoint(inX,inY);
		if(li < 0) return -1;
		var line = this.mLineInfo[li];
		var idx = line.mIndex;
		var _g = 0, _g1 = line.mX;
		while(_g < _g1.length) {
			var x = _g1[_g];
			++_g;
			if(x > inX) return idx;
			idx++;
		}
		return idx;
	}
	,getCharBoundaries: function(a) {
		return null;
	}
	,DecodeColour: function(col) {
		return Std.parseInt("0x" + HxOverrides.substr(col,1,null));
	}
	,ConvertHTMLToText: function(inUnSetHTML) {
		this.mText = "";
		var _g = 0, _g1 = this.mParagraphs;
		while(_g < _g1.length) {
			var paragraph = _g1[_g];
			++_g;
			var _g2 = 0, _g3 = paragraph.spans;
			while(_g2 < _g3.length) {
				var span = _g3[_g2];
				++_g2;
				this.mText += span.text;
			}
		}
		if(inUnSetHTML) {
			this.mHTMLMode = false;
			this.RebuildText();
		}
	}
	,appendText: function(newText) {
		var _g = this;
		_g.set_text(_g.get_text() + newText);
	}
	,__class__: flash.text.TextField
	,__properties__: $extend(flash.display.InteractiveObject.prototype.__properties__,{set_autoSize:"set_autoSize",set_background:"set_background",set_backgroundColor:"set_backgroundColor",set_border:"set_border",set_borderColor:"set_borderColor",get_bottomScrollV:"get_bottomScrollV",get_caretPos:"get_caretPos",set_defaultTextFormat:"set_defaultTextFormat",get_defaultTextFormat:"get_defaultTextFormat",set_htmlText:"set_htmlText",get_htmlText:"get_htmlText",get_maxScrollH:"get_maxScrollH",get_maxScrollV:"get_maxScrollV",get_numLines:"get_numLines",set_text:"set_text",get_text:"get_text",set_textColor:"set_textColor",get_textColor:"get_textColor",get_textHeight:"get_textHeight",get_textWidth:"get_textWidth",set_type:"set_type",get_type:"get_type",set_wordWrap:"set_wordWrap",get_wordWrap:"get_wordWrap"})
});
flash.text.FontInstanceMode = $hxClasses["flash.text.FontInstanceMode"] = { __ename__ : true, __constructs__ : ["fimSolid"] }
flash.text.FontInstanceMode.fimSolid = ["fimSolid",0];
flash.text.FontInstanceMode.fimSolid.toString = $estr;
flash.text.FontInstanceMode.fimSolid.__enum__ = flash.text.FontInstanceMode;
flash.text.FontInstance = function(inFont,inHeight) {
	this.mFont = inFont;
	this.mHeight = inHeight;
	this.mTryFreeType = true;
	this.mGlyphs = [];
	this.mCacheAsBitmap = false;
};
$hxClasses["flash.text.FontInstance"] = flash.text.FontInstance;
flash.text.FontInstance.__name__ = ["flash","text","FontInstance"];
flash.text.FontInstance.CreateSolid = function(inFace,inHeight,inColour,inAlpha) {
	var id = "SOLID:" + inFace + ":" + inHeight + ":" + inColour + ":" + inAlpha;
	var f = flash.text.FontInstance.mSolidFonts.get(id);
	if(f != null) return f;
	var font = new flash.text.Font();
	font.__setScale(inHeight);
	font.set_fontName(inFace);
	if(font == null) return null;
	f = new flash.text.FontInstance(font,inHeight);
	f.SetSolid(inColour,inAlpha);
	flash.text.FontInstance.mSolidFonts.set(id,f);
	return f;
}
flash.text.FontInstance.prototype = {
	get_height: function() {
		return this.mHeight;
	}
	,__getAdvance: function(inChar) {
		if(this.mFont == null) return 0;
		return this.mFont.__getAdvance(inChar,this.mHeight);
	}
	,toString: function() {
		return "FontInstance:" + Std.string(this.mFont) + ":" + this.mColour + "(" + this.mGlyphs.length + ")";
	}
	,RenderChar: function(inGraphics,inGlyph,inX,inY) {
		inGraphics.__clearLine();
		inGraphics.beginFill(this.mColour,this.mAlpha);
		this.mFont.__render(inGraphics,inGlyph,inX,inY,this.mTryFreeType);
		inGraphics.endFill();
	}
	,SetSolid: function(inCol,inAlpha) {
		this.mColour = inCol;
		this.mAlpha = inAlpha;
		this.mMode = flash.text.FontInstanceMode.fimSolid;
	}
	,GetFace: function() {
		return this.mFont.fontName;
	}
	,__class__: flash.text.FontInstance
	,__properties__: {get_height:"get_height"}
}
flash.text.TextFieldAutoSize = function() { }
$hxClasses["flash.text.TextFieldAutoSize"] = flash.text.TextFieldAutoSize;
flash.text.TextFieldAutoSize.__name__ = ["flash","text","TextFieldAutoSize"];
flash.text.TextFieldType = function() { }
$hxClasses["flash.text.TextFieldType"] = flash.text.TextFieldType;
flash.text.TextFieldType.__name__ = ["flash","text","TextFieldType"];
flash.text.TextFormat = function(in_font,in_size,in_color,in_bold,in_italic,in_underline,in_url,in_target,in_align,in_leftMargin,in_rightMargin,in_indent,in_leading) {
	this.font = in_font;
	this.size = in_size;
	this.color = in_color;
	this.bold = in_bold;
	this.italic = in_italic;
	this.underline = in_underline;
	this.url = in_url;
	this.target = in_target;
	this.align = in_align;
	this.leftMargin = in_leftMargin;
	this.rightMargin = in_rightMargin;
	this.indent = in_indent;
	this.leading = in_leading;
};
$hxClasses["flash.text.TextFormat"] = flash.text.TextFormat;
flash.text.TextFormat.__name__ = ["flash","text","TextFormat"];
flash.text.TextFormat.prototype = {
	clone: function() {
		var newFormat = new flash.text.TextFormat(this.font,this.size,this.color,this.bold,this.italic,this.underline,this.url,this.target);
		newFormat.align = this.align;
		newFormat.leftMargin = this.leftMargin;
		newFormat.rightMargin = this.rightMargin;
		newFormat.indent = this.indent;
		newFormat.leading = this.leading;
		newFormat.blockIndent = this.blockIndent;
		newFormat.bullet = this.bullet;
		newFormat.display = this.display;
		newFormat.kerning = this.kerning;
		newFormat.letterSpacing = this.letterSpacing;
		newFormat.tabStops = this.tabStops;
		return newFormat;
	}
	,__class__: flash.text.TextFormat
}
flash.text.TextFormatAlign = $hxClasses["flash.text.TextFormatAlign"] = { __ename__ : true, __constructs__ : ["LEFT","RIGHT","JUSTIFY","CENTER"] }
flash.text.TextFormatAlign.LEFT = ["LEFT",0];
flash.text.TextFormatAlign.LEFT.toString = $estr;
flash.text.TextFormatAlign.LEFT.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.RIGHT = ["RIGHT",1];
flash.text.TextFormatAlign.RIGHT.toString = $estr;
flash.text.TextFormatAlign.RIGHT.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.JUSTIFY = ["JUSTIFY",2];
flash.text.TextFormatAlign.JUSTIFY.toString = $estr;
flash.text.TextFormatAlign.JUSTIFY.__enum__ = flash.text.TextFormatAlign;
flash.text.TextFormatAlign.CENTER = ["CENTER",3];
flash.text.TextFormatAlign.CENTER.toString = $estr;
flash.text.TextFormatAlign.CENTER.__enum__ = flash.text.TextFormatAlign;
flash.ui = {}
flash.ui.Keyboard = function() { }
$hxClasses["flash.ui.Keyboard"] = flash.ui.Keyboard;
flash.ui.Keyboard.__name__ = ["flash","ui","Keyboard"];
flash.ui.Keyboard.isAccessible = function() {
	return false;
}
flash.ui.Keyboard.__convertMozillaCode = function(code) {
	switch(code) {
	case 8:
		return 8;
	case 9:
		return 9;
	case 13:
		return 13;
	case 14:
		return 13;
	case 16:
		return 16;
	case 17:
		return 17;
	case 20:
		return 18;
	case 27:
		return 27;
	case 32:
		return 32;
	case 33:
		return 33;
	case 34:
		return 34;
	case 35:
		return 35;
	case 36:
		return 36;
	case 37:
		return 37;
	case 39:
		return 39;
	case 38:
		return 38;
	case 40:
		return 40;
	case 45:
		return 45;
	case 46:
		return 46;
	case 144:
		return 144;
	default:
		return code;
	}
}
flash.ui.Keyboard.__convertWebkitCode = function(code) {
	var _g = code.toLowerCase();
	switch(_g) {
	case "backspace":
		return 8;
	case "tab":
		return 9;
	case "enter":
		return 13;
	case "shift":
		return 16;
	case "control":
		return 17;
	case "capslock":
		return 18;
	case "escape":
		return 27;
	case "space":
		return 32;
	case "pageup":
		return 33;
	case "pagedown":
		return 34;
	case "end":
		return 35;
	case "home":
		return 36;
	case "left":
		return 37;
	case "right":
		return 39;
	case "up":
		return 38;
	case "down":
		return 40;
	case "insert":
		return 45;
	case "delete":
		return 46;
	case "numlock":
		return 144;
	case "break":
		return 19;
	}
	if(code.indexOf("U+") == 0) return Std.parseInt("0x" + HxOverrides.substr(code,3,null));
	throw "Unrecognized key code: " + code;
	return 0;
}
flash.ui.Multitouch = function() { }
$hxClasses["flash.ui.Multitouch"] = flash.ui.Multitouch;
flash.ui.Multitouch.__name__ = ["flash","ui","Multitouch"];
flash.ui.Multitouch.__properties__ = {get_supportsTouchEvents:"get_supportsTouchEvents",set_inputMode:"set_inputMode",get_inputMode:"get_inputMode"}
flash.ui.Multitouch.get_inputMode = function() {
	return flash.ui.MultitouchInputMode.TOUCH_POINT;
}
flash.ui.Multitouch.set_inputMode = function(inMode) {
	if(inMode == flash.ui.MultitouchInputMode.GESTURE) return flash.ui.Multitouch.get_inputMode();
	return inMode;
}
flash.ui.Multitouch.get_supportsTouchEvents = function() {
	var supported = Reflect.hasField(js.Browser.window,"ontouchstart");
	return supported;
}
flash.ui.MultitouchInputMode = $hxClasses["flash.ui.MultitouchInputMode"] = { __ename__ : true, __constructs__ : ["NONE","TOUCH_POINT","GESTURE"] }
flash.ui.MultitouchInputMode.NONE = ["NONE",0];
flash.ui.MultitouchInputMode.NONE.toString = $estr;
flash.ui.MultitouchInputMode.NONE.__enum__ = flash.ui.MultitouchInputMode;
flash.ui.MultitouchInputMode.TOUCH_POINT = ["TOUCH_POINT",1];
flash.ui.MultitouchInputMode.TOUCH_POINT.toString = $estr;
flash.ui.MultitouchInputMode.TOUCH_POINT.__enum__ = flash.ui.MultitouchInputMode;
flash.ui.MultitouchInputMode.GESTURE = ["GESTURE",2];
flash.ui.MultitouchInputMode.GESTURE.toString = $estr;
flash.ui.MultitouchInputMode.GESTURE.__enum__ = flash.ui.MultitouchInputMode;
flash.utils.ByteArray = function() {
	this.littleEndian = false;
	this.allocated = 0;
	this.position = 0;
	this.length = 0;
	this.___resizeBuffer(this.allocated);
};
$hxClasses["flash.utils.ByteArray"] = flash.utils.ByteArray;
flash.utils.ByteArray.__name__ = ["flash","utils","ByteArray"];
flash.utils.ByteArray.fromBytes = function(inBytes) {
	var result = new flash.utils.ByteArray();
	result.byteView = new Uint8Array(inBytes.b);
	result.set_length(result.byteView.length);
	result.allocated = result.length;
	return result;
}
flash.utils.ByteArray.__ofBuffer = function(buffer) {
	var bytes = new flash.utils.ByteArray();
	bytes.set_length(bytes.allocated = buffer.byteLength);
	bytes.data = new DataView(buffer);
	bytes.byteView = new Uint8Array(buffer);
	return bytes;
}
flash.utils.ByteArray.prototype = {
	set_length: function(value) {
		if(this.allocated < value) this.___resizeBuffer(this.allocated = Math.max(value,this.allocated * 2) | 0); else if(this.allocated > value) this.___resizeBuffer(this.allocated = value);
		this.length = value;
		return value;
	}
	,set_endian: function(endian) {
		this.littleEndian = endian == "littleEndian";
		return endian;
	}
	,get_endian: function() {
		return this.littleEndian?"littleEndian":"bigEndian";
	}
	,get_bytesAvailable: function() {
		return this.length - this.position;
	}
	,__set: function(pos,v) {
		this.data.setUint8(pos,v);
	}
	,__getBuffer: function() {
		return this.data.buffer;
	}
	,___resizeBuffer: function(len) {
		var oldByteView = this.byteView;
		var newByteView = new Uint8Array(len);
		if(oldByteView != null) {
			if(oldByteView.length <= len) newByteView.set(oldByteView); else newByteView.set(oldByteView.subarray(0,len));
		}
		this.byteView = newByteView;
		this.data = new DataView(newByteView.buffer);
	}
	,_getUTFBytesCount: function(value) {
		var count = 0;
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) count += 1; else if(c <= 2047) count += 2; else if(c <= 65535) count += 3; else count += 4;
		}
		return count;
	}
	,__get: function(pos) {
		return this.data.getUint8(pos);
	}
	,__fromBytes: function(inBytes) {
		this.byteView = new Uint8Array(inBytes.b);
		this.set_length(this.byteView.length);
		this.allocated = this.length;
	}
	,writeUTFBytes: function(value) {
		var _g1 = 0, _g = value.length;
		while(_g1 < _g) {
			var i = _g1++;
			var c = value.charCodeAt(i);
			if(c <= 127) this.writeByte(c); else if(c <= 2047) {
				this.writeByte(192 | c >> 6);
				this.writeByte(128 | c & 63);
			} else if(c <= 65535) {
				this.writeByte(224 | c >> 12);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			} else {
				this.writeByte(240 | c >> 18);
				this.writeByte(128 | c >> 12 & 63);
				this.writeByte(128 | c >> 6 & 63);
				this.writeByte(128 | c & 63);
			}
		}
	}
	,writeUTF: function(value) {
		this.writeUnsignedShort(this._getUTFBytesCount(value));
		this.writeUTFBytes(value);
	}
	,writeUnsignedShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeUnsignedInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setUint32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeShort: function(value) {
		var lengthToEnsure = this.position + 2;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt16(this.position,value,this.littleEndian);
		this.position += 2;
	}
	,writeInt: function(value) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setInt32(this.position,value,this.littleEndian);
		this.position += 4;
	}
	,writeFloat: function(x) {
		var lengthToEnsure = this.position + 4;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat32(this.position,x,this.littleEndian);
		this.position += 4;
	}
	,writeDouble: function(x) {
		var lengthToEnsure = this.position + 8;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.data.setFloat64(this.position,x,this.littleEndian);
		this.position += 8;
	}
	,writeBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Write error - Out of bounds");
		var lengthToEnsure = this.position + length;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		this.byteView.set(bytes.byteView.subarray(offset,offset + length),this.position);
		this.position += length;
	}
	,writeByte: function(value) {
		var lengthToEnsure = this.position + 1;
		if(this.length < lengthToEnsure) {
			if(this.allocated < lengthToEnsure) this.___resizeBuffer(this.allocated = Math.max(lengthToEnsure,this.allocated * 2) | 0); else if(this.allocated > lengthToEnsure) this.___resizeBuffer(this.allocated = lengthToEnsure);
			this.length = lengthToEnsure;
			lengthToEnsure;
		}
		var data = this.data;
		data.setInt8(this.position,value);
		this.position += 1;
	}
	,writeBoolean: function(value) {
		this.writeByte(value?1:0);
	}
	,toString: function() {
		var cachePosition = this.position;
		this.position = 0;
		var value = this.readUTFBytes(this.length);
		this.position = cachePosition;
		return value;
	}
	,readUTFBytes: function(len) {
		var value = "";
		var max = this.position + len;
		while(this.position < max) {
			var data = this.data;
			var c = data.getUint8(this.position++);
			if(c < 128) {
				if(c == 0) break;
				value += String.fromCharCode(c);
			} else if(c < 224) value += String.fromCharCode((c & 63) << 6 | data.getUint8(this.position++) & 127); else if(c < 240) {
				var c2 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 31) << 12 | (c2 & 127) << 6 | data.getUint8(this.position++) & 127);
			} else {
				var c2 = data.getUint8(this.position++);
				var c3 = data.getUint8(this.position++);
				value += String.fromCharCode((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | data.getUint8(this.position++) & 127);
			}
		}
		return value;
	}
	,readUTF: function() {
		var bytesCount = this.readUnsignedShort();
		return this.readUTFBytes(bytesCount);
	}
	,readUnsignedShort: function() {
		var uShort = this.data.getUint16(this.position,this.littleEndian);
		this.position += 2;
		return uShort;
	}
	,readUnsignedInt: function() {
		var uInt = this.data.getUint32(this.position,this.littleEndian);
		this.position += 4;
		return uInt;
	}
	,readUnsignedByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readShort: function() {
		var $short = this.data.getInt16(this.position,this.littleEndian);
		this.position += 2;
		return $short;
	}
	,readInt: function() {
		var $int = this.data.getInt32(this.position,this.littleEndian);
		this.position += 4;
		return $int;
	}
	,readFullBytes: function(bytes,pos,len) {
		if(this.length < len) {
			if(this.allocated < len) this.___resizeBuffer(this.allocated = Math.max(len,this.allocated * 2) | 0); else if(this.allocated > len) this.___resizeBuffer(this.allocated = len);
			this.length = len;
			len;
		}
		var _g1 = pos, _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var data = this.data;
			data.setInt8(this.position++,bytes.b[i]);
		}
	}
	,readFloat: function() {
		var $float = this.data.getFloat32(this.position,this.littleEndian);
		this.position += 4;
		return $float;
	}
	,readDouble: function() {
		var $double = this.data.getFloat64(this.position,this.littleEndian);
		this.position += 8;
		return $double;
	}
	,readBytes: function(bytes,offset,length) {
		if(offset < 0 || length < 0) throw new flash.errors.IOError("Read error - Out of bounds");
		if(offset == null) offset = 0;
		if(length == null) length = this.length;
		var lengthToEnsure = offset + length;
		if(bytes.length < lengthToEnsure) {
			if(bytes.allocated < lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = Math.max(lengthToEnsure,bytes.allocated * 2) | 0); else if(bytes.allocated > lengthToEnsure) bytes.___resizeBuffer(bytes.allocated = lengthToEnsure);
			bytes.length = lengthToEnsure;
			lengthToEnsure;
		}
		bytes.byteView.set(this.byteView.subarray(this.position,this.position + length),offset);
		bytes.position = offset;
		this.position += length;
		if(bytes.position + length > bytes.length) bytes.set_length(bytes.position + length);
	}
	,readByte: function() {
		var data = this.data;
		return data.getUint8(this.position++);
	}
	,readBoolean: function() {
		return this.readByte() != 0;
	}
	,clear: function() {
		if(this.allocated < 0) this.___resizeBuffer(this.allocated = Math.max(0,this.allocated * 2) | 0); else if(this.allocated > 0) this.___resizeBuffer(this.allocated = 0);
		this.length = 0;
		0;
	}
	,__class__: flash.utils.ByteArray
	,__properties__: {get_bytesAvailable:"get_bytesAvailable",set_endian:"set_endian",get_endian:"get_endian",set_length:"set_length"}
}
flash.utils.Endian = function() { }
$hxClasses["flash.utils.Endian"] = flash.utils.Endian;
flash.utils.Endian.__name__ = ["flash","utils","Endian"];
haxe.StackItem = $hxClasses["haxe.StackItem"] = { __ename__ : true, __constructs__ : ["CFunction","Module","FilePos","Method","Lambda"] }
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.toString = $estr;
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.StackItem.Lambda = function(v) { var $x = ["Lambda",4,v]; $x.__enum__ = haxe.StackItem; $x.toString = $estr; return $x; }
haxe.CallStack = function() { }
$hxClasses["haxe.CallStack"] = haxe.CallStack;
haxe.CallStack.__name__ = ["haxe","CallStack"];
haxe.CallStack.exceptionStack = function() {
	return [];
}
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
}
haxe.CallStack.itemToString = function(b,s) {
	var $e = (s);
	switch( $e[1] ) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = $e[2];
		b.b += "module ";
		b.b += Std.string(m);
		break;
	case 2:
		var line = $e[4], file = $e[3], s1 = $e[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		b.b += Std.string(file);
		b.b += " line ";
		b.b += Std.string(line);
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = $e[3], cname = $e[2];
		b.b += Std.string(cname);
		b.b += ".";
		b.b += Std.string(meth);
		break;
	case 4:
		var n = $e[2];
		b.b += "local function #";
		b.b += Std.string(n);
		break;
	}
}
haxe.Log = function() { }
$hxClasses["haxe.Log"] = haxe.Log;
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Resource = function() { }
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe._Template = {}
haxe._Template.TemplateExpr = $hxClasses["haxe._Template.TemplateExpr"] = { __ename__ : true, __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe.Template = function(str) {
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + Std.string(tokens.first().s) + "'";
};
$hxClasses["haxe.Template"] = haxe.Template;
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype = {
	run: function(e) {
		var $e = (e);
		switch( $e[1] ) {
		case 0:
			var v = $e[2];
			this.buf.b += Std.string(Std.string(this.resolve(v)));
			break;
		case 1:
			var e1 = $e[2];
			this.buf.b += Std.string(Std.string(e1()));
			break;
		case 2:
			var eelse = $e[4], eif = $e[3], e1 = $e[2];
			var v = e1();
			if(v == null || v == false) {
				if(eelse != null) this.run(eelse);
			} else this.run(eif);
			break;
		case 3:
			var str = $e[2];
			this.buf.b += Std.string(str);
			break;
		case 4:
			var l = $e[2];
			var $it0 = l.iterator();
			while( $it0.hasNext() ) {
				var e1 = $it0.next();
				this.run(e1);
			}
			break;
		case 5:
			var loop = $e[3], e1 = $e[2];
			var v = e1();
			try {
				var x = $iterator(v)();
				if(x.hasNext == null) throw null;
				v = x;
			} catch( e2 ) {
				try {
					if(v.hasNext == null) throw null;
				} catch( e3 ) {
					throw "Cannot iter on " + Std.string(v);
				}
			}
			this.stack.push(this.context);
			var v1 = v;
			while( v1.hasNext() ) {
				var ctx = v1.next();
				this.context = ctx;
				this.run(loop);
			}
			this.context = this.stack.pop();
			break;
		case 6:
			var params = $e[3], m = $e[2];
			var v = Reflect.field(this.macros,m);
			var pl = new Array();
			var old = this.buf;
			pl.push($bind(this,this.resolve));
			var $it1 = params.iterator();
			while( $it1.hasNext() ) {
				var p = $it1.next();
				var $e = (p);
				switch( $e[1] ) {
				case 0:
					var v1 = $e[2];
					pl.push(this.resolve(v1));
					break;
				default:
					this.buf = new StringBuf();
					this.run(p);
					pl.push(this.buf.b);
				}
			}
			this.buf = old;
			try {
				this.buf.b += Std.string(Std.string(v.apply(this.macros,pl)));
			} catch( e1 ) {
				var plstr = (function($this) {
					var $r;
					try {
						$r = pl.join(",");
					} catch( e2 ) {
						$r = "???";
					}
					return $r;
				}(this));
				var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e1) + ")";
				throw msg;
			}
			break;
		}
	}
	,makeExpr2: function(l) {
		var p = l.pop();
		if(p == null) throw "<eof>";
		if(p.s) return this.makeConst(p.p);
		switch(p.p) {
		case "(":
			var e1 = this.makeExpr(l);
			var p1 = l.pop();
			if(p1 == null || p1.s) throw p1.p;
			if(p1.p == ")") return e1;
			var e2 = this.makeExpr(l);
			var p2 = l.pop();
			if(p2 == null || p2.p != ")") throw p2.p;
			return (function($this) {
				var $r;
				switch(p1.p) {
				case "+":
					$r = function() {
						return e1() + e2();
					};
					break;
				case "-":
					$r = function() {
						return e1() - e2();
					};
					break;
				case "*":
					$r = function() {
						return e1() * e2();
					};
					break;
				case "/":
					$r = function() {
						return e1() / e2();
					};
					break;
				case ">":
					$r = function() {
						return e1() > e2();
					};
					break;
				case "<":
					$r = function() {
						return e1() < e2();
					};
					break;
				case ">=":
					$r = function() {
						return e1() >= e2();
					};
					break;
				case "<=":
					$r = function() {
						return e1() <= e2();
					};
					break;
				case "==":
					$r = function() {
						return e1() == e2();
					};
					break;
				case "!=":
					$r = function() {
						return e1() != e2();
					};
					break;
				case "&&":
					$r = function() {
						return e1() && e2();
					};
					break;
				case "||":
					$r = function() {
						return e1() || e2();
					};
					break;
				default:
					$r = (function($this) {
						var $r;
						throw "Unknown operation " + p1.p;
						return $r;
					}($this));
				}
				return $r;
			}(this));
		case "!":
			var e = this.makeExpr(l);
			return function() {
				var v = e();
				return v == null || v == false;
			};
		case "-":
			var e3 = this.makeExpr(l);
			return function() {
				return -e3();
			};
		}
		throw p.p;
	}
	,makeExpr: function(l) {
		return this.makePath(this.makeExpr2(l),l);
	}
	,makePath: function(e,l) {
		var p = l.first();
		if(p == null || p.p != ".") return e;
		l.pop();
		var field = l.pop();
		if(field == null || !field.s) throw field.p;
		var f = field.p;
		haxe.Template.expr_trim.match(f);
		f = haxe.Template.expr_trim.matched(1);
		return this.makePath(function() {
			return Reflect.field(e(),f);
		},l);
	}
	,makeConst: function(v) {
		haxe.Template.expr_trim.match(v);
		v = haxe.Template.expr_trim.matched(1);
		if(HxOverrides.cca(v,0) == 34) {
			var str = HxOverrides.substr(v,1,v.length - 2);
			return function() {
				return str;
			};
		}
		if(haxe.Template.expr_int.match(v)) {
			var i = Std.parseInt(v);
			return function() {
				return i;
			};
		}
		if(haxe.Template.expr_float.match(v)) {
			var f = Std.parseFloat(v);
			return function() {
				return f;
			};
		}
		var me = this;
		return function() {
			return me.resolve(v);
		};
	}
	,parseExpr: function(data) {
		var l = new List();
		var expr = data;
		while(haxe.Template.expr_splitter.match(data)) {
			var p = haxe.Template.expr_splitter.matchedPos();
			var k = p.pos + p.len;
			if(p.pos != 0) l.add({ p : HxOverrides.substr(data,0,p.pos), s : true});
			var p1 = haxe.Template.expr_splitter.matched(0);
			l.add({ p : p1, s : p1.indexOf("\"") >= 0});
			data = haxe.Template.expr_splitter.matchedRight();
		}
		if(data.length != 0) l.add({ p : data, s : true});
		var e;
		try {
			e = this.makeExpr(l);
			if(!l.isEmpty()) throw l.first().p;
		} catch( s ) {
			if( js.Boot.__instanceof(s,String) ) {
				throw "Unexpected '" + s + "' in " + expr;
			} else throw(s);
		}
		return function() {
			try {
				return e();
			} catch( exc ) {
				throw "Error : " + Std.string(exc) + " in " + expr;
			}
		};
	}
	,parse: function(tokens) {
		var t = tokens.pop();
		var p = t.p;
		if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
		if(t.l != null) {
			var pe = new List();
			var _g = 0, _g1 = t.l;
			while(_g < _g1.length) {
				var p1 = _g1[_g];
				++_g;
				pe.add(this.parseBlock(this.parseTokens(p1)));
			}
			return haxe._Template.TemplateExpr.OpMacro(p,pe);
		}
		if(HxOverrides.substr(p,0,3) == "if ") {
			p = HxOverrides.substr(p,3,p.length - 3);
			var e = this.parseExpr(p);
			var eif = this.parseBlock(tokens);
			var t1 = tokens.first();
			var eelse;
			if(t1 == null) throw "Unclosed 'if'";
			if(t1.p == "end") {
				tokens.pop();
				eelse = null;
			} else if(t1.p == "else") {
				tokens.pop();
				eelse = this.parseBlock(tokens);
				t1 = tokens.pop();
				if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
			} else {
				t1.p = HxOverrides.substr(t1.p,4,t1.p.length - 4);
				eelse = this.parse(tokens);
			}
			return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
		}
		if(HxOverrides.substr(p,0,8) == "foreach ") {
			p = HxOverrides.substr(p,8,p.length - 8);
			var e = this.parseExpr(p);
			var efor = this.parseBlock(tokens);
			var t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
			return haxe._Template.TemplateExpr.OpForeach(e,efor);
		}
		if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
		return haxe._Template.TemplateExpr.OpVar(p);
	}
	,parseBlock: function(tokens) {
		var l = new List();
		while(true) {
			var t = tokens.first();
			if(t == null) break;
			if(!t.s && (t.p == "end" || t.p == "else" || HxOverrides.substr(t.p,0,7) == "elseif ")) break;
			l.add(this.parse(tokens));
		}
		if(l.length == 1) return l.first();
		return haxe._Template.TemplateExpr.OpBlock(l);
	}
	,parseTokens: function(data) {
		var tokens = new List();
		while(haxe.Template.splitter.match(data)) {
			var p = haxe.Template.splitter.matchedPos();
			if(p.pos > 0) tokens.add({ p : HxOverrides.substr(data,0,p.pos), s : true, l : null});
			if(HxOverrides.cca(data,p.pos) == 58) {
				tokens.add({ p : HxOverrides.substr(data,p.pos + 2,p.len - 4), s : false, l : null});
				data = haxe.Template.splitter.matchedRight();
				continue;
			}
			var parp = p.pos + p.len;
			var npar = 1;
			while(npar > 0) {
				var c = HxOverrides.cca(data,parp);
				if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
				parp++;
			}
			var params = HxOverrides.substr(data,p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
			tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
			data = HxOverrides.substr(data,parp,data.length - parp);
		}
		if(data.length > 0) tokens.add({ p : data, s : true, l : null});
		return tokens;
	}
	,resolve: function(v) {
		if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
		var $it0 = this.stack.iterator();
		while( $it0.hasNext() ) {
			var ctx = $it0.next();
			if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
		}
		if(v == "__current__") return this.context;
		return Reflect.field(haxe.Template.globals,v);
	}
	,execute: function(context,macros) {
		this.macros = macros == null?{ }:macros;
		this.context = context;
		this.stack = new List();
		this.buf = new StringBuf();
		this.run(this.expr);
		return this.buf.b;
	}
	,__class__: haxe.Template
}
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype = {
	unserialize: function() {
		var _g = this.buf.charCodeAt(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = StringTools.urlDecode(s);
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n = this.readDigits();
			if(n < 0 || n >= this.cache.length) throw "Invalid reference";
			return this.cache[n];
		case 82:
			var n = this.readDigits();
			if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
			return this.scache[n];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 119:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name = this.unserialize();
			var edecl = this.resolver.resolveEnum(name);
			if(edecl == null) throw "Enum not found " + name;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl)[index];
			if(tag == null) throw "Unknown enum index " + name + "@" + index;
			var e = this.unserializeEnum(edecl,tag);
			this.cache.push(e);
			return e;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h = new haxe.ds.IntMap();
			this.cache.push(h);
			var buf = this.buf;
			var c = this.buf.charCodeAt(this.pos++);
			while(c == 58) {
				var i = this.readDigits();
				h.set(i,this.unserialize());
				c = this.buf.charCodeAt(this.pos++);
			}
			if(c != 104) throw "Invalid IntMap format";
			return h;
		case 77:
			var h = new haxe.ds.ObjectMap();
			this.cache.push(h);
			var buf = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s = this.unserialize();
				h.set(s,this.unserialize());
			}
			this.pos++;
			return h;
		case 118:
			var d = HxOverrides.strDate(HxOverrides.substr(this.buf,this.pos,19));
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len = this.readDigits();
			var buf = this.buf;
			if(this.buf.charCodeAt(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i = this.pos;
			var rest = len & 3;
			var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i + (len - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i < max) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				var c3 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				var c4 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c3 << 6 | c4) & 255;
			}
			if(rest >= 2) {
				var c1 = codes[buf.charCodeAt(i++)];
				var c2 = codes[buf.charCodeAt(i++)];
				bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
				if(rest == 3) {
					var c3 = codes[buf.charCodeAt(i++)];
					bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
				}
			}
			this.pos += len;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o = Type.createEmptyInstance(cl);
			this.cache.push(o);
			o.hxUnserialize(this);
			if(this.buf.charCodeAt(this.pos++) != 103) throw "Invalid custom data";
			return o;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.buf.charCodeAt(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!js.Boot.__instanceof(k,String)) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_) {
			return null;
		}}; else this.resolver = r;
	}
	,__class__: haxe.Unserializer
}
haxe.ds = {}
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,get: function(key) {
		return this.h[key];
	}
	,set: function(key,value) {
		this.h[key] = value;
	}
	,__class__: haxe.ds.IntMap
}
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ != null?key.__id__:key.__id__ = ++haxe.ds.ObjectMap.count;
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,__class__: haxe.ds.ObjectMap
}
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref["$" + i];
		}};
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,set: function(key,value) {
		this.h["$" + key] = value;
	}
	,__class__: haxe.ds.StringMap
}
haxe.io = {}
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.prototype = {
	toString: function() {
		return this.readString(0,this.length);
	}
	,readString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c2 = b[i++];
				var c3 = b[i++];
				s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
			}
		}
		return s;
	}
	,__class__: haxe.io.Bytes
}
haxe.io.Eof = function() { }
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
}
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.xml = {}
haxe.xml.Parser = function() { }
$hxClasses["haxe.xml.Parser"] = haxe.xml.Parser;
haxe.xml.Parser.__name__ = ["haxe","xml","Parser"];
haxe.xml.Parser.parse = function(str) {
	var doc = Xml.createDocument();
	haxe.xml.Parser.doParse(str,0,doc);
	return doc;
}
haxe.xml.Parser.doParse = function(str,p,parent) {
	if(p == null) p = 0;
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var c = str.charCodeAt(p);
	var buf = new StringBuf();
	while(!(c != c)) {
		switch(state) {
		case 0:
			switch(c) {
			case 10:case 13:case 9:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			switch(c) {
			case 60:
				state = 0;
				next = 2;
				break;
			default:
				start = p;
				state = 13;
				continue;
			}
			break;
		case 13:
			if(c == 60) {
				var child = Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start));
				buf = new StringBuf();
				parent.addChild(child);
				nsubs++;
				state = 0;
				next = 2;
			} else if(c == 38) {
				buf.addSub(str,start,p - start);
				state = 18;
				next = 13;
				start = p + 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				var child = Xml.createCData(HxOverrides.substr(str,start,p - start));
				parent.addChild(child);
				nsubs++;
				p += 2;
				state = 1;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") throw "Expected <![CDATA[";
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") throw "Expected <!DOCTYPE";
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) throw "Expected <!--"; else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 63:
				state = 14;
				start = p;
				break;
			case 47:
				if(parent == null) throw "Expected node name";
				start = p + 1;
				state = 0;
				next = 10;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) throw "Expected node name";
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				nsubs++;
				break;
			case 62:
				state = 9;
				nsubs++;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				var tmp;
				if(start == p) throw "Expected attribute name";
				tmp = HxOverrides.substr(str,start,p - start);
				aname = tmp;
				if(xml.exists(aname)) throw "Duplicate attribute";
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			switch(c) {
			case 61:
				state = 0;
				next = 7;
				break;
			default:
				throw "Expected =";
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				state = 8;
				start = p;
				break;
			default:
				throw "Expected \"";
			}
			break;
		case 8:
			if(c == str.charCodeAt(start)) {
				var val = HxOverrides.substr(str,start + 1,p - start - 1);
				xml.set(aname,val);
				state = 0;
				next = 4;
			}
			break;
		case 9:
			p = haxe.xml.Parser.doParse(str,p,xml);
			start = p;
			state = 1;
			break;
		case 11:
			switch(c) {
			case 62:
				state = 1;
				break;
			default:
				throw "Expected >";
			}
			break;
		case 12:
			switch(c) {
			case 62:
				if(nsubs == 0) parent.addChild(Xml.createPCData(""));
				return p;
			default:
				throw "Expected >";
			}
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) throw "Expected node name";
				var v = HxOverrides.substr(str,start,p - start);
				if(v != parent.get_nodeName()) throw "Expected </" + parent.get_nodeName() + ">";
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) nbrackets++; else if(c == 93) nbrackets--; else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				state = 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				p++;
				var str1 = HxOverrides.substr(str,start + 1,p - start - 2);
				parent.addChild(Xml.createProcessingInstruction(str1));
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var i = s.charCodeAt(1) == 120?Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)):Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += Std.string(String.fromCharCode(i));
				} else if(!haxe.xml.Parser.escapes.exists(s)) buf.b += Std.string("&" + s + ";"); else buf.b += Std.string(haxe.xml.Parser.escapes.get(s));
				start = p + 1;
				state = next;
			}
			break;
		}
		c = str.charCodeAt(++p);
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(p != start || nsubs == 0) parent.addChild(Xml.createPCData(buf.b + HxOverrides.substr(str,start,p - start)));
		return p;
	}
	throw "Unexpected end";
}
openfl.AssetCache = function() {
	this.enabled = true;
	this.bitmapData = new haxe.ds.StringMap();
	this.font = new haxe.ds.StringMap();
	this.sound = new haxe.ds.StringMap();
};
$hxClasses["openfl.AssetCache"] = openfl.AssetCache;
openfl.AssetCache.__name__ = ["openfl","AssetCache"];
openfl.AssetCache.prototype = {
	clear: function() {
		this.bitmapData = new haxe.ds.StringMap();
		this.font = new haxe.ds.StringMap();
		this.sound = new haxe.ds.StringMap();
	}
	,__class__: openfl.AssetCache
}
openfl.Assets = function() { }
$hxClasses["openfl.Assets"] = openfl.Assets;
openfl.Assets.__name__ = ["openfl","Assets"];
openfl.Assets.exists = function(id,type) {
	openfl.Assets.initialize();
	if(type == null) type = openfl.AssetType.BINARY;
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) return library.exists(symbolName,type);
	return false;
}
openfl.Assets.getBitmapData = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.bitmapData.exists(id)) {
		var bitmapData = openfl.Assets.cache.bitmapData.get(id);
		if(openfl.Assets.isValidBitmapData(bitmapData)) return bitmapData;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.IMAGE)) {
			if(library.isLocal(symbolName,openfl.AssetType.IMAGE)) {
				var bitmapData = library.getBitmapData(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.bitmapData.set(id,bitmapData);
				return bitmapData;
			} else haxe.Log.trace("[openfl.Assets] BitmapData asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 116, className : "openfl.Assets", methodName : "getBitmapData"});
		} else haxe.Log.trace("[openfl.Assets] There is no BitmapData asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 122, className : "openfl.Assets", methodName : "getBitmapData"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 128, className : "openfl.Assets", methodName : "getBitmapData"});
	return null;
}
openfl.Assets.getBytes = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.BINARY)) {
			if(library.isLocal(symbolName,openfl.AssetType.BINARY)) return library.getBytes(symbolName); else haxe.Log.trace("[openfl.Assets] String or ByteArray asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 165, className : "openfl.Assets", methodName : "getBytes"});
		} else haxe.Log.trace("[openfl.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 171, className : "openfl.Assets", methodName : "getBytes"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 177, className : "openfl.Assets", methodName : "getBytes"});
	return null;
}
openfl.Assets.getFont = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.font.exists(id)) return openfl.Assets.cache.font.get(id);
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.FONT)) {
			if(library.isLocal(symbolName,openfl.AssetType.FONT)) {
				var font = library.getFont(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.font.set(id,font);
				return font;
			} else haxe.Log.trace("[openfl.Assets] Font asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 228, className : "openfl.Assets", methodName : "getFont"});
		} else haxe.Log.trace("[openfl.Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 234, className : "openfl.Assets", methodName : "getFont"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 240, className : "openfl.Assets", methodName : "getFont"});
	return null;
}
openfl.Assets.getLibrary = function(name) {
	if(name == null || name == "") name = "default";
	return openfl.Assets.libraries.get(name);
}
openfl.Assets.getMovieClip = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MOVIE_CLIP)) {
			if(library.isLocal(symbolName,openfl.AssetType.MOVIE_CLIP)) return library.getMovieClip(symbolName); else haxe.Log.trace("[openfl.Assets] MovieClip asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 290, className : "openfl.Assets", methodName : "getMovieClip"});
		} else haxe.Log.trace("[openfl.Assets] There is no MovieClip asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 296, className : "openfl.Assets", methodName : "getMovieClip"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 302, className : "openfl.Assets", methodName : "getMovieClip"});
	return null;
}
openfl.Assets.getMusic = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) return sound;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MUSIC)) {
			if(library.isLocal(symbolName,openfl.AssetType.MUSIC)) {
				var sound = library.getMusic(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.sound.set(id,sound);
				return sound;
			} else haxe.Log.trace("[openfl.Assets] Sound asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 359, className : "openfl.Assets", methodName : "getMusic"});
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 365, className : "openfl.Assets", methodName : "getMusic"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 371, className : "openfl.Assets", methodName : "getMusic"});
	return null;
}
openfl.Assets.getPath = function(id) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,null)) return library.getPath(symbolName); else haxe.Log.trace("[openfl.Assets] There is no asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 406, className : "openfl.Assets", methodName : "getPath"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 412, className : "openfl.Assets", methodName : "getPath"});
	return null;
}
openfl.Assets.getSound = function(id,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) return sound;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.SOUND)) {
			if(library.isLocal(symbolName,openfl.AssetType.SOUND)) {
				var sound = library.getSound(symbolName);
				if(useCache && openfl.Assets.cache.enabled) openfl.Assets.cache.sound.set(id,sound);
				return sound;
			} else haxe.Log.trace("[openfl.Assets] Sound asset \"" + id + "\" exists, but only asynchronously",{ fileName : "Assets.hx", lineNumber : 469, className : "openfl.Assets", methodName : "getSound"});
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 475, className : "openfl.Assets", methodName : "getSound"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 481, className : "openfl.Assets", methodName : "getSound"});
	return null;
}
openfl.Assets.getText = function(id) {
	var bytes = openfl.Assets.getBytes(id);
	if(bytes == null) return null; else return bytes.readUTFBytes(bytes.length);
}
openfl.Assets.initialize = function() {
	if(!openfl.Assets.initialized) {
		openfl.Assets.registerLibrary("default",new DefaultAssetLibrary());
		openfl.Assets.initialized = true;
	}
}
openfl.Assets.isLocal = function(id,type,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled) {
		if(type == openfl.AssetType.IMAGE || type == null) {
			if(openfl.Assets.cache.bitmapData.exists(id)) return true;
		}
		if(type == openfl.AssetType.FONT || type == null) {
			if(openfl.Assets.cache.font.exists(id)) return true;
		}
		if(type == openfl.AssetType.SOUND || type == openfl.AssetType.MUSIC || type == null) {
			if(openfl.Assets.cache.sound.exists(id)) return true;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) return library.isLocal(symbolName,type);
	return false;
}
openfl.Assets.isValidBitmapData = function(bitmapData) {
	return true;
}
openfl.Assets.isValidSound = function(sound) {
	return true;
}
openfl.Assets.loadBitmapData = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.bitmapData.exists(id)) {
		var bitmapData = openfl.Assets.cache.bitmapData.get(id);
		if(openfl.Assets.isValidBitmapData(bitmapData)) {
			handler(bitmapData);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.IMAGE)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadBitmapData(symbolName,function(bitmapData) {
				openfl.Assets.cache.bitmapData.set(id,bitmapData);
				handler(bitmapData);
			}); else library.loadBitmapData(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no BitmapData asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 663, className : "openfl.Assets", methodName : "loadBitmapData"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 669, className : "openfl.Assets", methodName : "loadBitmapData"});
	handler(null);
}
openfl.Assets.loadBytes = function(id,handler) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.BINARY)) {
			library.loadBytes(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no String or ByteArray asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 699, className : "openfl.Assets", methodName : "loadBytes"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 705, className : "openfl.Assets", methodName : "loadBytes"});
	handler(null);
}
openfl.Assets.loadFont = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.font.exists(id)) {
		handler(openfl.Assets.cache.font.get(id));
		return;
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.FONT)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadFont(symbolName,function(font) {
				openfl.Assets.cache.font.set(id,font);
				handler(font);
			}); else library.loadFont(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no Font asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 756, className : "openfl.Assets", methodName : "loadFont"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 762, className : "openfl.Assets", methodName : "loadFont"});
	handler(null);
}
openfl.Assets.loadLibrary = function(name,handler) {
	openfl.Assets.initialize();
	var data = openfl.Assets.getText("libraries/" + name + ".dat");
	if(data != null && data != "") {
		var unserializer = new haxe.Unserializer(data);
		unserializer.setResolver({ resolveEnum : openfl.Assets.resolveEnum, resolveClass : openfl.Assets.resolveClass});
		var library = unserializer.unserialize();
		openfl.Assets.libraries.set(name,library);
		library.load(handler);
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + name + "\"",{ fileName : "Assets.hx", lineNumber : 792, className : "openfl.Assets", methodName : "loadLibrary"});
}
openfl.Assets.loadMusic = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) {
			handler(sound);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MUSIC)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadMusic(symbolName,function(sound) {
				openfl.Assets.cache.sound.set(id,sound);
				handler(sound);
			}); else library.loadMusic(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 847, className : "openfl.Assets", methodName : "loadMusic"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 853, className : "openfl.Assets", methodName : "loadMusic"});
	handler(null);
}
openfl.Assets.loadMovieClip = function(id,handler) {
	openfl.Assets.initialize();
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.MOVIE_CLIP)) {
			library.loadMovieClip(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no MovieClip asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 883, className : "openfl.Assets", methodName : "loadMovieClip"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 889, className : "openfl.Assets", methodName : "loadMovieClip"});
	handler(null);
}
openfl.Assets.loadSound = function(id,handler,useCache) {
	if(useCache == null) useCache = true;
	openfl.Assets.initialize();
	if(useCache && openfl.Assets.cache.enabled && openfl.Assets.cache.sound.exists(id)) {
		var sound = openfl.Assets.cache.sound.get(id);
		if(openfl.Assets.isValidSound(sound)) {
			handler(sound);
			return;
		}
	}
	var libraryName = id.substring(0,id.indexOf(":"));
	var symbolName = HxOverrides.substr(id,id.indexOf(":") + 1,null);
	var library = openfl.Assets.getLibrary(libraryName);
	if(library != null) {
		if(library.exists(symbolName,openfl.AssetType.SOUND)) {
			if(useCache && openfl.Assets.cache.enabled) library.loadSound(symbolName,function(sound) {
				openfl.Assets.cache.sound.set(id,sound);
				handler(sound);
			}); else library.loadSound(symbolName,handler);
			return;
		} else haxe.Log.trace("[openfl.Assets] There is no Sound asset with an ID of \"" + id + "\"",{ fileName : "Assets.hx", lineNumber : 946, className : "openfl.Assets", methodName : "loadSound"});
	} else haxe.Log.trace("[openfl.Assets] There is no asset library named \"" + libraryName + "\"",{ fileName : "Assets.hx", lineNumber : 952, className : "openfl.Assets", methodName : "loadSound"});
	handler(null);
}
openfl.Assets.loadText = function(id,handler) {
	openfl.Assets.initialize();
	var callback = function(bytes) {
		if(bytes == null) handler(null); else handler(bytes.readUTFBytes(bytes.length));
	};
	openfl.Assets.loadBytes(id,callback);
}
openfl.Assets.registerLibrary = function(name,library) {
	if(openfl.Assets.libraries.exists(name)) openfl.Assets.unloadLibrary(name);
	openfl.Assets.libraries.set(name,library);
}
openfl.Assets.resolveClass = function(name) {
	return Type.resolveClass(name);
}
openfl.Assets.resolveEnum = function(name) {
	var value = Type.resolveEnum(name);
	return value;
}
openfl.Assets.unloadLibrary = function(name) {
	openfl.Assets.initialize();
	var keys = openfl.Assets.cache.bitmapData.keys();
	while( keys.hasNext() ) {
		var key = keys.next();
		var libraryName = key.substring(0,key.indexOf(":"));
		var symbolName = HxOverrides.substr(key,key.indexOf(":") + 1,null);
		if(libraryName == name) openfl.Assets.cache.bitmapData.remove(key);
	}
	openfl.Assets.libraries.remove(name);
}
openfl.AssetData = function() {
};
$hxClasses["openfl.AssetData"] = openfl.AssetData;
openfl.AssetData.__name__ = ["openfl","AssetData"];
openfl.AssetData.prototype = {
	__class__: openfl.AssetData
}
openfl.AssetType = $hxClasses["openfl.AssetType"] = { __ename__ : true, __constructs__ : ["BINARY","FONT","IMAGE","MOVIE_CLIP","MUSIC","SOUND","TEMPLATE","TEXT"] }
openfl.AssetType.BINARY = ["BINARY",0];
openfl.AssetType.BINARY.toString = $estr;
openfl.AssetType.BINARY.__enum__ = openfl.AssetType;
openfl.AssetType.FONT = ["FONT",1];
openfl.AssetType.FONT.toString = $estr;
openfl.AssetType.FONT.__enum__ = openfl.AssetType;
openfl.AssetType.IMAGE = ["IMAGE",2];
openfl.AssetType.IMAGE.toString = $estr;
openfl.AssetType.IMAGE.__enum__ = openfl.AssetType;
openfl.AssetType.MOVIE_CLIP = ["MOVIE_CLIP",3];
openfl.AssetType.MOVIE_CLIP.toString = $estr;
openfl.AssetType.MOVIE_CLIP.__enum__ = openfl.AssetType;
openfl.AssetType.MUSIC = ["MUSIC",4];
openfl.AssetType.MUSIC.toString = $estr;
openfl.AssetType.MUSIC.__enum__ = openfl.AssetType;
openfl.AssetType.SOUND = ["SOUND",5];
openfl.AssetType.SOUND.toString = $estr;
openfl.AssetType.SOUND.__enum__ = openfl.AssetType;
openfl.AssetType.TEMPLATE = ["TEMPLATE",6];
openfl.AssetType.TEMPLATE.toString = $estr;
openfl.AssetType.TEMPLATE.__enum__ = openfl.AssetType;
openfl.AssetType.TEXT = ["TEXT",7];
openfl.AssetType.TEXT.toString = $estr;
openfl.AssetType.TEXT.__enum__ = openfl.AssetType;
openfl.display = {}
openfl.display.Tilesheet = function(image) {
	this.__bitmap = image;
	this.__centerPoints = new Array();
	this.__tileRects = new Array();
	this.__tileUVs = new Array();
};
$hxClasses["openfl.display.Tilesheet"] = openfl.display.Tilesheet;
openfl.display.Tilesheet.__name__ = ["openfl","display","Tilesheet"];
openfl.display.Tilesheet.prototype = {
	getTileUVs: function(index) {
		return this.__tileUVs[index];
	}
	,getTileRect: function(index) {
		return this.__tileRects[index];
	}
	,getTileCenter: function(index) {
		return this.__centerPoints[index];
	}
	,drawTiles: function(graphics,tileData,smooth,flags) {
		if(flags == null) flags = 0;
		if(smooth == null) smooth = false;
		graphics.drawTiles(this,tileData,smooth,flags);
	}
	,addTileRect: function(rectangle,centerPoint) {
		this.__tileRects.push(rectangle);
		if(centerPoint == null) centerPoint = new flash.geom.Point();
		this.__centerPoints.push(centerPoint);
		this.__tileUVs.push(new flash.geom.Rectangle(rectangle.get_left() / this.__bitmap.get_width(),rectangle.get_top() / this.__bitmap.get_height(),rectangle.get_right() / this.__bitmap.get_width(),rectangle.get_bottom() / this.__bitmap.get_height()));
		return this.__tileRects.length - 1;
	}
	,__class__: openfl.display.Tilesheet
}
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; };
if(Array.prototype.indexOf) HxOverrides.remove = function(a,o) {
	var i = a.indexOf(o);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
Array.prototype.__class__ = $hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
Xml.Element = "element";
Xml.PCData = "pcdata";
Xml.CData = "cdata";
Xml.Comment = "comment";
Xml.DocType = "doctype";
Xml.ProcessingInstruction = "processingInstruction";
Xml.Document = "document";
flash.ui.Multitouch.maxTouchPoints = 2;
flash.ui.Multitouch.supportedGestures = [];
flash.ui.Multitouch.supportsGestureEvents = false;
haxe.Resource.content = [{ name : "__ASSET__font_04b_03___ttf", data : "s73634:b3k0Omhhc2hxOjExMW95Njphc2NlbnRkNzY4eTQ6ZGF0YWFkMzg0ZDg5NC45NzZkMzg0ZDY0MS4wMjRkMTI4ZDY0MS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMTI4ZDg5NmQwZDg5NmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDUxMmQ2NDBkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoeTY6X3dpZHRoZDY0MHk0OnhNYXhkNTEyeTQ6eE1pbmQweTQ6eU1heGQ1MTJ5NDp5TWluZDB5NzpfaGVpZ2h0ZDUxMnk3OmxlYWRpbmdkMHk3OmRlc2NlbnRkMjU2eTg6Y2hhckNvZGVpMTExeTE1OmxlZnRzaWRlQmVhcmluZ2QweTEyOmFkdmFuY2VXaWR0aGQ2NDB5ODpjb21tYW5kc2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMjNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIyM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTEwb1IxZDc2OFIyYWQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDEwMjRkMTI4ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ2NDBoUjNkNjQwUjRkNTEyUjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMTBSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaGc6MjIyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMjJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwOW9SMWQ3NjhSMmFkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkMTAyNGQzODRkMTAyNGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQwZDUxMmQ1MTJkMTAyNGQ2NDBkMTAyNGQ2NDBkNjQwZDUxMmQ2NDBkNTEyZDEwMjRoUjNkNzY4UjRkNjQwUjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMDlSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMjFvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIyMVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA4b1IxZDc2OFIyYWQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQxMjhkMTAyNGQxMjhkMzg0aFIzZDI1NlI0ZDEyOFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMTA4UjEyZDBSMTNkMjU2UjE0YWkxaTJpMmkyaTJoZzoyMjBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIyMFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA3b1IxZDc2OFIyYWQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMzg0ZDg5NmQzODRkNjQwZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMDdSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjE5b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMTlSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwNm9SMWQ3NjhSMmFkMjU2ZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDI1NmQ2NDBkMTI4ZDY0MGQxMjhkMTE1MmQyNTZkMTE1MmQyNTZkNjQwZDEyOGQxMTUyZDBkMTE1MmQwZDEyODBkMTI4ZDEyODBkMTI4ZDExNTJoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZC0yNTZSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMDZSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjE4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMThSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwNW9SMWQ3NjhSMmFkMTI4ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMTI4ZDY0MGQwZDY0MGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGhSM2QyNTZSNGQxMjhSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTEwNVIxMmQwUjEzZDI1NlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIxN29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjE3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDRvUjFkNzY4UjJhZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMTI4ZDUxMmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMDRSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIxNm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjE2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDNvUjFkNzY4UjJhZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDEyOGQxMTUyZDM4NGQxMTUyZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDUxMmQ1MTJkNTEyZDExNTJkMzg0ZDExNTJkMzg0ZDEyODBkMTI4ZDEyODBkMTI4ZDExNTJoUjNkNjQwUjRkNTEyUjVkMFI2ZDUxMlI3ZC0yNTZSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMDNSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjE1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDJvUjFkNzY4UjJhZDM4NGQzODRkMjU2ZDM4NGQyNTZkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQxMjhkNTEyZDEyOGQ2NDBkMGQ2NDBkMGQ3NjhkMTI4ZDc2OGQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMTI4ZDUxMmhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTEwMlIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIxNFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAxb1IxZDc2OFIyYWQyNTZkNzY2Ljk3NmQyNTZkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkNzY2Ljk3NmQyNTZkNzY2Ljk3NmQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNzY4ZDI1NmQ3NjhkMjU2ZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTAxUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIxM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAwb1IxZDc2OFIyYWQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmQxMjhkNjQwZDEyOGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDUxMmQzODRkNTEyZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQwZDg5NmQwZDY0MGQxMjhkNjQwaFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMTAwUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjEyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMTJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk5b1IxZDc2OFIyYWQzODRkNjQwZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMTI4ZDY0MGQwZDY0MGQwZDg5NmQxMjhkODk2ZDEyOGQ2NDBkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpOTlSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjExb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMTFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk4b1IxZDc2OFIyYWQzODRkNjQwZDUxMmQ2NDBkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDBkMTAyNGQwZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpOThSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMTBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIxMFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTdvUjFkNzY4UjJhZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkMFI4ZDUxMlI5ZDBSMTBkMjU2UjExaTk3UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwOVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTZvUjFkNzY4UjJhZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDEyOGQ2NDBoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZDM4NFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTk2UjEyZDBSMTNkMzg0UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjA4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMDhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk1b1IxZDc2OFIyYWQwZDg5NmQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQwZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkMTI4UjdkMFI4ZDEyOFI5ZDBSMTBkMjU2UjExaTk1UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJoZzoyMDdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwN1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTRvUjFkNzY4UjJhZDEyOGQzODRkMTI4ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDM4NGQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQ2NDBkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwaFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QzODRSOGQ2NDBSOWQwUjEwZDI1NlIxMWk5NFIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwNlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTNvUjFkNzY4UjJhZDI1NmQxMDI0ZDI1NmQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQyNTZkMTAyNGhSM2QzODRSNGQyNTZSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTkzUjEyZDBSMTNkMzg0UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmhnOjIwNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjA1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5Mm9SMWQ3NjhSMmFkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDEyOGQzODRkMTI4ZDUxMmQwZDUxMmQwZDM4NGQxMjhkMzg0ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkNjQwZDM4NGQ3NjhkNjQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQ2NDBkODk2ZDY0MGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpOTJSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwNFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTFvUjFkNzY4UjJhZDBkMzg0ZDBkMTAyNGQyNTZkMTAyNGQyNTZkODk2ZDEyOGQ4OTZkMTI4ZDUxMmQyNTZkNTEyZDI1NmQzODRkMGQzODRoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk5MVIxMmQwUjEzZDM4NFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTBvUjFkNzY4UjJhZDM4NGQzODRkMGQzODRkMGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDM4NGQyNTZkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQyNTZkNzY4ZDI1NmQ2NDBkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQ3NjhkMGQ3NjhkMGQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpOTBSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJoZzoyMDJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwMlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODlvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDEyOGQ4OTZkMTI4ZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODlSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDFvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwMVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODhvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMTI4ZDc2OGQwZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk4OFIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIwMG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjAwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4N29SMWQ3NjhSMmFkMTI4ZDM4NGQwZDM4NGQwZDg5NmQxMjhkODk2ZDEyOGQzODRkMzg0ZDUxMmQyNTZkNTEyZDI1NmQ4OTZkMzg0ZDg5NmQzODRkNTEyZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDM4NGQ1MTJkODk2ZDY0MGQ4OTZkNjQwZDM4NGQ1MTJkMzg0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5OVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODZvUjFkNzY4UjJhZDBkODk2ZDEyOGQ4OTZkMTI4ZDM4NGQwZDM4NGQwZDg5NmQyNTZkODk2ZDM4NGQ4OTZkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ4OTZkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQzODRkMzg0ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTg2UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOThvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5OFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODVvUjFkNzY4UjJhZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDg5NmQxMjhkMzg0ZDBkMzg0ZDBkODk2ZDEyOGQ4OTZkMTI4ZDM4NGQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTg1UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE5N29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTk3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4NG9SMWQ3NjhSMmFkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDUxMmQzODRkNTEyZDM4NGQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMTAyNGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTg0UjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmhnOjE5Nm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTk2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4M29SMWQ3NjhSMmFkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQzODRkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQzODRkMTI4ZDM4NGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkNTEyZDg5NmQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDg5NmQ1MTJkODk2ZDBkODk2ZDBkMTAyNGQzODRkMTAyNGQzODRkODk2ZDBkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODNSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODJvUjFkNzY4UjJhZDUxMmQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEwLjk3NmQxMjhkNTEwLjk3NmQxMjhkNzY2Ljk3NmQzODRkNzY2Ljk3NmQzODRkNTEyZDUxMmQ1MTJkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTgyUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxOTRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgxb1IxZDc2OFIyYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRkNTEyZDExNTJkMzg0ZDExNTJkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkLTEyOFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTgxUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkzb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxOTNSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgwb1IxZDc2OFIyYWQzODRkNTEyZDUxMmQ1MTJkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEyZDEyOGQ3NjYuOTc2ZDM4NGQ3NjYuOTc2ZDM4NGQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ3NjYuOTc2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODBSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5MlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzlvUjFkNzY4UjJhZDM4NGQ4OTQuOTc2ZDM4NGQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDEyOGQ4OTZkMGQ4OTZkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDM4NGQzODRkMzg0ZDUxMmQ1MTJkNTEyZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNzlSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxOTFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjc4b1IxZDc2OFIyYWQzODRkNzY4ZDM4NGQxMDI0ZDUxMmQxMDI0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQzODRkNzY4ZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTc4UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE5MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTkwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3N29SMWQ3NjhSMmFkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQxMjhkMTAyNGQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQxMDI0ZDY0MGQxMDI0ZDY0MGQzODRkNTEyZDM4NGQ1MTJkNTEyaFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNzdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE4OW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTg5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3Nm9SMWQ3NjhSMmFkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQzODRkMGQzODRkMGQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNzZSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJoZzoxODhvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE4OFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzVvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhkMjU2ZDc2OGQyNTZkNjQwZDEyOGQ2NDBkMTI4ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ4OTZkMzg0ZDc2OGQyNTZkNzY4ZDI1NmQ4OTZkMzg0ZDg5NmQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk3NVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTg3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxODdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjc0b1IxZDc2OFIyYWQyNTZkMzg0ZDI1NmQ1MTJkMzg0ZDUxMmQzODRkODk2ZDUxMmQ4OTZkNTEyZDM4NGQyNTZkMzg0ZDBkNzY4ZDBkODk2ZDEyOGQ4OTZkMTI4ZDc2OGQwZDc2OGQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTc0UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxODZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE4NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzNvUjFkNzY4UjJhZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDg5NmQwZDg5NmQwZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQyNTZkODk2ZDI1NmQ1MTJoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk3M1IxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4NW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTg1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3Mm9SMWQ3NjhSMmFkMzg0ZDY0MGQxMjhkNjQwZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhkMzg0ZDc2OGQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTcyUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTg0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxODRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjcxb1IxZDc2OFIyYWQ1MTJkNTEyZDUxMmQzODRkMTI4ZDM4NGQxMjhkNTEyZDUxMmQ1MTJkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkNTEyZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQzODRkODk2ZDM4NGQ3NjhkMjU2ZDc2OGQyNTZkNjQwZDUxMmQ2NDBkNTEyZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk3MVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE4M29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTgzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3MG9SMWQ3NjhSMmFkMTI4ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTcwUjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxODJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE4MlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjlvUjFkNzY4UjJhZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDBkMTAyNGQzODRkMTAyNGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTY5UjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTgxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxODFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY4b1IxZDc2OFIyYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNjhSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE4MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTgwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2N29SMWQ3NjhSMmFkMzg0ZDUxMmQzODRkMzg0ZDEyOGQzODRkMTI4ZDUxMmQzODRkNTEyZDEyOGQ1MTJkMGQ1MTJkMGQ4OTZkMTI4ZDg5NmQxMjhkNTEyZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTY3UjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3OW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTc5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2Nm9SMWQ3NjhSMmFkMTI4ZDYzOC45NzZkMzg0ZDYzOC45NzZkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDYzOC45NzZkMzg0ZDc2OS4wMjRkMTI4ZDc2OS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMzg0ZDc2OS4wMjRkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDBkMTAyNGQwZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk2NlIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTc4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNzhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY1b1IxZDc2OFIyYWQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDBkMTAyNGQwZDUxMmQxMjhkNTEyZDM4NGQ3NjhkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDc2OGQzODRkNzY4aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNjVSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTc3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNzdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY0b1IxZDc2OFIyYWQ1MTJkODk0Ljk3NmQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDg5NC45NzZkNTEyZDg5NC45NzZkNTEyZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDg5NC45NzZkMjU2ZDg5NC45NzZkMjU2ZDY0MGQ1MTJkNjQwZDUxMmQ1MTMuMDI0ZDY0MGQ1MTJkNjQwZDg5NmQ1MTJkODk2ZDUxMmQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDUxMmQzODRkNTEyZDUxMmQ2NDBkNTEyaFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNjRSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNzZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE3NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjNvUjFkNzY4UjJhZDBkMzg0ZDBkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQzODRkNTEyZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQxMjhkNjQwZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTYzUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE3NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjJvUjFkNzY4UjJhZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQxMjhkNTEyZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDg5NmQyNTZkODk2ZDI1NmQ3NjhkMTI4ZDc2OGQxMjhkODk2ZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQwZDg5NmQwZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk2MlIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3NG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTc0UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2MW9SMWQ3NjhSMmFkMGQ1MTJkMGQ2NDBkMzg0ZDY0MGQzODRkNTEyZDBkNTEyZDBkNzY4ZDBkODk2ZDM4NGQ4OTZkMzg0ZDc2OGQwZDc2OGhSM2Q1MTJSNGQzODRSNWQwUjZkNTEyUjdkMTI4UjhkNTEyUjlkMFIxMGQyNTZSMTFpNjFSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE3M1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjBvUjFkNzY4UjJhZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQyNTZkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQyNTZkMzg0ZDI1NmQ1MTJkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDI1NmQ4OTZkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQ4OTZkMjU2ZDg5NmQzODRkMTAyNGQzODRkODk2ZDI1NmQ4OTZkMjU2ZDEwMjRkMzg0ZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk2MFIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3Mm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTcyUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1OW9SMWQ3NjhSMmFkMTI4ZDUxMmQwZDUxMmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMTI4ZDc2OGQwZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGhSM2QyNTZSNGQxMjhSNWQwUjZkNTEyUjdkMFI4ZDUxMlI5ZDBSMTBkMjU2UjExaTU5UjEyZDBSMTNkMjU2UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTcxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNzFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU4b1IxZDc2OFIyYWQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQ2NDBkMGQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDBkNzY4ZDBkODk2aFIzZDI1NlI0ZDEyOFI1ZDBSNmQ1MTJSN2QxMjhSOGQ1MTJSOWQwUjEwZDI1NlIxMWk1OFIxMmQwUjEzZDI1NlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTcwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1N29SMWQ3NjhSMmFkMTI4ZDUxMy4wMjRkMTI4ZDYzOC45NzZkMzg0ZDYzOC45NzZkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDg5NmQzODRkODk2ZDM4NGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTU3UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY5b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjlSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU2b1IxZDc2OFIyYWQzODRkNjM4Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkNjM4Ljk3NmQzODRkNjM4Ljk3NmQzODRkODk0Ljk3NmQzODRkNzY5LjAyNGQxMjhkNzY5LjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNzY4ZDEyOGQ3NjhkMTI4ZDY0MGQwZDY0MGQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDY0MGQzODRkNjQwZDM4NGQ3NjhkNTEyZDc2OGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTU2UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU1b1IxZDc2OFIyYWQwZDM4NGQwZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkMzg0ZDBkMzg0ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ3NjhkMTI4ZDc2OGQxMjhkMTAyNGQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk1NVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTY3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU0b1IxZDc2OFIyYWQzODRkODk0Ljk3NmQzODRkNzY5LjAyNGQxMjhkNzY5LjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNTRSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE2NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTNvUjFkNzY4UjJhZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQzODRkMGQzODRkMGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkNzY4ZDM4NGQxMDI0ZDM4NGQ4OTZkMGQ4OTZkMGQxMDI0ZDM4NGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNTNSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNjVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE2NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTJvUjFkNzY4UjJhZDEyOGQ2NDEuMDI0ZDEyOGQ3NjhkMjU2ZDc2OGQyNTZkNjQxLjAyNGQxMjhkNjQxLjAyNGQzODRkMzg0ZDM4NGQ3NjhkNTEyZDc2OGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQwZDg5NmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDM4NGQzODRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk1MlIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjUxb1IxZDc2OFIyYWQwZDM4NGQwZDUxMmQzODRkNTEyZDM4NGQzODRkMGQzODRkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQ1MTJkODk2ZDUxMmQ3NjhkMzg0ZDc2OGQzODRkODk2ZDUxMmQ4OTZkMGQ4OTZkMGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMGQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk1MVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE2M29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTYzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1MG9SMWQ3NjhSMmFkMGQzODRkMGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQxMjhkNjQwZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMGQxMDI0ZDUxMmQxMDI0ZDUxMmQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDBkNzY4ZDBkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTUwUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaGc6MTYyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ5b1IxZDc2OFIyYWQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDEwMjRoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk0OVIxMmQwUjEzZDM4NFIxNGFpMWkyaTJpMmkyaTJpMmhnOjE2MW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTYxUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0OG9SMWQ3NjhSMmFkMzg0ZDg5NC45NzZkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMTI4ZDg5NmQwZDg5NmQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk0OFIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjBvUjFkNzY4UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMFIxMGQyNTZSMTFpMTYwUjEyZDBSMTNkNTEyUjE0YWhnOjQ3b1IxZDc2OFIyYWQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDM4NGQ1MTJkNTEyZDY0MGQ1MTJkNjQwZDM4NGQ1MTJkMzg0ZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNDdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNTlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1OVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDZvUjFkNzY4UjJhZDBkMTAyNGQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkMTAyNGhSM2QyNTZSNGQxMjhSNWQwUjZkMTI4UjdkMFI4ZDEyOFI5ZDBSMTBkMjU2UjExaTQ2UjEyZDBSMTNkMjU2UjE0YWkxaTJpMmkyaTJoZzoxNThvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1OFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDVvUjFkNzY4UjJhZDBkNjQwZDBkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQwZDY0MGhSM2Q1MTJSNGQzODRSNWQwUjZkMzg0UjdkMjU2UjhkMzg0UjlkMFIxMGQyNTZSMTFpNDVSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmhnOjE1N29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTU3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0NG9SMWQ3NjhSMmFkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDBkMTE1MmQxMjhkMTE1MmQxMjhkMTAyNGQwZDEwMjRkMGQxMTUyaFIzZDM4NFI0ZDI1NlI1ZDBSNmQxMjhSN2QtMTI4UjhkMTI4UjlkMFIxMGQyNTZSMTFpNDRSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNTZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDNvUjFkNzY4UjJhZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmhSM2Q1MTJSNGQzODRSNWQwUjZkNTEyUjdkMTI4UjhkNTEyUjlkMFIxMGQyNTZSMTFpNDNSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNTVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDJvUjFkNzY4UjJhZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDEyOGQ2NDBkMjU2ZDY0MGQzODRkNTEyZDM4NGQzODRkMjU2ZDM4NGQyNTZkNTEyZDM4NGQ1MTJkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQzODRkNzY4aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QyNTZSOGQ2NDBSOWQwUjEwZDI1NlIxMWk0MlIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE1NG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTU0UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0MW9SMWQ3NjhSMmFkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkODk2ZDI1NmQ4OTZkMjU2ZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIzZDM4NFI0ZDI1NlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNDFSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTUzb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNTNSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQwb1IxZDc2OFIyYWQyNTZkMzg0ZDEyOGQzODRkMTI4ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDI1NmQxMDI0aFIzZDM4NFI0ZDI1NlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNDBSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTUyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNTJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM5b1IxZDc2OFIyYWQxMjhkMzg0ZDBkMzg0ZDBkNjQwZDEyOGQ2NDBkMTI4ZDM4NGhSM2QyNTZSNGQxMjhSNWQwUjZkNjQwUjdkMzg0UjhkNjQwUjlkMFIxMGQyNTZSMTFpMzlSMTJkMFIxM2QyNTZSMTRhaTFpMmkyaTJpMmhnOjE1MW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTUxUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozOG9SMWQ3NjhSMmFkMzg0ZDc2OS4wMjRkMTI4ZDc2OS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMzg0ZDc2OS4wMjRkNjQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ2NDBkNjQwZDY0MGQ2NDBkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQ2NDBkODk2ZDY0MGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMzhSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNTBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1MFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzdvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRkMjU2ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNzY4ZDUxMmQ4OTZkNTEyZDEwMjRkNjQwZDEwMjRkNjQwZDg5NmQ1MTJkODk2aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMzdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0OVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzZvUjFkNzY4UjJhZDM4NGQzODRkMjU2ZDM4NGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQwZDY0MGQwZDc2OGQyNTZkNzY4ZDI1NmQ2NDBkNTEyZDY0MGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDg5NmQwZDEwMjRkMjU2ZDEwMjRkMjU2ZDExNTJkMzg0ZDExNTJkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQ3NjhkMjU2ZDc2OGQyNTZkODk2ZDBkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QtMTI4UjhkNjQwUjlkMFIxMGQyNTZSMTFpMzZSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTQ4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNDhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM1b1IxZDc2OFIyYWQ2NDBkNjQwZDY0MGQ1MTJkNTEyZDUxMmQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDM4NGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQwZDc2OGQwZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDY0MGQ4OTZkNjQwZDc2OGQ1MTJkNzY4ZDUxMmQ2NDBkNjQwZDY0MGQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkNjQwZDM4NGQ3NjhoUjNkNzY4UjRkNjQwUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkzNVIxMmQwUjEzZDc2OFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0N29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTQ3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozNG9SMWQ3NjhSMmFkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDBkMzg0ZDBkNjQwZDI1NmQ2NDBkMzg0ZDY0MGQzODRkMzg0ZDI1NmQzODRkMjU2ZDY0MGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMzg0UjhkNjQwUjlkMFIxMGQyNTZSMTFpMzRSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzNvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ3NjhkMTI4ZDc2OGQxMjhkMzg0ZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoUjNkMjU2UjRkMTI4UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkzM1IxMmQwUjEzZDI1NlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0NW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTQ1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozMm9SMWQ3NjhSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQwUjEwZDI1NlIxMWkzMlIxMmQwUjEzZDUxMlIxNGFoZzoxNDRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0NFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQzb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNDNSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1NW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjU1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0MlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjU0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNTRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0MW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTQxUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNTNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI1M1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQwb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNDBSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1Mm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjUyUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzOVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjUxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNTFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzOG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTM4UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNTBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI1MFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTM3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMzdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0OW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQ5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzNlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNDhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTM1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI0N1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTM0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMzRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0Nm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQ2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ1b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNDVSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzMm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTMyUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI0NFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTMxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMzFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0M29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzMFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNDJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyOW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTI5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDFvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI0MVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTI4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMjhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEyN1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjM5b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzlSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyNm9SMWQ3NjhSMmFkMTI4ZDM4NGQxMjhkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQxMjhkMzg0ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQwZDUxMmQwZDY0MGQzODRkNTEyZDUxMmQ1MTJkNTEyZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwaFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QzODRSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjZSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIzOG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjM4UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjVvUjFkNzY4UjJhZDI1NmQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDM4NGQxMjhkODk2ZDBkODk2ZDBkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjVSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMzdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIzN1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTI0b1IxZDc2OFIyYWQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDM4NGQwZDM4NGQwZDEwMjRoUjNkMjU2UjRkMTI4UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjRSMTJkMFIxM2QyNTZSMTRhaTFpMmkyaTJpMmhnOjIzNm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjM2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjNvUjFkNzY4UjJhZDEyOGQzODRkMTI4ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDEyOGQzODRkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjNSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJoZzoyMzVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIzNVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTIyb1IxZDc2OFIyYWQwZDUxMmQwZDY0MGQyNTZkNjQwZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQwZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDI1NmQ4OTZkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMjJSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjM0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyMW9SMWQ3NjhSMmFkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkMzg0ZDEwMjRkMzg0ZDExNTJkNTEyZDExNTJkNTEyZDUxMmQzODRkNTEyZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGQxMjhkMTE1MmQxMjhkMTI4MGQzODRkMTI4MGQzODRkMTE1MmQxMjhkMTE1MmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkLTI1NlI4ZDUxMlI5ZDBSMTBkMjU2UjExaTEyMVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIzM29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjMzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjBvUjFkNzY4UjJhZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQwZDUxMmQzODRkNTEyZDI1NmQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNjQwZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMzg0ZDEwMjRkMzg0ZDg5NmQyNTZkODk2ZDI1NmQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTIwUjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExOW9SMWQ3NjhSMmFkMTI4ZDUxMmQwZDUxMmQwZDc2OGQxMjhkNzY4ZDEyOGQ1MTJkNTEyZDc2OGQ2NDBkNzY4ZDY0MGQ1MTJkNTEyZDUxMmQ1MTJkNzY4ZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDUxMmQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRkMzg0ZDEwMjRkNTEyZDEwMjRkNTEyZDc2OGQzODRkNzY4ZDM4NGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE5UjEyZDBSMTNkNzY4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExOG9SMWQ3NjhSMmFkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNzY4ZDEyOGQ3NjhkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ3NjhkMTI4ZDc2OGQyNTZkODk2ZDM4NGQ4OTZkMzg0ZDc2OGQyNTZkNzY4ZDI1NmQ4OTZkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE4UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMwb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzBSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExN29SMWQ3NjhSMmFkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDUxMmQxMDI0ZDUxMmQ1MTJkMzg0ZDUxMmQzODRkODk2ZDEyOGQ1MTJkMGQ1MTJkMGQ4OTZkMTI4ZDg5NmQxMjhkNTEyaFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE3UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIyOW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTZvUjFkNzY4UjJhZDI1NmQzODRkMTI4ZDM4NGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDg5NmQyNTZkODk2ZDI1NmQ2NDBkMzg0ZDY0MGQzODRkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQzODRkMTAyNGQzODRkODk2ZDI1NmQ4OTZkMjU2ZDEwMjRkMzg0ZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMTZSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjI4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMjhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExNW9SMWQ3NjhSMmFkMTI4ZDUxMmQxMjhkNjQwZDBkNjQwZDBkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMTI4ZDUxMmQwZDg5NmQwZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQ3NjhkMjU2ZDc2OGQyNTZkODk2ZDBkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE1UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjIyN29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTRvUjFkNzY4UjJhZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDUxMmQxMjhkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhoUjNkNTEyUjRkMzg0UjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMTRSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjIyNm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTNvUjFkNzY4UjJhZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQxMjgwZDM4NGQxMjgwZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkLTI1NlI4ZDUxMlI5ZDBSMTBkMjU2UjExaTExM1IxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIyNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTJvUjFkNzY4UjJhZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDEyODBkMGQxMjgwZDBkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkLTI1NlI4ZDUxMlI5ZDBSMTBkMjU2UjExaTExMlIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIyNG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI0UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZ2h5ODpmb250TmFtZXk1OjA0YjAzZw"},{ name : "__ASSET__font_5", data : "s73634:b3k0Omhhc2hxOjExMW95Njphc2NlbnRkNzY4eTQ6ZGF0YWFkMzg0ZDg5NC45NzZkMzg0ZDY0MS4wMjRkMTI4ZDY0MS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMTI4ZDg5NmQwZDg5NmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDUxMmQ2NDBkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoeTY6X3dpZHRoZDY0MHk0OnhNYXhkNTEyeTQ6eE1pbmQweTQ6eU1heGQ1MTJ5NDp5TWluZDB5NzpfaGVpZ2h0ZDUxMnk3OmxlYWRpbmdkMHk3OmRlc2NlbnRkMjU2eTg6Y2hhckNvZGVpMTExeTE1OmxlZnRzaWRlQmVhcmluZ2QweTEyOmFkdmFuY2VXaWR0aGQ2NDB5ODpjb21tYW5kc2FpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMjNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIyM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTEwb1IxZDc2OFIyYWQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDEwMjRkMTI4ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ2NDBoUjNkNjQwUjRkNTEyUjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMTBSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaGc6MjIyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMjJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwOW9SMWQ3NjhSMmFkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkMTAyNGQzODRkMTAyNGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQwZDUxMmQ1MTJkMTAyNGQ2NDBkMTAyNGQ2NDBkNjQwZDUxMmQ2NDBkNTEyZDEwMjRoUjNkNzY4UjRkNjQwUjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMDlSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMjFvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIyMVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA4b1IxZDc2OFIyYWQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQxMjhkMTAyNGQxMjhkMzg0aFIzZDI1NlI0ZDEyOFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMTA4UjEyZDBSMTNkMjU2UjE0YWkxaTJpMmkyaTJoZzoyMjBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIyMFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTA3b1IxZDc2OFIyYWQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMzg0ZDg5NmQzODRkNjQwZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMDdSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjE5b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMTlSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwNm9SMWQ3NjhSMmFkMjU2ZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDI1NmQ2NDBkMTI4ZDY0MGQxMjhkMTE1MmQyNTZkMTE1MmQyNTZkNjQwZDEyOGQxMTUyZDBkMTE1MmQwZDEyODBkMTI4ZDEyODBkMTI4ZDExNTJoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZC0yNTZSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMDZSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjE4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMThSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEwNW9SMWQ3NjhSMmFkMTI4ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMTI4ZDY0MGQwZDY0MGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGhSM2QyNTZSNGQxMjhSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTEwNVIxMmQwUjEzZDI1NlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIxN29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjE3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDRvUjFkNzY4UjJhZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMTI4ZDUxMmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMDRSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIxNm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjE2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDNvUjFkNzY4UjJhZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDEyOGQxMTUyZDM4NGQxMTUyZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDUxMmQ1MTJkNTEyZDExNTJkMzg0ZDExNTJkMzg0ZDEyODBkMTI4ZDEyODBkMTI4ZDExNTJoUjNkNjQwUjRkNTEyUjVkMFI2ZDUxMlI3ZC0yNTZSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMDNSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIxNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjE1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMDJvUjFkNzY4UjJhZDM4NGQzODRkMjU2ZDM4NGQyNTZkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQxMjhkNTEyZDEyOGQ2NDBkMGQ2NDBkMGQ3NjhkMTI4ZDc2OGQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMTI4ZDUxMmhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTEwMlIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIxNFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAxb1IxZDc2OFIyYWQyNTZkNzY2Ljk3NmQyNTZkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkNzY2Ljk3NmQyNTZkNzY2Ljk3NmQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNzY4ZDI1NmQ3NjhkMjU2ZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTAxUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoyMTNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIxM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTAwb1IxZDc2OFIyYWQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmQxMjhkNjQwZDEyOGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDUxMmQzODRkNTEyZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQwZDg5NmQwZDY0MGQxMjhkNjQwaFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMTAwUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MjEyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMTJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk5b1IxZDc2OFIyYWQzODRkNjQwZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMTI4ZDY0MGQwZDY0MGQwZDg5NmQxMjhkODk2ZDEyOGQ2NDBkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpOTlSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjExb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMTFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk4b1IxZDc2OFIyYWQzODRkNjQwZDUxMmQ2NDBkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDBkMTAyNGQwZDM4NGQxMjhkMzg0ZDEyOGQ1MTJkMzg0ZDUxMmQzODRkNjQwZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpOThSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMTBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIxMFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTdvUjFkNzY4UjJhZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkMFI4ZDUxMlI5ZDBSMTBkMjU2UjExaTk3UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwOVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTZvUjFkNzY4UjJhZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDEyOGQ2NDBoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZDM4NFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTk2UjEyZDBSMTNkMzg0UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjA4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMDhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjk1b1IxZDc2OFIyYWQwZDg5NmQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQwZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkMTI4UjdkMFI4ZDEyOFI5ZDBSMTBkMjU2UjExaTk1UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJoZzoyMDdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwN1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTRvUjFkNzY4UjJhZDEyOGQzODRkMTI4ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDM4NGQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQ2NDBkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwaFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QzODRSOGQ2NDBSOWQwUjEwZDI1NlIxMWk5NFIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwNlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTNvUjFkNzY4UjJhZDI1NmQxMDI0ZDI1NmQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQyNTZkMTAyNGhSM2QzODRSNGQyNTZSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTkzUjEyZDBSMTNkMzg0UjE0YWkxaTJpMmkyaTJpMmkyaTJpMmhnOjIwNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjA1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo5Mm9SMWQ3NjhSMmFkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDEyOGQzODRkMTI4ZDUxMmQwZDUxMmQwZDM4NGQxMjhkMzg0ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkNjQwZDM4NGQ3NjhkNjQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQ2NDBkODk2ZDY0MGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpOTJSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwNFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTFvUjFkNzY4UjJhZDBkMzg0ZDBkMTAyNGQyNTZkMTAyNGQyNTZkODk2ZDEyOGQ4OTZkMTI4ZDUxMmQyNTZkNTEyZDI1NmQzODRkMGQzODRoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk5MVIxMmQwUjEzZDM4NFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJoZzoyMDNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6OTBvUjFkNzY4UjJhZDM4NGQzODRkMGQzODRkMGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDM4NGQyNTZkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQyNTZkNzY4ZDI1NmQ2NDBkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQ3NjhkMGQ3NjhkMGQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpOTBSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJoZzoyMDJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwMlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODlvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDEyOGQ4OTZkMTI4ZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODlSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMDFvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIwMVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODhvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMTI4ZDc2OGQwZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk4OFIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIwMG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjAwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4N29SMWQ3NjhSMmFkMTI4ZDM4NGQwZDM4NGQwZDg5NmQxMjhkODk2ZDEyOGQzODRkMzg0ZDUxMmQyNTZkNTEyZDI1NmQ4OTZkMzg0ZDg5NmQzODRkNTEyZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDM4NGQ1MTJkODk2ZDY0MGQ4OTZkNjQwZDM4NGQ1MTJkMzg0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5OVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODZvUjFkNzY4UjJhZDBkODk2ZDEyOGQ4OTZkMTI4ZDM4NGQwZDM4NGQwZDg5NmQyNTZkODk2ZDM4NGQ4OTZkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ4OTZkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQzODRkMzg0ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTg2UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOThvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5OFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODVvUjFkNzY4UjJhZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDg5NmQxMjhkMzg0ZDBkMzg0ZDBkODk2ZDEyOGQ4OTZkMTI4ZDM4NGQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTg1UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE5N29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTk3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4NG9SMWQ3NjhSMmFkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDUxMmQzODRkNTEyZDM4NGQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMTAyNGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTg0UjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmhnOjE5Nm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTk2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo4M29SMWQ3NjhSMmFkMGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQzODRkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQzODRkMTI4ZDM4NGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkNTEyZDg5NmQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDg5NmQ1MTJkODk2ZDBkODk2ZDBkMTAyNGQzODRkMTAyNGQzODRkODk2ZDBkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODNSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6ODJvUjFkNzY4UjJhZDUxMmQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEwLjk3NmQxMjhkNTEwLjk3NmQxMjhkNzY2Ljk3NmQzODRkNzY2Ljk3NmQzODRkNTEyZDUxMmQ1MTJkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTgyUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTk0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxOTRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgxb1IxZDc2OFIyYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRkNTEyZDExNTJkMzg0ZDExNTJkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkLTEyOFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTgxUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkzb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxOTNSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjgwb1IxZDc2OFIyYWQzODRkNTEyZDUxMmQ1MTJkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEyZDEyOGQ3NjYuOTc2ZDM4NGQ3NjYuOTc2ZDM4NGQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ3NjYuOTc2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpODBSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoxOTJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE5MlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzlvUjFkNzY4UjJhZDM4NGQ4OTQuOTc2ZDM4NGQ1MTMuMDI0ZDEyOGQ1MTMuMDI0ZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDEyOGQ4OTZkMGQ4OTZkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDM4NGQzODRkMzg0ZDUxMmQ1MTJkNTEyZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNzlSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTkxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxOTFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjc4b1IxZDc2OFIyYWQzODRkNzY4ZDM4NGQxMDI0ZDUxMmQxMDI0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQzODRkNzY4ZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTc4UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE5MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTkwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3N29SMWQ3NjhSMmFkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDBkMTAyNGQxMjhkMTAyNGQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQxMDI0ZDY0MGQxMDI0ZDY0MGQzODRkNTEyZDM4NGQ1MTJkNTEyaFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNzdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE4OW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTg5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3Nm9SMWQ3NjhSMmFkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQzODRkMGQzODRkMGQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNzZSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJoZzoxODhvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE4OFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzVvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhkMjU2ZDc2OGQyNTZkNjQwZDEyOGQ2NDBkMTI4ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ4OTZkMzg0ZDc2OGQyNTZkNzY4ZDI1NmQ4OTZkMzg0ZDg5NmQ1MTJkMTAyNGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkNTEyZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk3NVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTg3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxODdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjc0b1IxZDc2OFIyYWQyNTZkMzg0ZDI1NmQ1MTJkMzg0ZDUxMmQzODRkODk2ZDUxMmQ4OTZkNTEyZDM4NGQyNTZkMzg0ZDBkNzY4ZDBkODk2ZDEyOGQ4OTZkMTI4ZDc2OGQwZDc2OGQxMjhkODk2ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTc0UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxODZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE4NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NzNvUjFkNzY4UjJhZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDg5NmQwZDg5NmQwZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQyNTZkODk2ZDI1NmQ1MTJoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk3M1IxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjE4NW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTg1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3Mm9SMWQ3NjhSMmFkMzg0ZDY0MGQxMjhkNjQwZDEyOGQzODRkMGQzODRkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhkMzg0ZDc2OGQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTcyUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTg0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxODRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjcxb1IxZDc2OFIyYWQ1MTJkNTEyZDUxMmQzODRkMTI4ZDM4NGQxMjhkNTEyZDUxMmQ1MTJkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkNTEyZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQzODRkODk2ZDM4NGQ3NjhkMjU2ZDc2OGQyNTZkNjQwZDUxMmQ2NDBkNTEyZDEwMjRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk3MVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE4M29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTgzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo3MG9SMWQ3NjhSMmFkMTI4ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTcwUjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxODJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE4MlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjlvUjFkNzY4UjJhZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDBkMTAyNGQzODRkMTAyNGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTY5UjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTgxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxODFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY4b1IxZDc2OFIyYWQzODRkODk0Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkMTAyNGQwZDEwMjRkMGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNjhSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjE4MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTgwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2N29SMWQ3NjhSMmFkMzg0ZDUxMmQzODRkMzg0ZDEyOGQzODRkMTI4ZDUxMmQzODRkNTEyZDEyOGQ1MTJkMGQ1MTJkMGQ4OTZkMTI4ZDg5NmQxMjhkNTEyZDM4NGQxMDI0ZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTY3UjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3OW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTc5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2Nm9SMWQ3NjhSMmFkMTI4ZDYzOC45NzZkMzg0ZDYzOC45NzZkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDYzOC45NzZkMzg0ZDc2OS4wMjRkMTI4ZDc2OS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMzg0ZDc2OS4wMjRkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDBkMTAyNGQwZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk2NlIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTc4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNzhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY1b1IxZDc2OFIyYWQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDBkMTAyNGQwZDUxMmQxMjhkNTEyZDM4NGQ3NjhkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDc2OGQzODRkNzY4aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNjVSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTc3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNzdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjY0b1IxZDc2OFIyYWQ1MTJkODk0Ljk3NmQ1MTJkNzY4ZDM4NGQ3NjhkMzg0ZDg5NC45NzZkNTEyZDg5NC45NzZkNTEyZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDg5NC45NzZkMjU2ZDg5NC45NzZkMjU2ZDY0MGQ1MTJkNjQwZDUxMmQ1MTMuMDI0ZDY0MGQ1MTJkNjQwZDg5NmQ1MTJkODk2ZDUxMmQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDUxMmQzODRkNTEyZDUxMmQ2NDBkNTEyaFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNjRSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNzZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE3NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjNvUjFkNzY4UjJhZDBkMzg0ZDBkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQzODRkNTEyZDM4NGQ2NDBkMTI4ZDY0MGQxMjhkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQxMjhkNjQwZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTYzUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE3NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjJvUjFkNzY4UjJhZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQxMjhkNTEyZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDg5NmQyNTZkODk2ZDI1NmQ3NjhkMTI4ZDc2OGQxMjhkODk2ZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmQwZDg5NmQwZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk2MlIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3NG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTc0UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo2MW9SMWQ3NjhSMmFkMGQ1MTJkMGQ2NDBkMzg0ZDY0MGQzODRkNTEyZDBkNTEyZDBkNzY4ZDBkODk2ZDM4NGQ4OTZkMzg0ZDc2OGQwZDc2OGhSM2Q1MTJSNGQzODRSNWQwUjZkNTEyUjdkMTI4UjhkNTEyUjlkMFIxMGQyNTZSMTFpNjFSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNzNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE3M1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NjBvUjFkNzY4UjJhZDEyOGQ2NDBkMjU2ZDY0MGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQyNTZkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQyNTZkMzg0ZDI1NmQ1MTJkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDI1NmQ4OTZkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQ4OTZkMjU2ZDg5NmQzODRkMTAyNGQzODRkODk2ZDI1NmQ4OTZkMjU2ZDEwMjRkMzg0ZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk2MFIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3Mm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTcyUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1OW9SMWQ3NjhSMmFkMTI4ZDUxMmQwZDUxMmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMTI4ZDc2OGQwZDc2OGQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDc2OGhSM2QyNTZSNGQxMjhSNWQwUjZkNTEyUjdkMFI4ZDUxMlI5ZDBSMTBkMjU2UjExaTU5UjEyZDBSMTNkMjU2UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTcxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNzFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU4b1IxZDc2OFIyYWQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQ2NDBkMGQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDBkNzY4ZDBkODk2aFIzZDI1NlI0ZDEyOFI1ZDBSNmQ1MTJSN2QxMjhSOGQ1MTJSOWQwUjEwZDI1NlIxMWk1OFIxMmQwUjEzZDI1NlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE3MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTcwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1N29SMWQ3NjhSMmFkMTI4ZDUxMy4wMjRkMTI4ZDYzOC45NzZkMzg0ZDYzOC45NzZkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDg5NmQzODRkODk2ZDM4NGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkNTEyZDUxMmQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTU3UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY5b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjlSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU2b1IxZDc2OFIyYWQzODRkNjM4Ljk3NmQzODRkNTEzLjAyNGQxMjhkNTEzLjAyNGQxMjhkNjM4Ljk3NmQzODRkNjM4Ljk3NmQzODRkODk0Ljk3NmQzODRkNzY5LjAyNGQxMjhkNzY5LjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNzY4ZDEyOGQ3NjhkMTI4ZDY0MGQwZDY0MGQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDY0MGQzODRkNjQwZDM4NGQ3NjhkNTEyZDc2OGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDg5NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTU2UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU1b1IxZDc2OFIyYWQwZDM4NGQwZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkMzg0ZDBkMzg0ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ3NjhkMTI4ZDc2OGQxMjhkMTAyNGQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk1NVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTY3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjU0b1IxZDc2OFIyYWQzODRkODk0Ljk3NmQzODRkNzY5LjAyNGQxMjhkNzY5LjAyNGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQxMjhkODk2ZDBkODk2ZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNTRSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE2NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTNvUjFkNzY4UjJhZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQzODRkMGQzODRkMGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkNTEyZDc2OGQzODRkNzY4ZDM4NGQ4OTZkNTEyZDg5NmQ1MTJkNzY4ZDM4NGQxMDI0ZDM4NGQ4OTZkMGQ4OTZkMGQxMDI0ZDM4NGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNTNSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNjVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE2NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NTJvUjFkNzY4UjJhZDEyOGQ2NDEuMDI0ZDEyOGQ3NjhkMjU2ZDc2OGQyNTZkNjQxLjAyNGQxMjhkNjQxLjAyNGQzODRkMzg0ZDM4NGQ3NjhkNTEyZDc2OGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQwZDg5NmQwZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMjU2ZDUxMmQyNTZkMzg0ZDM4NGQzODRoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk1MlIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTY0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjUxb1IxZDc2OFIyYWQwZDM4NGQwZDUxMmQzODRkNTEyZDM4NGQzODRkMGQzODRkMzg0ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMTI4ZDY0MGQ1MTJkODk2ZDUxMmQ3NjhkMzg0ZDc2OGQzODRkODk2ZDUxMmQ4OTZkMGQ4OTZkMGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMGQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk1MVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE2M29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTYzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo1MG9SMWQ3NjhSMmFkMGQzODRkMGQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDBkMzg0ZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQxMjhkNjQwZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDEyOGQ2NDBkMGQxMDI0ZDUxMmQxMDI0ZDUxMmQ4OTZkMTI4ZDg5NmQxMjhkNzY4ZDBkNzY4ZDBkMTAyNGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNjQwUjdkMFI4ZDY0MFI5ZDBSMTBkMjU2UjExaTUwUjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaGc6MTYyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNjJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQ5b1IxZDc2OFIyYWQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkMzg0ZDBkMzg0ZDBkNTEyZDEyOGQ1MTJkMTI4ZDEwMjRoUjNkMzg0UjRkMjU2UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk0OVIxMmQwUjEzZDM4NFIxNGFpMWkyaTJpMmkyaTJpMmhnOjE2MW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTYxUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0OG9SMWQ3NjhSMmFkMzg0ZDg5NC45NzZkMzg0ZDUxMy4wMjRkMTI4ZDUxMy4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMTI4ZDg5NmQwZDg5NmQwZDUxMmQxMjhkNTEyZDEyOGQzODRkMzg0ZDM4NGQzODRkNTEyZDUxMmQ1MTJkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWk0OFIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNjBvUjFkNzY4UjJhaFIzZDUxMlI0ZDBSNWQwUjZkMFI3ZDBSOGQwUjlkMFIxMGQyNTZSMTFpMTYwUjEyZDBSMTNkNTEyUjE0YWhnOjQ3b1IxZDc2OFIyYWQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQzODRkNTEyZDM4NGQ2NDBkNTEyZDM4NGQ1MTJkNTEyZDY0MGQ1MTJkNjQwZDM4NGQ1MTJkMzg0ZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNDdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNTlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1OVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDZvUjFkNzY4UjJhZDBkMTAyNGQxMjhkMTAyNGQxMjhkODk2ZDBkODk2ZDBkMTAyNGhSM2QyNTZSNGQxMjhSNWQwUjZkMTI4UjdkMFI4ZDEyOFI5ZDBSMTBkMjU2UjExaTQ2UjEyZDBSMTNkMjU2UjE0YWkxaTJpMmkyaTJoZzoxNThvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1OFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDVvUjFkNzY4UjJhZDBkNjQwZDBkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQwZDY0MGhSM2Q1MTJSNGQzODRSNWQwUjZkMzg0UjdkMjU2UjhkMzg0UjlkMFIxMGQyNTZSMTFpNDVSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmhnOjE1N29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTU3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0NG9SMWQ3NjhSMmFkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDBkMTE1MmQxMjhkMTE1MmQxMjhkMTAyNGQwZDEwMjRkMGQxMTUyaFIzZDM4NFI0ZDI1NlI1ZDBSNmQxMjhSN2QtMTI4UjhkMTI4UjlkMFIxMGQyNTZSMTFpNDRSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNTZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDNvUjFkNzY4UjJhZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmhSM2Q1MTJSNGQzODRSNWQwUjZkNTEyUjdkMTI4UjhkNTEyUjlkMFIxMGQyNTZSMTFpNDNSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNTVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1NVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6NDJvUjFkNzY4UjJhZDEyOGQ1MTJkMTI4ZDM4NGQwZDM4NGQwZDUxMmQxMjhkNTEyZDI1NmQ2NDBkMjU2ZDUxMmQxMjhkNTEyZDEyOGQ2NDBkMjU2ZDY0MGQzODRkNTEyZDM4NGQzODRkMjU2ZDM4NGQyNTZkNTEyZDM4NGQ1MTJkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQ3NjhkMzg0ZDc2OGQzODRkNjQwZDI1NmQ2NDBkMjU2ZDc2OGQzODRkNzY4aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ2NDBSN2QyNTZSOGQ2NDBSOWQwUjEwZDI1NlIxMWk0MlIxMmQwUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE1NG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTU0UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzo0MW9SMWQ3NjhSMmFkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDBkMzg0ZDI1NmQ1MTJkMTI4ZDUxMmQxMjhkODk2ZDI1NmQ4OTZkMjU2ZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQxMjhkMTAyNGQxMjhkODk2aFIzZDM4NFI0ZDI1NlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNDFSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTUzb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNTNSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjQwb1IxZDc2OFIyYWQyNTZkMzg0ZDEyOGQzODRkMTI4ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDI1NmQxMDI0aFIzZDM4NFI0ZDI1NlI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpNDBSMTJkMFIxM2QzODRSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTUyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNTJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM5b1IxZDc2OFIyYWQxMjhkMzg0ZDBkMzg0ZDBkNjQwZDEyOGQ2NDBkMTI4ZDM4NGhSM2QyNTZSNGQxMjhSNWQwUjZkNjQwUjdkMzg0UjhkNjQwUjlkMFIxMGQyNTZSMTFpMzlSMTJkMFIxM2QyNTZSMTRhaTFpMmkyaTJpMmhnOjE1MW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTUxUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozOG9SMWQ3NjhSMmFkMzg0ZDc2OS4wMjRkMTI4ZDc2OS4wMjRkMTI4ZDg5NC45NzZkMzg0ZDg5NC45NzZkMzg0ZDc2OS4wMjRkNjQwZDEwMjRkNTEyZDEwMjRkNTEyZDg5NmQzODRkODk2ZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNTEyZDEyOGQ1MTJkMTI4ZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDM4NGQ2NDBkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ2NDBkNjQwZDY0MGQ2NDBkNzY4ZDUxMmQ3NjhkNTEyZDg5NmQ2NDBkODk2ZDY0MGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMzhSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJoZzoxNTBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE1MFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzdvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkMzg0ZDUxMmQzODRkMzg0ZDM4NGQzODRkNjQwZDUxMmQ2NDBkNTEyZDM4NGQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRkMjU2ZDc2OGQzODRkNzY4ZDM4NGQ2NDBkMjU2ZDY0MGQyNTZkNzY4ZDUxMmQ4OTZkNTEyZDEwMjRkNjQwZDEwMjRkNjQwZDg5NmQ1MTJkODk2aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ2NDBSN2QwUjhkNjQwUjlkMFIxMGQyNTZSMTFpMzdSMTJkMFIxM2Q3NjhSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0OVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzZvUjFkNzY4UjJhZDM4NGQzODRkMjU2ZDM4NGQyNTZkNTEyZDEyOGQ1MTJkMTI4ZDY0MGQwZDY0MGQwZDc2OGQyNTZkNzY4ZDI1NmQ2NDBkNTEyZDY0MGQ1MTJkNTEyZDM4NGQ1MTJkMzg0ZDM4NGQwZDg5NmQwZDEwMjRkMjU2ZDEwMjRkMjU2ZDExNTJkMzg0ZDExNTJkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQ3NjhkMjU2ZDc2OGQyNTZkODk2ZDBkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QtMTI4UjhkNjQwUjlkMFIxMGQyNTZSMTFpMzZSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaGc6MTQ4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNDhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjM1b1IxZDc2OFIyYWQ2NDBkNjQwZDY0MGQ1MTJkNTEyZDUxMmQ1MTJkMzg0ZDM4NGQzODRkMzg0ZDUxMmQyNTZkNTEyZDI1NmQzODRkMTI4ZDM4NGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDc2OGQwZDc2OGQwZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDI1NmQxMDI0ZDI1NmQ4OTZkMzg0ZDg5NmQzODRkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDY0MGQ4OTZkNjQwZDc2OGQ1MTJkNzY4ZDUxMmQ2NDBkNjQwZDY0MGQzODRkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQzODRkNjQwZDM4NGQ3NjhoUjNkNzY4UjRkNjQwUjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkzNVIxMmQwUjEzZDc2OFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0N29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTQ3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozNG9SMWQ3NjhSMmFkMGQ2NDBkMTI4ZDY0MGQxMjhkMzg0ZDBkMzg0ZDBkNjQwZDI1NmQ2NDBkMzg0ZDY0MGQzODRkMzg0ZDI1NmQzODRkMjU2ZDY0MGhSM2Q1MTJSNGQzODRSNWQwUjZkNjQwUjdkMzg0UjhkNjQwUjlkMFIxMGQyNTZSMTFpMzRSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0NlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MzNvUjFkNzY4UjJhZDEyOGQzODRkMGQzODRkMGQ3NjhkMTI4ZDc2OGQxMjhkMzg0ZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZoUjNkMjU2UjRkMTI4UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkzM1IxMmQwUjEzZDI1NlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0NW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTQ1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzozMm9SMWQ3NjhSMmFoUjNkNTEyUjRkMFI1ZDBSNmQwUjdkMFI4ZDBSOWQwUjEwZDI1NlIxMWkzMlIxMmQwUjEzZDUxMlIxNGFoZzoxNDRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0NFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQzb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNDNSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1NW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjU1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxNDJvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTE0MlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjU0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNTRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjE0MW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTQxUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNTNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI1M1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTQwb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxNDBSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI1Mm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjUyUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzlvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzOVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjUxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNTFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzOG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTM4UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNTBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI1MFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTM3b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMzdSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0OW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQ5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzZvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzNlIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNDhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTM1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI0N1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTM0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMzRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0Nm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQ2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzNvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzM1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQ1b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNDVSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEzMm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTMyUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDRvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI0NFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTMxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMzFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0M29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMzBvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEzMFIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjQyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyNDJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyOW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMTI5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoyNDFvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTI0MVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTI4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkxMjhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjI0MG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjQwUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTEyN1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjM5b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzlSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyNm9SMWQ3NjhSMmFkMTI4ZDM4NGQxMjhkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQxMjhkMzg0ZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQwZDUxMmQwZDY0MGQzODRkNTEyZDUxMmQ1MTJkNTEyZDM4NGQzODRkMzg0ZDM4NGQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwaFIzZDY0MFI0ZDUxMlI1ZDBSNmQ2NDBSN2QzODRSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjZSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjIzOG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjM4UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjVvUjFkNzY4UjJhZDI1NmQzODRkMGQzODRkMGQ1MTJkMTI4ZDUxMmQxMjhkNjQwZDI1NmQ2NDBkMjU2ZDM4NGQxMjhkODk2ZDBkODk2ZDBkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDg5NmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDY0MGQyNTZkNjQwZDI1NmQ3NjhoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjVSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJoZzoyMzdvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIzN1IxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTI0b1IxZDc2OFIyYWQwZDEwMjRkMTI4ZDEwMjRkMTI4ZDM4NGQwZDM4NGQwZDEwMjRoUjNkMjU2UjRkMTI4UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjRSMTJkMFIxM2QyNTZSMTRhaTFpMmkyaTJpMmhnOjIzNm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjM2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjNvUjFkNzY4UjJhZDEyOGQzODRkMTI4ZDY0MGQyNTZkNjQwZDI1NmQ1MTJkMzg0ZDUxMmQzODRkMzg0ZDEyOGQzODRkMGQ3NjhkMTI4ZDc2OGQxMjhkNjQwZDBkNjQwZDBkNzY4ZDEyOGQxMDI0ZDM4NGQxMDI0ZDM4NGQ4OTZkMjU2ZDg5NmQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMjNSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJoZzoyMzVvUjFkNzY4UjJhZDY0LjUxMmQxMDI0ZDY0LjUxMmQyNTZkNDQ4LjUxMmQyNTZkNDQ4LjUxMmQxMDI0ZDY0LjUxMmQxMDI0ZDEyOGQ5NTkuNDg4ZDM4NGQ5NTkuNDg4ZDM4NGQzMTkuNDg3ZDEyOGQzMTkuNDg3ZDEyOGQ5NTkuNDg4aFIzZDUxMlI0ZDQ0OC41MTJSNWQ2NC41MTJSNmQ3NjhSN2QwUjhkNzAzLjQ4OFI5ZDBSMTBkMjU2UjExaTIzNVIxMmQ2NC41MTJSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MTIyb1IxZDc2OFIyYWQwZDUxMmQwZDY0MGQyNTZkNjQwZDI1NmQ3NjhkMzg0ZDc2OGQzODRkNjQwZDUxMmQ2NDBkNTEyZDUxMmQwZDUxMmQxMjhkODk2ZDBkODk2ZDBkMTAyNGQ1MTJkMTAyNGQ1MTJkODk2ZDI1NmQ4OTZkMjU2ZDc2OGQxMjhkNzY4ZDEyOGQ4OTZoUjNkNjQwUjRkNTEyUjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMjJSMTJkMFIxM2Q2NDBSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaGc6MjM0b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzRSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjEyMW9SMWQ3NjhSMmFkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ1MTJkMzg0ZDEwMjRkMzg0ZDExNTJkNTEyZDExNTJkNTEyZDUxMmQzODRkNTEyZDM4NGQ4OTZkMTI4ZDg5NmQxMjhkMTAyNGQzODRkMTAyNGQxMjhkMTE1MmQxMjhkMTI4MGQzODRkMTI4MGQzODRkMTE1MmQxMjhkMTE1MmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkLTI1NlI4ZDUxMlI5ZDBSMTBkMjU2UjExaTEyMVIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIzM29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjMzUjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMjBvUjFkNzY4UjJhZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDUxMmQwZDUxMmQzODRkNTEyZDI1NmQ1MTJkMjU2ZDY0MGQzODRkNjQwZDM4NGQ1MTJkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ4OTZkMjU2ZDg5NmQyNTZkNjQwZDEyOGQ4OTZkMGQ4OTZkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMzg0ZDEwMjRkMzg0ZDg5NmQyNTZkODk2ZDI1NmQxMDI0ZDM4NGQxMDI0aFIzZDUxMlI0ZDM4NFI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTIwUjEyZDBSMTNkNTEyUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMyb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzJSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExOW9SMWQ3NjhSMmFkMTI4ZDUxMmQwZDUxMmQwZDc2OGQxMjhkNzY4ZDEyOGQ1MTJkNTEyZDc2OGQ2NDBkNzY4ZDY0MGQ1MTJkNTEyZDUxMmQ1MTJkNzY4ZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNzY4ZDM4NGQ3NjhkMzg0ZDUxMmQxMjhkMTAyNGQyNTZkMTAyNGQyNTZkNzY4ZDEyOGQ3NjhkMTI4ZDEwMjRkMzg0ZDEwMjRkNTEyZDEwMjRkNTEyZDc2OGQzODRkNzY4ZDM4NGQxMDI0aFIzZDc2OFI0ZDY0MFI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE5UjEyZDBSMTNkNzY4UjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTFpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMxb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzFSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExOG9SMWQ3NjhSMmFkMzg0ZDc2OGQ1MTJkNzY4ZDUxMmQ1MTJkMzg0ZDUxMmQzODRkNzY4ZDEyOGQ3NjhkMTI4ZDUxMmQwZDUxMmQwZDg5NmQxMjhkODk2ZDEyOGQ3NjhkMTI4ZDc2OGQyNTZkODk2ZDM4NGQ4OTZkMzg0ZDc2OGQyNTZkNzY4ZDI1NmQ4OTZkMTI4ZDEwMjRkMjU2ZDEwMjRkMjU2ZDg5NmQxMjhkODk2ZDEyOGQxMDI0aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE4UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMWkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjMwb1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMzBSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExN29SMWQ3NjhSMmFkMzg0ZDg5NmQxMjhkODk2ZDEyOGQxMDI0ZDUxMmQxMDI0ZDUxMmQ1MTJkMzg0ZDUxMmQzODRkODk2ZDEyOGQ1MTJkMGQ1MTJkMGQ4OTZkMTI4ZDg5NmQxMjhkNTEyaFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE3UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIyOW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI5UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTZvUjFkNzY4UjJhZDI1NmQzODRkMTI4ZDM4NGQxMjhkNTEyZDBkNTEyZDBkNjQwZDEyOGQ2NDBkMTI4ZDg5NmQyNTZkODk2ZDI1NmQ2NDBkMzg0ZDY0MGQzODRkNTEyZDI1NmQ1MTJkMjU2ZDM4NGQzODRkMTAyNGQzODRkODk2ZDI1NmQ4OTZkMjU2ZDEwMjRkMzg0ZDEwMjRoUjNkNTEyUjRkMzg0UjVkMFI2ZDY0MFI3ZDBSOGQ2NDBSOWQwUjEwZDI1NlIxMWkxMTZSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmkyaTJpMWkyaTJpMmkyaGc6MjI4b1IxZDc2OFIyYWQ2NC41MTJkMTAyNGQ2NC41MTJkMjU2ZDQ0OC41MTJkMjU2ZDQ0OC41MTJkMTAyNGQ2NC41MTJkMTAyNGQxMjhkOTU5LjQ4OGQzODRkOTU5LjQ4OGQzODRkMzE5LjQ4N2QxMjhkMzE5LjQ4N2QxMjhkOTU5LjQ4OGhSM2Q1MTJSNGQ0NDguNTEyUjVkNjQuNTEyUjZkNzY4UjdkMFI4ZDcwMy40ODhSOWQwUjEwZDI1NlIxMWkyMjhSMTJkNjQuNTEyUjEzZDUxMlIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmhnOjExNW9SMWQ3NjhSMmFkMTI4ZDUxMmQxMjhkNjQwZDBkNjQwZDBkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQ1MTJkNjQwZDUxMmQ1MTJkMTI4ZDUxMmQwZDg5NmQwZDEwMjRkMzg0ZDEwMjRkMzg0ZDg5NmQ1MTJkODk2ZDUxMmQ3NjhkMjU2ZDc2OGQyNTZkODk2ZDBkODk2aFIzZDY0MFI0ZDUxMlI1ZDBSNmQ1MTJSN2QwUjhkNTEyUjlkMFIxMGQyNTZSMTFpMTE1UjEyZDBSMTNkNjQwUjE0YWkxaTJpMmkyaTJpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjIyN29SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI3UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTRvUjFkNzY4UjJhZDM4NGQ1MTJkMjU2ZDUxMmQyNTZkNjQwZDM4NGQ2NDBkMzg0ZDUxMmQxMjhkNzY4ZDI1NmQ3NjhkMjU2ZDY0MGQxMjhkNjQwZDEyOGQ1MTJkMGQ1MTJkMGQxMDI0ZDEyOGQxMDI0ZDEyOGQ3NjhoUjNkNTEyUjRkMzg0UjVkMFI2ZDUxMlI3ZDBSOGQ1MTJSOWQwUjEwZDI1NlIxMWkxMTRSMTJkMFIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJpMmkyaTJpMmhnOjIyNm9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI2UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTNvUjFkNzY4UjJhZDEyOGQ4OTQuOTc2ZDM4NGQ4OTQuOTc2ZDM4NGQ2NDEuMDI0ZDEyOGQ2NDEuMDI0ZDEyOGQ4OTQuOTc2ZDEyOGQ2NDBkMTI4ZDUxMmQ1MTJkNTEyZDUxMmQxMjgwZDM4NGQxMjgwZDM4NGQxMDI0ZDEyOGQxMDI0ZDEyOGQ4OTZkMGQ4OTZkMGQ2NDBkMTI4ZDY0MGhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkLTI1NlI4ZDUxMlI5ZDBSMTBkMjU2UjExaTExM1IxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTFpMmkyaTJpMmkyaTJpMmkyaTJpMmhnOjIyNW9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI1UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZzoxMTJvUjFkNzY4UjJhZDM4NGQ2NDBkNTEyZDY0MGQ1MTJkODk2ZDM4NGQ4OTZkMzg0ZDEwMjRkMTI4ZDEwMjRkMTI4ZDEyODBkMGQxMjgwZDBkNTEyZDM4NGQ1MTJkMzg0ZDY0MGQxMjhkODk0Ljk3NmQzODRkODk0Ljk3NmQzODRkNjQxLjAyNGQxMjhkNjQxLjAyNGQxMjhkODk0Ljk3NmhSM2Q2NDBSNGQ1MTJSNWQwUjZkNTEyUjdkLTI1NlI4ZDUxMlI5ZDBSMTBkMjU2UjExaTExMlIxMmQwUjEzZDY0MFIxNGFpMWkyaTJpMmkyaTJpMmkyaTJpMmkyaTFpMmkyaTJpMmhnOjIyNG9SMWQ3NjhSMmFkNjQuNTEyZDEwMjRkNjQuNTEyZDI1NmQ0NDguNTEyZDI1NmQ0NDguNTEyZDEwMjRkNjQuNTEyZDEwMjRkMTI4ZDk1OS40ODhkMzg0ZDk1OS40ODhkMzg0ZDMxOS40ODdkMTI4ZDMxOS40ODdkMTI4ZDk1OS40ODhoUjNkNTEyUjRkNDQ4LjUxMlI1ZDY0LjUxMlI2ZDc2OFI3ZDBSOGQ3MDMuNDg4UjlkMFIxMGQyNTZSMTFpMjI0UjEyZDY0LjUxMlIxM2Q1MTJSMTRhaTFpMmkyaTJpMmkxaTJpMmkyaTJoZ2h5ODpmb250TmFtZXk1OjA0YjAzZw"}];
flash.display.DisplayObject.GRAPHICS_INVALID = 2;
flash.display.DisplayObject.MATRIX_INVALID = 4;
flash.display.DisplayObject.MATRIX_CHAIN_INVALID = 8;
flash.display.DisplayObject.MATRIX_OVERRIDDEN = 16;
flash.display.DisplayObject.TRANSFORM_INVALID = 32;
flash.display.DisplayObject.BOUNDS_INVALID = 64;
flash.display.DisplayObject.RENDER_VALIDATE_IN_PROGRESS = 1024;
flash.display.DisplayObject.ALL_RENDER_FLAGS = 98;
DefaultAssetLibrary.className = new haxe.ds.StringMap();
DefaultAssetLibrary.path = new haxe.ds.StringMap();
DefaultAssetLibrary.type = new haxe.ds.StringMap();
flash.text.Font.DEFAULT_FONT_DATA = "q:55oy6:ascentd950.5y4:dataad84d277.5d564d277.5d564d320.5d293d1024d187.5d1024d442.5d362.5d84d362.5d84d277.5hy6:_widthd651.5y4:xMaxd564y4:xMind84y4:yMaxd746.5y4:yMind0y7:_heightd662.5y7:leadingd168y7:descentd241.5y8:charCodei55y15:leftsideBearingd84y12:advanceWidthd651.5y8:commandsai1i2i2i2i2i2i2i2hg:111oR0d950.5R1ad313.5d528.5d239.5d528.5d196.5d586.25d153.5d644d153.5d744.5d153.5d845d196.25d902.75d239d960.5d313.5d960.5d387d960.5d430d902.5d473d844.5d473d744.5d473d645d430d586.75d387d528.5d313.5d528.5d313.5d450.5d433.5d450.5d502d528.5d570.5d606.5d570.5d744.5d570.5d882d502d960.25d433.5d1038.5d313.5d1038.5d193d1038.5d124.75d960.25d56.5d882d56.5d744.5d56.5d606.5d124.75d528.5d193d450.5d313.5d450.5hR2d626.5R3d570.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i111R11d56.5R12d626.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:54oR0d950.5R1ad338d610.5d270d610.5d230.25d657d190.5d703.5d190.5d784.5d190.5d865d230.25d911.75d270d958.5d338d958.5d406d958.5d445.75d911.75d485.5d865d485.5d784.5d485.5d703.5d445.75d657d406d610.5d338d610.5d538.5d294d538.5d386d500.5d368d461.75d358.5d423d349d385d349d285d349d232.25d416.5d179.5d484d172d620.5d201.5d577d246d553.75d290.5d530.5d344d530.5d456.5d530.5d521.75d598.75d587d667d587d784.5d587d899.5d519d969d451d1038.5d338d1038.5d208.5d1038.5d140d939.25d71.5d840d71.5d651.5d71.5d474.5d155.5d369.25d239.5d264d381d264d419d264d457.75d271.5d496.5d279d538.5d294hR2d651.5R3d587R4d71.5R5d760R6d-14.5R7d688.5R8d168R9d241.5R10i54R11d71.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3hg:110oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i110R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:53oR0d950.5R1ad110.5d277.5d507d277.5d507d362.5d203d362.5d203d545.5d225d538d247d534.25d269d530.5d291d530.5d416d530.5d489d599d562d667.5d562d784.5d562d905d487d971.75d412d1038.5d275.5d1038.5d228.5d1038.5d179.75d1030.5d131d1022.5d79d1006.5d79d905d124d929.5d172d941.5d220d953.5d273.5d953.5d360d953.5d410.5d908d461d862.5d461d784.5d461d706.5d410.5d661d360d615.5d273.5d615.5d233d615.5d192.75d624.5d152.5d633.5d110.5d652.5d110.5d277.5hR2d651.5R3d562R4d79R5d746.5R6d-14.5R7d667.5R8d168R9d241.5R10i53R11d79R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i2hg:109oR0d950.5R1ad532.5d571.5d567d509.5d615d480d663d450.5d728d450.5d815.5d450.5d863d511.75d910.5d573d910.5d686d910.5d1024d818d1024d818d689d818d608.5d789.5d569.5d761d530.5d702.5d530.5d631d530.5d589.5d578d548d625.5d548d707.5d548d1024d455.5d1024d455.5d689d455.5d608d427d569.25d398.5d530.5d339d530.5d268.5d530.5d227d578.25d185.5d626d185.5d707.5d185.5d1024d93d1024d93d464d185.5d464d185.5d551d217d499.5d261d475d305d450.5d365.5d450.5d426.5d450.5d469.25d481.5d512d512.5d532.5d571.5hR2d997.5R3d910.5R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i109R11d93R12d997.5R13ai1i3i3i3i3i2i2i2i3i3i3i3i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:52oR0d950.5R1ad387d365.5d132d764d387d764d387d365.5d360.5d277.5d487.5d277.5d487.5d764d594d764d594d848d487.5d848d487.5d1024d387d1024d387d848d50d848d50d750.5d360.5d277.5hR2d651.5R3d594R4d50R5d746.5R6d0R7d696.5R8d168R9d241.5R10i52R11d50R12d651.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2hg:108oR0d950.5R1ad96.5d246d188.5d246d188.5d1024d96.5d1024d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i108R11d96.5R12d284.5R13ai1i2i2i2i2hg:51oR0d950.5R1ad415.5d621.5d488d637d528.75d686d569.5d735d569.5d807d569.5d917.5d493.5d978d417.5d1038.5d277.5d1038.5d230.5d1038.5d180.75d1029.25d131d1020d78d1001.5d78d904d120d928.5d170d941d220d953.5d274.5d953.5d369.5d953.5d419.25d916d469d878.5d469d807d469d741d422.75d703.75d376.5d666.5d294d666.5d207d666.5d207d583.5d298d583.5d372.5d583.5d412d553.75d451.5d524d451.5d468d451.5d410.5d410.75d379.75d370d349d294d349d252.5d349d205d358d157.5d367d100.5d386d100.5d296d158d280d208.25d272d258.5d264d303d264d418d264d485d316.25d552d368.5d552d457.5d552d519.5d516.5d562.25d481d605d415.5d621.5hR2d651.5R3d569.5R4d78R5d760R6d-14.5R7d682R8d168R9d241.5R10i51R11d78R12d651.5R13ai1i3i3i3i3i3i3i2i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:107oR0d950.5R1ad93d246d185.5d246d185.5d705.5d460d464d577.5d464d280.5d726d590d1024d470d1024d185.5d750.5d185.5d1024d93d1024d93d246hR2d593R3d590R4d93R5d778R6d0R7d685R8d168R9d241.5R10i107R11d93R12d593R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:50oR0d950.5R1ad196.5d939d549d939d549d1024d75d1024d75d939d132.5d879.5d231.75d779.25d331d679d356.5d650d405d595.5d424.25d557.75d443.5d520d443.5d483.5d443.5d424d401.75d386.5d360d349d293d349d245.5d349d192.75d365.5d140d382d80d415.5d80d313.5d141d289d194d276.5d247d264d291d264d407d264d476d322d545d380d545d477d545d523d527.75d564.25d510.5d605.5d465d661.5d452.5d676d385.5d745.25d318.5d814.5d196.5d939hR2d651.5R3d549R4d75R5d760R6d0R7d685R8d168R9d241.5R10i50R11d75R12d651.5R13ai1i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:106oR0d950.5R1ad96.5d464d188.5d464d188.5d1034d188.5d1141d147.75d1189d107d1237d16.5d1237d-18.5d1237d-18.5d1159d6d1159d58.5d1159d77.5d1134.75d96.5d1110.5d96.5d1034d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d-18.5R5d778R6d-213R7d796.5R8d168R9d241.5R10i106R11d-18.5R12d284.5R13ai1i2i2i3i3i2i2i2i3i3i2i1i2i2i2i2hg:49oR0d950.5R1ad127d939d292d939d292d369.5d112.5d405.5d112.5d313.5d291d277.5d392d277.5d392d939d557d939d557d1024d127d1024d127d939hR2d651.5R3d557R4d112.5R5d746.5R6d0R7d634R8d168R9d241.5R10i49R11d112.5R12d651.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:105oR0d950.5R1ad96.5d464d188.5d464d188.5d1024d96.5d1024d96.5d464d96.5d246d188.5d246d188.5d362.5d96.5d362.5d96.5d246hR2d284.5R3d188.5R4d96.5R5d778R6d0R7d681.5R8d168R9d241.5R10i105R11d96.5R12d284.5R13ai1i2i2i2i2i1i2i2i2i2hg:48oR0d950.5R1ad325.5d344d247.5d344d208.25d420.75d169d497.5d169d651.5d169d805d208.25d881.75d247.5d958.5d325.5d958.5d404d958.5d443.25d881.75d482.5d805d482.5d651.5d482.5d497.5d443.25d420.75d404d344d325.5d344d325.5d264d451d264d517.25d363.25d583.5d462.5d583.5d651.5d583.5d840d517.25d939.25d451d1038.5d325.5d1038.5d200d1038.5d133.75d939.25d67.5d840d67.5d651.5d67.5d462.5d133.75d363.25d200d264d325.5d264hR2d651.5R3d583.5R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i48R11d67.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:104oR0d950.5R1ad562d686d562d1024d470d1024d470d689d470d609.5d439d570d408d530.5d346d530.5d271.5d530.5d228.5d578d185.5d625.5d185.5d707.5d185.5d1024d93d1024d93d246d185.5d246d185.5d551d218.5d500.5d263.25d475.5d308d450.5d366.5d450.5d463d450.5d512.5d510.25d562d570d562d686hR2d649R3d562R4d93R5d778R6d0R7d685R8d168R9d241.5R10i104R11d93R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:47oR0d950.5R1ad260d277.5d345d277.5d85d1119d0d1119d260d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i47R11d0R12d345R13ai1i2i2i2i2hg:103oR0d950.5R1ad465d737.5d465d637.5d423.75d582.5d382.5d527.5d308d527.5d234d527.5d192.75d582.5d151.5d637.5d151.5d737.5d151.5d837d192.75d892d234d947d308d947d382.5d947d423.75d892d465d837d465d737.5d557d954.5d557d1097.5d493.5d1167.25d430d1237d299d1237d250.5d1237d207.5d1229.75d164.5d1222.5d124d1207.5d124d1118d164.5d1140d204d1150.5d243.5d1161d284.5d1161d375d1161d420d1113.75d465d1066.5d465d971d465d925.5d436.5d975d392d999.5d347.5d1024d285.5d1024d182.5d1024d119.5d945.5d56.5d867d56.5d737.5d56.5d607.5d119.5d529d182.5d450.5d285.5d450.5d347.5d450.5d392d475d436.5d499.5d465d549d465d464d557d464d557d954.5hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i103R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i2i3i3i3i3i2i3i3i3i3i3i3i3i3i2i2i2hg:46oR0d950.5R1ad109.5d897d215d897d215d1024d109.5d1024d109.5d897hR2d325.5R3d215R4d109.5R5d127R6d0R7d17.5R8d168R9d241.5R10i46R11d109.5R12d325.5R13ai1i2i2i2i2hg:102oR0d950.5R1ad380d246d380d322.5d292d322.5d242.5d322.5d223.25d342.5d204d362.5d204d414.5d204d464d355.5d464d355.5d535.5d204d535.5d204d1024d111.5d1024d111.5d535.5d23.5d535.5d23.5d464d111.5d464d111.5d425d111.5d331.5d155d288.75d198.5d246d293d246d380d246hR2d360.5R3d380R4d23.5R5d778R6d0R7d754.5R8d168R9d241.5R10i102R11d23.5R12d360.5R13ai1i2i2i3i3i2i2i2i2i2i2i2i2i2i2i2i3i3i2hg:45oR0d950.5R1ad50d702.5d319.5d702.5d319.5d784.5d50d784.5d50d702.5hR2d369.5R3d319.5R4d50R5d321.5R6d239.5R7d271.5R8d168R9d241.5R10i45R11d50R12d369.5R13ai1i2i2i2i2hg:101oR0d950.5R1ad575.5d721d575.5d766d152.5d766d158.5d861d209.75d910.75d261d960.5d352.5d960.5d405.5d960.5d455.25d947.5d505d934.5d554d908.5d554d995.5d504.5d1016.5d452.5d1027.5d400.5d1038.5d347d1038.5d213d1038.5d134.75d960.5d56.5d882.5d56.5d749.5d56.5d612d130.75d531.25d205d450.5d331d450.5d444d450.5d509.75d523.25d575.5d596d575.5d721d483.5d694d482.5d618.5d441.25d573.5d400d528.5d332d528.5d255d528.5d208.75d572d162.5d615.5d155.5d694.5d483.5d694hR2d630R3d575.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i101R11d56.5R12d630R13ai1i2i2i3i3i3i3i2i3i3i3i3i3i3i3i3i1i3i3i3i3i2hg:44oR0d950.5R1ad120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d325.5R3d225.5R4d79R5d127R6d-119R7d48R8d168R9d241.5R10i44R11d79R12d325.5R13ai1i2i2i2i2i2i2hg:100oR0d950.5R1ad465d549d465d246d557d246d557d1024d465d1024d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5hR2d650R3d557R4d56.5R5d778R6d-14.5R7d721.5R8d168R9d241.5R10i100R11d56.5R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:43oR0d950.5R1ad471d382d471d660.5d749.5d660.5d749.5d745.5d471d745.5d471d1024d387d1024d387d745.5d108.5d745.5d108.5d660.5d387d660.5d387d382d471d382hR2d858R3d749.5R4d108.5R5d642R6d0R7d533.5R8d168R9d241.5R10i43R11d108.5R12d858R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:99oR0d950.5R1ad499.5d485.5d499.5d571.5d460.5d550d421.25d539.25d382d528.5d342d528.5d252.5d528.5d203d585.25d153.5d642d153.5d744.5d153.5d847d203d903.75d252.5d960.5d342d960.5d382d960.5d421.25d949.75d460.5d939d499.5d917.5d499.5d1002.5d461d1020.5d419.75d1029.5d378.5d1038.5d332d1038.5d205.5d1038.5d131d959d56.5d879.5d56.5d744.5d56.5d607.5d131.75d529d207d450.5d338d450.5d380.5d450.5d421d459.25d461.5d468d499.5d485.5hR2d563R3d499.5R4d56.5R5d573.5R6d-14.5R7d517R8d168R9d241.5R10i99R11d56.5R12d563R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:42oR0d950.5R1ad481.5d400.5d302d497.5d481.5d595d452.5d644d284.5d542.5d284.5d731d227.5d731d227.5d542.5d59.5d644d30.5d595d210d497.5d30.5d400.5d59.5d351d227.5d452.5d227.5d264d284.5d264d284.5d452.5d452.5d351d481.5d400.5hR2d512R3d481.5R4d30.5R5d760R6d293R7d729.5R8d168R9d241.5R10i42R11d30.5R12d512R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:98oR0d950.5R1ad498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d185.5d1024d93d1024d93d246d185.5d246d185.5d549hR2d650R3d594R4d93R5d778R6d-14.5R7d685R8d168R9d241.5R10i98R11d93R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:41oR0d950.5R1ad82d247d162d247d237d365d274.25d478d311.5d591d311.5d702.5d311.5d814.5d274.25d928d237d1041.5d162d1159d82d1159d148.5d1044.5d181.25d931.25d214d818d214d702.5d214d587d181.25d474.5d148.5d362d82d247hR2d399.5R3d311.5R4d82R5d777R6d-135R7d695R8d168R9d241.5R10i41R11d82R12d399.5R13ai1i2i3i3i3i3i2i3i3i3i3hg:97oR0d950.5R1ad351d742.5d239.5d742.5d196.5d768d153.5d793.5d153.5d855d153.5d904d185.75d932.75d218d961.5d273.5d961.5d350d961.5d396.25d907.25d442.5d853d442.5d763d442.5d742.5d351d742.5d534.5d704.5d534.5d1024d442.5d1024d442.5d939d411d990d364d1014.25d317d1038.5d249d1038.5d163d1038.5d112.25d990.25d61.5d942d61.5d861d61.5d766.5d124.75d718.5d188d670.5d313.5d670.5d442.5d670.5d442.5d661.5d442.5d598d400.75d563.25d359d528.5d283.5d528.5d235.5d528.5d190d540d144.5d551.5d102.5d574.5d102.5d489.5d153d470d200.5d460.25d248d450.5d293d450.5d414.5d450.5d474.5d513.5d534.5d576.5d534.5d704.5hR2d627.5R3d534.5R4d61.5R5d573.5R6d-14.5R7d512R8d168R9d241.5R10i97R11d61.5R12d627.5R13ai1i3i3i3i3i3i3i2i2i1i2i2i2i3i3i3i3i3i3i2i2i3i3i3i3i2i3i3i3i3hg:40oR0d950.5R1ad317.5d247d250.5d362d218d474.5d185.5d587d185.5d702.5d185.5d818d218.25d931.25d251d1044.5d317.5d1159d237.5d1159d162.5d1041.5d125.25d928d88d814.5d88d702.5d88d591d125d478d162d365d237.5d247d317.5d247hR2d399.5R3d317.5R4d88R5d777R6d-135R7d689R8d168R9d241.5R10i40R11d88R12d399.5R13ai1i3i3i3i3i2i3i3i3i3i2hg:96oR0d950.5R1ad183.5d205d324.5d392d248d392d85d205d183.5d205hR2d512R3d324.5R4d85R5d819R6d632R7d734R8d168R9d241.5R10i96R11d85R12d512R13ai1i2i2i2i2hg:39oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5hR2d281.5R3d183.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i39R11d98.5R12d281.5R13ai1i2i2i2i2hg:95oR0d950.5R1ad522d1194d522d1265.5d-10d1265.5d-10d1194d522d1194hR2d512R3d522R4d-10R5d-170R6d-241.5R7d-160R8d168R9d241.5R10i95R11d-10R12d512R13ai1i2i2i2i2hg:38oR0d950.5R1ad249d622.5d203.5d663d182.25d703.25d161d743.5d161d787.5d161d860.5d214d909d267d957.5d347d957.5d394.5d957.5d436d941.75d477.5d926d514d894d249d622.5d319.5d566.5d573.5d826.5d603d782d619.5d731.25d636d680.5d639d623.5d732d623.5d726d689.5d700d754d674d818.5d627.5d881.5d767d1024d641d1024d569.5d950.5d517.5d995d460.5d1016.75d403.5d1038.5d338d1038.5d217.5d1038.5d141d969.75d64.5d901d64.5d793.5d64.5d729.5d98d673.25d131.5d617d198.5d567.5d174.5d536d162d504.75d149.5d473.5d149.5d443.5d149.5d362.5d205d313.25d260.5d264d352.5d264d394d264d435.25d273d476.5d282d519d300d519d391d475.5d367.5d436d355.25d396.5d343d362.5d343d310d343d277.25d370.75d244.5d398.5d244.5d442.5d244.5d468d259.25d493.75d274d519.5d319.5d566.5hR2d798.5R3d767R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i38R11d64.5R12d798.5R13ai1i3i3i3i3i3i3i2i1i2i3i3i2i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3hg:94oR0d950.5R1ad478d277.5d749.5d556d649d556d429d358.5d209d556d108.5d556d380d277.5d478d277.5hR2d858R3d749.5R4d108.5R5d746.5R6d468R7d638R8d168R9d241.5R10i94R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:37oR0d950.5R1ad744.5d695.5d701d695.5d676.25d732.5d651.5d769.5d651.5d835.5d651.5d900.5d676.25d937.75d701d975d744.5d975d787d975d811.75d937.75d836.5d900.5d836.5d835.5d836.5d770d811.75d732.75d787d695.5d744.5d695.5d744.5d632d823.5d632d870d687d916.5d742d916.5d835.5d916.5d929d869.75d983.75d823d1038.5d744.5d1038.5d664.5d1038.5d618d983.75d571.5d929d571.5d835.5d571.5d741.5d618.25d686.75d665d632d744.5d632d228.5d327.5d185.5d327.5d160.75d364.75d136d402d136d467d136d533d160.5d570d185d607d228.5d607d272d607d296.75d570d321.5d533d321.5d467d321.5d402.5d296.5d365d271.5d327.5d228.5d327.5d680d264d760d264d293d1038.5d213d1038.5d680d264d228.5d264d307.5d264d354.5d318.75d401.5d373.5d401.5d467d401.5d561.5d354.75d616d308d670.5d228.5d670.5d149d670.5d102.75d615.75d56.5d561d56.5d467d56.5d374d103d319d149.5d264d228.5d264hR2d973R3d916.5R4d56.5R5d760R6d-14.5R7d703.5R8d168R9d241.5R10i37R11d56.5R12d973R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i1i2i2i2i2i1i3i3i3i3i3i3i3i3hg:93oR0d950.5R1ad311.5d246d311.5d1159d99.5d1159d99.5d1087.5d219d1087.5d219d317.5d99.5d317.5d99.5d246d311.5d246hR2d399.5R3d311.5R4d99.5R5d778R6d-135R7d678.5R8d168R9d241.5R10i93R11d99.5R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:36oR0d950.5R1ad346d1174.5d296d1174.5d295.5d1024d243d1023d190.5d1011.75d138d1000.5d85d978d85d888d136d920d188.25d936.25d240.5d952.5d296d953d296d725d185.5d707d135.25d664d85d621d85d546d85d464.5d139.5d417.5d194d370.5d296d363.5d296d246d346d246d346d362d392.5d364d436d371.75d479.5d379.5d521d393d521d480.5d479.5d459.5d435.75d448d392d436.5d346d434.5d346d648d459.5d665.5d513d710.5d566.5d755.5d566.5d833.5d566.5d918d509.75d966.75d453d1015.5d346d1023d346d1174.5d296d639d296d434d238d440.5d207.5d467d177d493.5d177d537.5d177d580.5d205.25d604.5d233.5d628.5d296d639d346d735d346d951.5d409.5d943d441.75d915.5d474d888d474d843d474d799d443.25d773d412.5d747d346d735hR2d651.5R3d566.5R4d85R5d778R6d-150.5R7d693R8d168R9d241.5R10i36R11d85R12d651.5R13ai1i2i2i3i3i2i3i3i2i3i3i3i3i2i2i2i3i3i2i3i3i2i3i3i3i3i2i1i2i3i3i3i3i1i2i3i3i3i3hg:92oR0d950.5R1ad85d277.5d345d1119d260d1119d0d277.5d85d277.5hR2d345R3d345R4d0R5d746.5R6d-95R7d746.5R8d168R9d241.5R10i92R11d0R12d345R13ai1i2i2i2i2hg:35oR0d950.5R1ad523.5d573.5d378d573.5d336d740.5d482.5d740.5d523.5d573.5d448.5d289d396.5d496.5d542.5d496.5d595d289d675d289d623.5d496.5d779.5d496.5d779.5d573.5d604d573.5d563d740.5d722d740.5d722d817d543.5d817d491.5d1024d411.5d1024d463d817d316.5d817d265d1024d184.5d1024d236.5d817d79d817d79d740.5d255d740.5d297d573.5d136d573.5d136d496.5d316.5d496.5d367.5d289d448.5d289hR2d858R3d779.5R4d79R5d735R6d0R7d656R8d168R9d241.5R10i35R11d79R12d858R13ai1i2i2i2i2i1i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2i2hg:91oR0d950.5R1ad88d246d300d246d300d317.5d180d317.5d180d1087.5d300d1087.5d300d1159d88d1159d88d246hR2d399.5R3d300R4d88R5d778R6d-135R7d690R8d168R9d241.5R10i91R11d88R12d399.5R13ai1i2i2i2i2i2i2i2i2hg:34oR0d950.5R1ad183.5d277.5d183.5d555d98.5d555d98.5d277.5d183.5d277.5d372.5d277.5d372.5d555d287.5d555d287.5d277.5d372.5d277.5hR2d471R3d372.5R4d98.5R5d746.5R6d469R7d648R8d168R9d241.5R10i34R11d98.5R12d471R13ai1i2i2i2i2i1i2i2i2i2hg:90oR0d950.5R1ad57.5d277.5d644d277.5d644d354.5d172d939d655.5d939d655.5d1024d46d1024d46d947d518d362.5d57.5d362.5d57.5d277.5hR2d701.5R3d655.5R4d46R5d746.5R6d0R7d700.5R8d168R9d241.5R10i90R11d46R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:33oR0d950.5R1ad154.5d897d256d897d256d1024d154.5d1024d154.5d897d154.5d277.5d256d277.5d256d605d246d783.5d165d783.5d154.5d605d154.5d277.5hR2d410.5R3d256R4d154.5R5d746.5R6d0R7d592R8d168R9d241.5R10i33R11d154.5R12d410.5R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:89oR0d950.5R1ad-2d277.5d106.5d277.5d313.5d584.5d519d277.5d627.5d277.5d363.5d668.5d363.5d1024d262d1024d262d668.5d-2d277.5hR2d625.5R3d627.5R4d-2R5d746.5R6d0R7d748.5R8d168R9d241.5R10i89R11d-2R12d625.5R13ai1i2i2i2i2i2i2i2i2i2hg:32oR0d950.5R1ahR2d325.5R3d0R4d0R5d0R6d0R7d0R8d168R9d241.5R10i32R11d0R12d325.5R13ahg:88oR0d950.5R1ad64.5d277.5d173d277.5d358.5d555d545d277.5d653.5d277.5d413.5d636d669.5d1024d561d1024d351d706.5d139.5d1024d30.5d1024d297d625.5d64.5d277.5hR2d701.5R3d669.5R4d30.5R5d746.5R6d0R7d716R8d168R9d241.5R10i88R11d30.5R12d701.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:87oR0d950.5R1ad34d277.5d136d277.5d293d908.5d449.5d277.5d563d277.5d720d908.5d876.5d277.5d979d277.5d791.5d1024d664.5d1024d507d376d348d1024d221d1024d34d277.5hR2d1012.5R3d979R4d34R5d746.5R6d0R7d712.5R8d168R9d241.5R10i87R11d34R12d1012.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:86oR0d950.5R1ad293d1024d8d277.5d113.5d277.5d350d906d587d277.5d692d277.5d407.5d1024d293d1024hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i86R11d8R12d700.5R13ai1i2i2i2i2i2i2i2hg:85oR0d950.5R1ad89d277.5d190.5d277.5d190.5d731d190.5d851d234d903.75d277.5d956.5d375d956.5d472d956.5d515.5d903.75d559d851d559d731d559d277.5d660.5d277.5d660.5d743.5d660.5d889.5d588.25d964d516d1038.5d375d1038.5d233.5d1038.5d161.25d964d89d889.5d89d743.5d89d277.5hR2d749.5R3d660.5R4d89R5d746.5R6d-14.5R7d657.5R8d168R9d241.5R10i85R11d89R12d749.5R13ai1i2i2i3i3i3i3i2i2i2i3i3i3i3i2hg:84oR0d950.5R1ad-3d277.5d628.5d277.5d628.5d362.5d363.5d362.5d363.5d1024d262d1024d262d362.5d-3d362.5d-3d277.5hR2d625.5R3d628.5R4d-3R5d746.5R6d0R7d749.5R8d168R9d241.5R10i84R11d-3R12d625.5R13ai1i2i2i2i2i2i2i2i2hg:83oR0d950.5R1ad548d302d548d400.5d490.5d373d439.5d359.5d388.5d346d341d346d258.5d346d213.75d378d169d410d169d469d169d518.5d198.75d543.75d228.5d569d311.5d584.5d372.5d597d485.5d618.5d539.25d672.75d593d727d593d818d593d926.5d520.25d982.5d447.5d1038.5d307d1038.5d254d1038.5d194.25d1026.5d134.5d1014.5d70.5d991d70.5d887d132d921.5d191d939d250d956.5d307d956.5d393.5d956.5d440.5d922.5d487.5d888.5d487.5d825.5d487.5d770.5d453.75d739.5d420d708.5d343d693d281.5d681d168.5d658.5d118d610.5d67.5d562.5d67.5d477d67.5d378d137.25d321d207d264d329.5d264d382d264d436.5d273.5d491d283d548d302hR2d650R3d593R4d67.5R5d760R6d-14.5R7d692.5R8d168R9d241.5R10i83R11d67.5R12d650R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:82oR0d950.5R1ad454.5d674d487d685d517.75d721d548.5d757d579.5d820d682d1024d573.5d1024d478d832.5d441d757.5d406.25d733d371.5d708.5d311.5d708.5d201.5d708.5d201.5d1024d100.5d1024d100.5d277.5d328.5d277.5d456.5d277.5d519.5d331d582.5d384.5d582.5d492.5d582.5d563d549.75d609.5d517d656d454.5d674d201.5d360.5d201.5d625.5d328.5d625.5d401.5d625.5d438.75d591.75d476d558d476d492.5d476d427d438.75d393.75d401.5d360.5d328.5d360.5d201.5d360.5hR2d711.5R3d682R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i82R11d100.5R12d711.5R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i3i3i3i3i1i2i2i3i3i3i3i2hg:81oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d545d1010.5d678d1156d556d1156d445.5d1036.5d429d1037.5d420.25d1038d411.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.25d57.5d828d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d781.5d696.25d874d644d966.5d545d1010.5hR2d806R3d748.5R4d57.5R5d760R6d-132R7d702.5R8d168R9d241.5R10i81R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i2i2i2i3i3i3i3i3i3i3i3i3i3hg:80oR0d950.5R1ad201.5d360.5d201.5d641d328.5d641d399d641d437.5d604.5d476d568d476d500.5d476d433.5d437.5d397d399d360.5d328.5d360.5d201.5d360.5d100.5d277.5d328.5d277.5d454d277.5d518.25d334.25d582.5d391d582.5d500.5d582.5d611d518.25d667.5d454d724d328.5d724d201.5d724d201.5d1024d100.5d1024d100.5d277.5hR2d617.5R3d582.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i80R11d100.5R12d617.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2i2i2hg:79oR0d950.5R1ad403.5d346d293.5d346d228.75d428d164d510d164d651.5d164d792.5d228.75d874.5d293.5d956.5d403.5d956.5d513.5d956.5d577.75d874.5d642d792.5d642d651.5d642d510d577.75d428d513.5d346d403.5d346d403.5d264d560.5d264d654.5d369.25d748.5d474.5d748.5d651.5d748.5d828d654.5d933.25d560.5d1038.5d403.5d1038.5d246d1038.5d151.75d933.5d57.5d828.5d57.5d651.5d57.5d474.5d151.75d369.25d246d264d403.5d264hR2d806R3d748.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i79R11d57.5R12d806R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:78oR0d950.5R1ad100.5d277.5d236.5d277.5d567.5d902d567.5d277.5d665.5d277.5d665.5d1024d529.5d1024d198.5d399.5d198.5d1024d100.5d1024d100.5d277.5hR2d766R3d665.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i78R11d100.5R12d766R13ai1i2i2i2i2i2i2i2i2i2i2hg:77oR0d950.5R1ad100.5d277.5d251d277.5d441.5d785.5d633d277.5d783.5d277.5d783.5d1024d685d1024d685d368.5d492.5d880.5d391d880.5d198.5d368.5d198.5d1024d100.5d1024d100.5d277.5hR2d883.5R3d783.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i77R11d100.5R12d883.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:76oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d939d565d939d565d1024d100.5d1024d100.5d277.5hR2d570.5R3d565R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i76R11d100.5R12d570.5R13ai1i2i2i2i2i2i2hg:75oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d593d536.5d277.5d666.5d277.5d296d625.5d693d1024d560d1024d201.5d664.5d201.5d1024d100.5d1024d100.5d277.5hR2d671.5R3d693R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i75R11d100.5R12d671.5R13ai1i2i2i2i2i2i2i2i2i2i2i2hg:74oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d972d201.5d1107d150.25d1168d99d1229d-14.5d1229d-53d1229d-53d1144d-21.5d1144d45.5d1144d73d1106.5d100.5d1069d100.5d972d100.5d277.5hR2d302R3d201.5R4d-53R5d746.5R6d-205R7d799.5R8d168R9d241.5R10i74R11d-53R12d302R13ai1i2i2i3i3i2i2i2i3i3i2hg:73oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d1024d100.5d1024d100.5d277.5hR2d302R3d201.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i73R11d100.5R12d302R13ai1i2i2i2i2hg:72oR0d950.5R1ad100.5d277.5d201.5d277.5d201.5d583.5d568.5d583.5d568.5d277.5d669.5d277.5d669.5d1024d568.5d1024d568.5d668.5d201.5d668.5d201.5d1024d100.5d1024d100.5d277.5hR2d770R3d669.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i72R11d100.5R12d770R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:71oR0d950.5R1ad609.5d917.5d609.5d717d444.5d717d444.5d634d709.5d634d709.5d954.5d651d996d580.5d1017.25d510d1038.5d430d1038.5d255d1038.5d156.25d936.25d57.5d834d57.5d651.5d57.5d468.5d156.25d366.25d255d264d430d264d503d264d568.75d282d634.5d300d690d335d690d442.5d634d395d571d371d508d347d438.5d347d301.5d347d232.75d423.5d164d500d164d651.5d164d802.5d232.75d879d301.5d955.5d438.5d955.5d492d955.5d534d946.25d576d937d609.5d917.5hR2d793.5R3d709.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i71R11d57.5R12d793.5R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:70oR0d950.5R1ad100.5d277.5d529.5d277.5d529.5d362.5d201.5d362.5d201.5d582.5d497.5d582.5d497.5d667.5d201.5d667.5d201.5d1024d100.5d1024d100.5d277.5hR2d589R3d529.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i70R11d100.5R12d589R13ai1i2i2i2i2i2i2i2i2i2i2hg:126oR0d950.5R1ad749.5d615.5d749.5d704.5d697d744d652.25d761d607.5d778d559d778d504d778d431d748.5d425.5d746.5d423d745.5d419.5d744d412d741.5d334.5d710.5d287.5d710.5d243.5d710.5d200.5d729.75d157.5d749d108.5d790.5d108.5d701.5d161d662d205.75d644.75d250.5d627.5d299d627.5d354d627.5d427.5d657.5d432.5d659.5d435d660.5d439d662d446d664.5d523.5d695.5d570.5d695.5d613.5d695.5d655.75d676.5d698d657.5d749.5d615.5hR2d858R3d749.5R4d108.5R5d408.5R6d233.5R7d300R8d168R9d241.5R10i126R11d108.5R12d858R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:69oR0d950.5R1ad100.5d277.5d572.5d277.5d572.5d362.5d201.5d362.5d201.5d583.5d557d583.5d557d668.5d201.5d668.5d201.5d939d581.5d939d581.5d1024d100.5d1024d100.5d277.5hR2d647R3d581.5R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i69R11d100.5R12d647R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:125oR0d950.5R1ad128d1119d163d1119d233d1119d254.25d1097.5d275.5d1076d275.5d1004.5d275.5d880.5d275.5d802.5d298d767d320.5d731.5d376d718d320.5d705.5d298d670d275.5d634.5d275.5d556d275.5d432d275.5d361d254.25d339.25d233d317.5d163d317.5d128d317.5d128d246d159.5d246d284d246d325.75d282.75d367.5d319.5d367.5d430d367.5d550d367.5d624.5d394.5d653.25d421.5d682d492.5d682d523.5d682d523.5d753.5d492.5d753.5d421.5d753.5d394.5d782.5d367.5d811.5d367.5d887d367.5d1006.5d367.5d1117d325.75d1154d284d1191d159.5d1191d128d1191d128d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i125R11d128R12d651.5R13ai1i2i3i3i2i3i3i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2hg:68oR0d950.5R1ad201.5d360.5d201.5d941d323.5d941d478d941d549.75d871d621.5d801d621.5d650d621.5d500d549.75d430.25d478d360.5d323.5d360.5d201.5d360.5d100.5d277.5d308d277.5d525d277.5d626.5d367.75d728d458d728d650d728d843d626d933.5d524d1024d308d1024d100.5d1024d100.5d277.5hR2d788.5R3d728R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i68R11d100.5R12d788.5R13ai1i2i2i3i3i3i3i2i1i2i3i3i3i3i2i2hg:124oR0d950.5R1ad215d241.5d215d1265.5d130d1265.5d130d241.5d215d241.5hR2d345R3d215R4d130R5d782.5R6d-241.5R7d652.5R8d168R9d241.5R10i124R11d130R12d345R13ai1i2i2i2i2hg:67oR0d950.5R1ad659.5d335d659.5d441.5d608.5d394d550.75d370.5d493d347d428d347d300d347d232d425.25d164d503.5d164d651.5d164d799d232d877.25d300d955.5d428d955.5d493d955.5d550.75d932d608.5d908.5d659.5d861d659.5d966.5d606.5d1002.5d547.25d1020.5d488d1038.5d422d1038.5d252.5d1038.5d155d934.75d57.5d831d57.5d651.5d57.5d471.5d155d367.75d252.5d264d422d264d489d264d548.25d281.75d607.5d299.5d659.5d335hR2d715R3d659.5R4d57.5R5d760R6d-14.5R7d702.5R8d168R9d241.5R10i67R11d57.5R12d715R13ai1i2i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3hg:123oR0d950.5R1ad523.5d1119d523.5d1191d492.5d1191d368d1191d325.75d1154d283.5d1117d283.5d1006.5d283.5d887d283.5d811.5d256.5d782.5d229.5d753.5d158.5d753.5d128d753.5d128d682d158.5d682d230d682d256.75d653.25d283.5d624.5d283.5d550d283.5d430d283.5d319.5d325.75d282.75d368d246d492.5d246d523.5d246d523.5d317.5d489.5d317.5d419d317.5d397.5d339.5d376d361.5d376d432d376d556d376d634.5d353.25d670d330.5d705.5d275.5d718d331d731.5d353.5d767d376d802.5d376d880.5d376d1004.5d376d1075d397.5d1097d419d1119d489.5d1119d523.5d1119hR2d651.5R3d523.5R4d128R5d778R6d-167R7d650R8d168R9d241.5R10i123R11d128R12d651.5R13ai1i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i2i2i2i3i3i2i3i3i3i3i2i3i3i2hg:66oR0d950.5R1ad201.5d667.5d201.5d941d363.5d941d445d941d484.25d907.25d523.5d873.5d523.5d804d523.5d734d484.25d700.75d445d667.5d363.5d667.5d201.5d667.5d201.5d360.5d201.5d585.5d351d585.5d425d585.5d461.25d557.75d497.5d530d497.5d473d497.5d416.5d461.25d388.5d425d360.5d351d360.5d201.5d360.5d100.5d277.5d358.5d277.5d474d277.5d536.5d325.5d599d373.5d599d462d599d530.5d567d571d535d611.5d473d621.5d547.5d637.5d588.75d688.25d630d739d630d815d630d915d562d969.5d494d1024d368.5d1024d100.5d1024d100.5d277.5hR2d702.5R3d630R4d100.5R5d746.5R6d0R7d646R8d168R9d241.5R10i66R11d100.5R12d702.5R13ai1i2i2i3i3i3i3i2i1i2i2i3i3i3i3i2i1i2i3i3i3i3i3i3i3i3i2i2hg:122oR0d950.5R1ad56.5d464d493.5d464d493.5d548d147.5d950.5d493.5d950.5d493.5d1024d44d1024d44d940d390d537.5d56.5d537.5d56.5d464hR2d537.5R3d493.5R4d44R5d560R6d0R7d516R8d168R9d241.5R10i122R11d44R12d537.5R13ai1i2i2i2i2i2i2i2i2i2i2hg:65oR0d950.5R1ad350d377d213d748.5d487.5d748.5d350d377d293d277.5d407.5d277.5d692d1024d587d1024d519d832.5d182.5d832.5d114.5d1024d8d1024d293d277.5hR2d700.5R3d692R4d8R5d746.5R6d0R7d738.5R8d168R9d241.5R10i65R11d8R12d700.5R13ai1i2i2i2i1i2i2i2i2i2i2i2i2hg:121oR0d950.5R1ad329.5d1076d290.5d1176d253.5d1206.5d216.5d1237d154.5d1237d81d1237d81d1160d135d1160d173d1160d194d1142d215d1124d240.5d1057d257d1015d30.5d464d128d464d303d902d478d464d575.5d464d329.5d1076hR2d606R3d575.5R4d30.5R5d560R6d-213R7d529.5R8d168R9d241.5R10i121R11d30.5R12d606R13ai1i3i3i2i2i2i3i3i2i2i2i2i2i2i2hg:64oR0d950.5R1ad381d755.5d381d827d416.5d867.75d452d908.5d514d908.5d575.5d908.5d610.75d867.5d646d826.5d646d755.5d646d685.5d610d644.25d574d603d513d603d452.5d603d416.75d644d381d685d381d755.5d653.5d905d623.5d943.5d584.75d961.75d546d980d494.5d980d408.5d980d354.75d917.75d301d855.5d301d755.5d301d655.5d355d593d409d530.5d494.5d530.5d546d530.5d585d549.25d624d568d653.5d606d653.5d540.5d725d540.5d725d908.5d798d897.5d839.25d841.75d880.5d786d880.5d697.5d880.5d644d864.75d597d849d550d817d510d765d444.5d690.25d409.75d615.5d375d527.5d375d466d375d409.5d391.25d353d407.5d305d439.5d226.5d490.5d182.25d573.25d138d656d138d752.5d138d832d166.75d901.5d195.5d971d250d1024d302.5d1076d371.5d1103.25d440.5d1130.5d519d1130.5d583.5d1130.5d645.75d1108.75d708d1087d760d1046.5d805d1102d742.5d1150.5d668.75d1176.25d595d1202d519d1202d426.5d1202d344.5d1169.25d262.5d1136.5d198.5d1074d134.5d1011.5d101d929.25d67.5d847d67.5d752.5d67.5d661.5d101.5d579d135.5d496.5d198.5d434d263d370.5d347.5d336.75d432d303d526.5d303d632.5d303d723.25d346.5d814d390d875.5d470d913d519d932.75d576.5d952.5d634d952.5d695.5d952.5d827d873d903d793.5d979d653.5d982d653.5d905hR2d1024R3d952.5R4d67.5R5d721R6d-178R7d653.5R8d168R9d241.5R10i64R11d67.5R12d1024R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i2hg:120oR0d950.5R1ad562d464d359.5d736.5d572.5d1024d464d1024d301d804d138d1024d29.5d1024d247d731d48d464d156.5d464d305d663.5d453.5d464d562d464hR2d606R3d572.5R4d29.5R5d560R6d0R7d530.5R8d168R9d241.5R10i120R11d29.5R12d606R13ai1i2i2i2i2i2i2i2i2i2i2i2i2hg:63oR0d950.5R1ad195.5d897d297d897d297d1024d195.5d1024d195.5d897d294d823.5d198.5d823.5d198.5d746.5d198.5d696d212.5d663.5d226.5d631d271.5d588d316.5d543.5d345d517d357.75d493.5d370.5d470d370.5d445.5d370.5d401d337.75d373.5d305d346d251d346d211.5d346d166.75d363.5d122d381d73.5d414.5d73.5d320.5d120.5d292d168.75d278d217d264d268.5d264d360.5d264d416.25d312.5d472d361d472d440.5d472d478.5d454d512.75d436d547d391d590d347d633d323.5d656.5d313.75d669.75d304d683d300d695.5d297d706d295.5d721d294d736d294d762d294d823.5hR2d543.5R3d472R4d73.5R5d760R6d0R7d686.5R8d168R9d241.5R10i63R11d73.5R12d543.5R13ai1i2i2i2i2i1i2i2i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i2hg:119oR0d950.5R1ad43d464d135d464d250d901d364.5d464d473d464d588d901d702.5d464d794.5d464d648d1024d539.5d1024d419d565d298d1024d189.5d1024d43d464hR2d837.5R3d794.5R4d43R5d560R6d0R7d517R8d168R9d241.5R10i119R11d43R12d837.5R13ai1i2i2i2i2i2i2i2i2i2i2i2i2i2hg:62oR0d950.5R1ad108.5d520d108.5d429d749.5d661.5d749.5d744.5d108.5d977d108.5d886d623.5d703.5d108.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i62R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:118oR0d950.5R1ad30.5d464d128d464d303d934d478d464d575.5d464d365.5d1024d240.5d1024d30.5d464hR2d606R3d575.5R4d30.5R5d560R6d0R7d529.5R8d168R9d241.5R10i118R11d30.5R12d606R13ai1i2i2i2i2i2i2i2hg:61oR0d950.5R1ad108.5d559d749.5d559d749.5d643d108.5d643d108.5d559d108.5d763d749.5d763d749.5d848d108.5d848d108.5d763hR2d858R3d749.5R4d108.5R5d465R6d176R7d356.5R8d168R9d241.5R10i61R11d108.5R12d858R13ai1i2i2i2i2i1i2i2i2i2hg:117oR0d950.5R1ad87d803d87d464d179d464d179d799.5d179d879d210d918.75d241d958.5d303d958.5d377.5d958.5d420.75d911d464d863.5d464d781.5d464d464d556d464d556d1024d464d1024d464d938d430.5d989d386.25d1013.75d342d1038.5d283.5d1038.5d187d1038.5d137d978.5d87d918.5d87d803hR2d649R3d556R4d87R5d560R6d-14.5R7d473R8d168R9d241.5R10i117R11d87R12d649R13ai1i2i2i2i3i3i3i3i2i2i2i2i2i3i3i3i3hg:60oR0d950.5R1ad749.5d520d233.5d703.5d749.5d886d749.5d977d108.5d744.5d108.5d661.5d749.5d429d749.5d520hR2d858R3d749.5R4d108.5R5d595R6d47R7d486.5R8d168R9d241.5R10i60R11d108.5R12d858R13ai1i2i2i2i2i2i2i2hg:116oR0d950.5R1ad187.5d305d187.5d464d377d464d377d535.5d187.5d535.5d187.5d839.5d187.5d908d206.25d927.5d225d947d282.5d947d377d947d377d1024d282.5d1024d176d1024d135.5d984.25d95d944.5d95d839.5d95d535.5d27.5d535.5d27.5d464d95d464d95d305d187.5d305hR2d401.5R3d377R4d27.5R5d719R6d0R7d691.5R8d168R9d241.5R10i116R11d27.5R12d401.5R13ai1i2i2i2i2i2i3i3i2i2i2i3i3i2i2i2i2i2i2hg:59oR0d950.5R1ad120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5d120d897d225.5d897d225.5d983d143.5d1143d79d1143d120d983d120d897hR2d345R3d225.5R4d79R5d529.5R6d-119R7d450.5R8d168R9d241.5R10i59R11d79R12d345R13ai1i2i2i2i2i1i2i2i2i2i2i2hg:115oR0d950.5R1ad453.5d480.5d453.5d567.5d414.5d547.5d372.5d537.5d330.5d527.5d285.5d527.5d217d527.5d182.75d548.5d148.5d569.5d148.5d611.5d148.5d643.5d173d661.75d197.5d680d271.5d696.5d303d703.5d401d724.5d442.25d762.75d483.5d801d483.5d869.5d483.5d947.5d421.75d993d360d1038.5d252d1038.5d207d1038.5d158.25d1029.75d109.5d1021d55.5d1003.5d55.5d908.5d106.5d935d156d948.25d205.5d961.5d254d961.5d319d961.5d354d939.25d389d917d389d876.5d389d839d363.75d819d338.5d799d253d780.5d221d773d135.5d755d97.5d717.75d59.5d680.5d59.5d615.5d59.5d536.5d115.5d493.5d171.5d450.5d274.5d450.5d325.5d450.5d370.5d458d415.5d465.5d453.5d480.5hR2d533.5R3d483.5R4d55.5R5d573.5R6d-14.5R7d518R8d168R9d241.5R10i115R11d55.5R12d533.5R13ai1i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3i2i3i3i3i3i3i3hg:58oR0d950.5R1ad120d897d225.5d897d225.5d1024d120d1024d120d897d120d494.5d225.5d494.5d225.5d621.5d120d621.5d120d494.5hR2d345R3d225.5R4d120R5d529.5R6d0R7d409.5R8d168R9d241.5R10i58R11d120R12d345R13ai1i2i2i2i2i1i2i2i2i2hg:114oR0d950.5R1ad421d550d405.5d541d387.25d536.75d369d532.5d347d532.5d269d532.5d227.25d583.25d185.5d634d185.5d729d185.5d1024d93d1024d93d464d185.5d464d185.5d551d214.5d500d261d475.25d307.5d450.5d374d450.5d383.5d450.5d395d451.75d406.5d453d420.5d455.5d421d550hR2d421R3d421R4d93R5d573.5R6d0R7d480.5R8d168R9d241.5R10i114R11d93R12d421R13ai1i3i3i3i3i2i2i2i2i2i3i3i3i3i2hg:57oR0d950.5R1ad112.5d1008.5d112.5d916.5d150.5d934.5d189.5d944d228.5d953.5d266d953.5d366d953.5d418.75d886.25d471.5d819d479d682d450d725d405.5d748d361d771d307d771d195d771d129.75d703.25d64.5d635.5d64.5d518d64.5d403d132.5d333.5d200.5d264d313.5d264d443d264d511.25d363.25d579.5d462.5d579.5d651.5d579.5d828d495.75d933.25d412d1038.5d270.5d1038.5d232.5d1038.5d193.5d1031d154.5d1023.5d112.5d1008.5d313.5d692d381.5d692d421.25d645.5d461d599d461d518d461d437.5d421.25d390.75d381.5d344d313.5d344d245.5d344d205.75d390.75d166d437.5d166d518d166d599d205.75d645.5d245.5d692d313.5d692hR2d651.5R3d579.5R4d64.5R5d760R6d-14.5R7d695.5R8d168R9d241.5R10i57R11d64.5R12d651.5R13ai1i2i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:113oR0d950.5R1ad151.5d744.5d151.5d846d193.25d903.75d235d961.5d308d961.5d381d961.5d423d903.75d465d846d465d744.5d465d643d423d585.25d381d527.5d308d527.5d235d527.5d193.25d585.25d151.5d643d151.5d744.5d465d940d436d990d391.75d1014.25d347.5d1038.5d285.5d1038.5d184d1038.5d120.25d957.5d56.5d876.5d56.5d744.5d56.5d612.5d120.25d531.5d184d450.5d285.5d450.5d347.5d450.5d391.75d474.75d436d499d465d549d465d464d557d464d557d1237d465d1237d465d940hR2d650R3d557R4d56.5R5d573.5R6d-213R7d517R8d168R9d241.5R10i113R11d56.5R12d650R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i2i2i2i2i2hg:56oR0d950.5R1ad325.5d669.5d253.5d669.5d212.25d708d171d746.5d171d814d171d881.5d212.25d920d253.5d958.5d325.5d958.5d397.5d958.5d439d919.75d480.5d881d480.5d814d480.5d746.5d439.25d708d398d669.5d325.5d669.5d224.5d626.5d159.5d610.5d123.25d566d87d521.5d87d457.5d87d368d150.75d316d214.5d264d325.5d264d437d264d500.5d316d564d368d564d457.5d564d521.5d527.75d566d491.5d610.5d427d626.5d500d643.5d540.75d693d581.5d742.5d581.5d814d581.5d922.5d515.25d980.5d449d1038.5d325.5d1038.5d202d1038.5d135.75d980.5d69.5d922.5d69.5d814d69.5d742.5d110.5d693d151.5d643.5d224.5d626.5d187.5d467d187.5d525d223.75d557.5d260d590d325.5d590d390.5d590d427.25d557.5d464d525d464d467d464d409d427.25d376.5d390.5d344d325.5d344d260d344d223.75d376.5d187.5d409d187.5d467hR2d651.5R3d581.5R4d69.5R5d760R6d-14.5R7d690.5R8d168R9d241.5R10i56R11d69.5R12d651.5R13ai1i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hg:112oR0d950.5R1ad185.5d940d185.5d1237d93d1237d93d464d185.5d464d185.5d549d214.5d499d258.75d474.75d303d450.5d364.5d450.5d466.5d450.5d530.25d531.5d594d612.5d594d744.5d594d876.5d530.25d957.5d466.5d1038.5d364.5d1038.5d303d1038.5d258.75d1014.25d214.5d990d185.5d940d498.5d744.5d498.5d643d456.75d585.25d415d527.5d342d527.5d269d527.5d227.25d585.25d185.5d643d185.5d744.5d185.5d846d227.25d903.75d269d961.5d342d961.5d415d961.5d456.75d903.75d498.5d846d498.5d744.5hR2d650R3d594R4d93R5d573.5R6d-213R7d480.5R8d168R9d241.5R10i112R11d93R12d650R13ai1i2i2i2i2i2i3i3i3i3i3i3i3i3i1i3i3i3i3i3i3i3i3hgh";
flash.text.Font.DEFAULT_FONT_SCALE = 9.0;
flash.text.Font.DEFAULT_FONT_NAME = "Bitstream_Vera_Sans";
flash.text.Font.DEFAULT_CLASS_NAME = "flash.text.Font";
flash.text.Font.__registeredFonts = new Array();
flash.display.Graphics.TILE_SCALE = 1;
flash.display.Graphics.TILE_ROTATION = 2;
flash.display.Graphics.TILE_RGB = 4;
flash.display.Graphics.TILE_ALPHA = 8;
flash.display.Graphics.TILE_TRANS_2x2 = 16;
flash.display.Graphics.TILE_BLEND_NORMAL = 0;
flash.display.Graphics.TILE_BLEND_ADD = 65536;
flash.display.Graphics.BMP_REPEAT = 16;
flash.display.Graphics.BMP_SMOOTH = 65536;
flash.display.Graphics.CORNER_ROUND = 0;
flash.display.Graphics.CORNER_MITER = 4096;
flash.display.Graphics.CORNER_BEVEL = 8192;
flash.display.Graphics.CURVE = 2;
flash.display.Graphics.END_NONE = 0;
flash.display.Graphics.END_ROUND = 256;
flash.display.Graphics.END_SQUARE = 512;
flash.display.Graphics.LINE = 1;
flash.display.Graphics.MOVE = 0;
flash.display.Graphics.__MAX_DIM = 5000;
flash.display.Graphics.PIXEL_HINTING = 16384;
flash.display.Graphics.RADIAL = 1;
flash.display.Graphics.SCALE_HORIZONTAL = 2;
flash.display.Graphics.SCALE_NONE = 0;
flash.display.Graphics.SCALE_NORMAL = 3;
flash.display.Graphics.SCALE_VERTICAL = 1;
flash.display.Graphics.SPREAD_REPEAT = 2;
flash.display.Graphics.SPREAD_REFLECT = 4;
flash.Lib.HTML_ACCELEROMETER_EVENT_TYPE = "devicemotion";
flash.Lib.HTML_ORIENTATION_EVENT_TYPE = "orientationchange";
flash.Lib.DEFAULT_HEIGHT = 500;
flash.Lib.DEFAULT_WIDTH = 500;
flash.Lib.HTML_DIV_EVENT_TYPES = ["resize","mouseover","mouseout","mousewheel","dblclick","click"];
flash.Lib.HTML_TOUCH_EVENT_TYPES = ["touchstart","touchmove","touchend"];
flash.Lib.HTML_TOUCH_ALT_EVENT_TYPES = ["mousedown","mousemove","mouseup"];
flash.Lib.HTML_WINDOW_EVENT_TYPES = ["keyup","keypress","keydown","resize","blur","focus"];
flash.Lib.NME_IDENTIFIER = "haxe:openfl";
flash.Lib.VENDOR_HTML_TAG = "data-";
flash.Lib.starttime = haxe.Timer.stamp();
js.Browser.window = typeof window != "undefined" ? window : null;
js.Browser.document = typeof window != "undefined" ? window.document : null;
flash.events.Event.ACTIVATE = "activate";
flash.events.Event.ADDED = "added";
flash.events.Event.ADDED_TO_STAGE = "addedToStage";
flash.events.Event.CANCEL = "cancel";
flash.events.Event.CHANGE = "change";
flash.events.Event.CLOSE = "close";
flash.events.Event.COMPLETE = "complete";
flash.events.Event.CONNECT = "connect";
flash.events.Event.CONTEXT3D_CREATE = "context3DCreate";
flash.events.Event.DEACTIVATE = "deactivate";
flash.events.Event.ENTER_FRAME = "enterFrame";
flash.events.Event.ID3 = "id3";
flash.events.Event.INIT = "init";
flash.events.Event.MOUSE_LEAVE = "mouseLeave";
flash.events.Event.OPEN = "open";
flash.events.Event.REMOVED = "removed";
flash.events.Event.REMOVED_FROM_STAGE = "removedFromStage";
flash.events.Event.RENDER = "render";
flash.events.Event.RESIZE = "resize";
flash.events.Event.SCROLL = "scroll";
flash.events.Event.SELECT = "select";
flash.events.Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
flash.events.Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
flash.events.Event.TAB_INDEX_CHANGE = "tabIndexChange";
flash.events.Event.UNLOAD = "unload";
flash.events.Event.SOUND_COMPLETE = "soundComplete";
flash.events.MouseEvent.CLICK = "click";
flash.events.MouseEvent.DOUBLE_CLICK = "doubleClick";
flash.events.MouseEvent.MOUSE_DOWN = "mouseDown";
flash.events.MouseEvent.MOUSE_MOVE = "mouseMove";
flash.events.MouseEvent.MOUSE_OUT = "mouseOut";
flash.events.MouseEvent.MOUSE_OVER = "mouseOver";
flash.events.MouseEvent.MOUSE_UP = "mouseUp";
flash.events.MouseEvent.MOUSE_WHEEL = "mouseWheel";
flash.events.MouseEvent.RIGHT_CLICK = "rightClick";
flash.events.MouseEvent.RIGHT_MOUSE_DOWN = "rightMouseDown";
flash.events.MouseEvent.RIGHT_MOUSE_UP = "rightMouseUp";
flash.events.MouseEvent.ROLL_OUT = "rollOut";
flash.events.MouseEvent.ROLL_OVER = "rollOver";
flash.display.Stage.NAME = "Stage";
flash.display.Stage.OrientationPortrait = 1;
flash.display.Stage.OrientationPortraitUpsideDown = 2;
flash.display.Stage.OrientationLandscapeRight = 3;
flash.display.Stage.OrientationLandscapeLeft = 4;
flash.display.Stage.__acceleration = { x : 0.0, y : 1.0, z : 0.0};
flash.display.Stage.DEFAULT_FRAMERATE = 0.0;
flash.display.Stage.UI_EVENTS_QUEUE_MAX = 1000;
flash.display.Stage.__mouseChanges = [flash.events.MouseEvent.MOUSE_OUT,flash.events.MouseEvent.MOUSE_OVER,flash.events.MouseEvent.ROLL_OUT,flash.events.MouseEvent.ROLL_OVER];
flash.display.Stage.__touchChanges = ["touchOut","touchOver","touchRollOut","touchRollOver"];
flash.system.ApplicationDomain.currentDomain = new flash.system.ApplicationDomain(null);
flash.utils.Uuid.UID_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
flash.geom.Transform.DEG_TO_RAD = Math.PI / 180.0;
com.haxepunk.HXP.VERSION = "2.5.0";
com.haxepunk.HXP.INT_MAX_VALUE = 2147483646;
com.haxepunk.HXP.blackColor = 0;
com.haxepunk.HXP.frameRate = 0;
com.haxepunk.HXP.rate = 1;
com.haxepunk.HXP.defaultFont = "font/04B_03__.ttf";
com.haxepunk.HXP.camera = new flash.geom.Point();
com.haxepunk.HXP.tweener = new com.haxepunk.Tweener();
com.haxepunk.HXP.focused = false;
com.haxepunk.HXP.orientations = [];
com.haxepunk.HXP.log = Reflect.makeVarArgs(function(data) {
	if(com.haxepunk.HXP._console != null) com.haxepunk.HXP._console.log(data);
});
com.haxepunk.HXP.watch = Reflect.makeVarArgs(function(properties) {
	if(com.haxepunk.HXP._console != null) com.haxepunk.HXP._console.watch(properties);
});
com.haxepunk.HXP._scene = new com.haxepunk.Scene();
com.haxepunk.HXP._bitmap = new haxe.ds.StringMap();
com.haxepunk.HXP._seed = 0;
com.haxepunk.HXP._volume = 1;
com.haxepunk.HXP._pan = 0;
com.haxepunk.HXP._soundTransform = new flash.media.SoundTransform();
com.haxepunk.HXP.point = new flash.geom.Point();
com.haxepunk.HXP.point2 = new flash.geom.Point();
com.haxepunk.HXP.zero = new flash.geom.Point();
com.haxepunk.HXP.rect = new flash.geom.Rectangle();
com.haxepunk.HXP.matrix = new flash.geom.Matrix();
com.haxepunk.HXP.sprite = new flash.display.Sprite();
com.haxepunk.debug.Console.BIG_WIDTH_THRESHOLD = 420;
com.haxepunk.graphics.Image._flips = new haxe.ds.StringMap();
com.haxepunk.graphics.atlas.Atlas.smooth = false;
com.haxepunk.graphics.atlas.AtlasData.BLEND_NONE = -1;
com.haxepunk.graphics.atlas.AtlasData.BLEND_ADD = 65536;
com.haxepunk.graphics.atlas.AtlasData.BLEND_NORMAL = 0;
com.haxepunk.graphics.atlas.AtlasData._dataPool = new haxe.ds.StringMap();
com.haxepunk.graphics.atlas.AtlasData._atlases = new Array();
com.haxepunk.masks.Polygon.firstProj = new com.haxepunk.math.Projection();
com.haxepunk.masks.Polygon.secondProj = new com.haxepunk.math.Projection();
com.haxepunk.masks.Polygon.vertical = new com.haxepunk.math.Vector(0,1);
com.haxepunk.masks.Polygon.horizontal = new com.haxepunk.math.Vector(1,0);
com.haxepunk.tweens.TweenEvent.START = "start";
com.haxepunk.tweens.TweenEvent.UPDATE = "update";
com.haxepunk.tweens.TweenEvent.FINISH = "finish";
com.haxepunk.utils.Draw._matrix = new flash.geom.Matrix();
com.haxepunk.utils.Ease.B1 = 1 / 2.75;
com.haxepunk.utils.Ease.B2 = 2 / 2.75;
com.haxepunk.utils.Ease.B3 = 1.5 / 2.75;
com.haxepunk.utils.Ease.B4 = 2.5 / 2.75;
com.haxepunk.utils.Ease.B5 = 2.25 / 2.75;
com.haxepunk.utils.Ease.B6 = 2.625 / 2.75;
com.haxepunk.utils.HaxelibInfo.$name = "HaxePunk";
com.haxepunk.utils.HaxelibInfo.license = "MIT";
com.haxepunk.utils.HaxelibInfo.tags = ["flash","game","cpp","openfl"];
com.haxepunk.utils.HaxelibInfo.description = "A Haxe port of the FlashPunk AS3 engine.";
com.haxepunk.utils.HaxelibInfo.contributors = ["heardtheword","ibilon"];
com.haxepunk.utils.HaxelibInfo.releasenote = "See CHANGELOG";
com.haxepunk.utils.HaxelibInfo.version = "2.5.0";
com.haxepunk.utils.HaxelibInfo.url = "http://haxepunk.com";
com.haxepunk.utils.HaxelibInfo.install = { openfl : "1.2.2", 'openfl-native' : "1.2.2", 'lime-tools' : "1.2.7", 'openfl-bitfive' : "1.0.5", 'openfl-html5-dom' : "1.2.0", lime : "0.9.3", 'openfl-ouya' : "1.0.2"};
com.haxepunk.utils.HaxelibInfo.dependencies = { };
com.haxepunk.utils.Input.keyString = "";
com.haxepunk.utils.Input.multiTouchSupported = false;
com.haxepunk.utils.Input.kKeyStringMax = 100;
com.haxepunk.utils.Input._enabled = false;
com.haxepunk.utils.Input._touchNum = 0;
com.haxepunk.utils.Input._key = new Array();
com.haxepunk.utils.Input._keyNum = 0;
com.haxepunk.utils.Input._press = new Array();
com.haxepunk.utils.Input._pressNum = 0;
com.haxepunk.utils.Input._release = new Array();
com.haxepunk.utils.Input._releaseNum = 0;
com.haxepunk.utils.Input._mouseWheelDelta = 0;
com.haxepunk.utils.Input._touches = new haxe.ds.IntMap();
com.haxepunk.utils.Input._joysticks = new haxe.ds.IntMap();
com.haxepunk.utils.Input._control = new haxe.ds.StringMap();
com.haxepunk.utils.Input._nativeCorrection = new haxe.ds.StringMap();
com.haxepunk.utils.Joystick.deadZone = 0.15;
com.haxepunk.utils.OUYA_GAMEPAD.O_BUTTON = 0;
com.haxepunk.utils.OUYA_GAMEPAD.U_BUTTON = 3;
com.haxepunk.utils.OUYA_GAMEPAD.Y_BUTTON = 4;
com.haxepunk.utils.OUYA_GAMEPAD.A_BUTTON = 1;
com.haxepunk.utils.OUYA_GAMEPAD.LB_BUTTON = 6;
com.haxepunk.utils.OUYA_GAMEPAD.RB_BUTTON = 7;
com.haxepunk.utils.OUYA_GAMEPAD.BACK_BUTTON = 5;
com.haxepunk.utils.OUYA_GAMEPAD.START_BUTTON = 4;
com.haxepunk.utils.OUYA_GAMEPAD.LEFT_ANALOGUE_BUTTON = 8;
com.haxepunk.utils.OUYA_GAMEPAD.RIGHT_ANALOGUE_BUTTON = 9;
com.haxepunk.utils.OUYA_GAMEPAD.HOME_BUTTON = 10;
com.haxepunk.utils.OUYA_GAMEPAD.DPAD_UP = 19;
com.haxepunk.utils.OUYA_GAMEPAD.DPAD_DOWN = 20;
com.haxepunk.utils.OUYA_GAMEPAD.DPAD_LEFT = 21;
com.haxepunk.utils.OUYA_GAMEPAD.DPAD_RIGHT = 22;
com.haxepunk.utils.OUYA_GAMEPAD.LEFT_ANALOGUE_X = 0;
com.haxepunk.utils.OUYA_GAMEPAD.LEFT_ANALOGUE_Y = 1;
com.haxepunk.utils.OUYA_GAMEPAD.RIGHT_ANALOGUE_X = 11;
com.haxepunk.utils.OUYA_GAMEPAD.RIGHT_ANALOGUE_Y = 14;
com.haxepunk.utils.OUYA_GAMEPAD.LEFT_TRIGGER = 17;
com.haxepunk.utils.OUYA_GAMEPAD.RIGHT_TRIGGER = 18;
com.haxepunk.utils.XBOX_GAMEPAD.A_BUTTON = 0;
com.haxepunk.utils.XBOX_GAMEPAD.B_BUTTON = 1;
com.haxepunk.utils.XBOX_GAMEPAD.X_BUTTON = 2;
com.haxepunk.utils.XBOX_GAMEPAD.Y_BUTTON = 3;
com.haxepunk.utils.XBOX_GAMEPAD.LB_BUTTON = 4;
com.haxepunk.utils.XBOX_GAMEPAD.RB_BUTTON = 5;
com.haxepunk.utils.XBOX_GAMEPAD.BACK_BUTTON = 6;
com.haxepunk.utils.XBOX_GAMEPAD.START_BUTTON = 7;
com.haxepunk.utils.XBOX_GAMEPAD.LEFT_ANALOGUE_BUTTON = 8;
com.haxepunk.utils.XBOX_GAMEPAD.RIGHT_ANALOGUE_BUTTON = 9;
com.haxepunk.utils.XBOX_GAMEPAD.LEFT_ANALOGUE_X = 0;
com.haxepunk.utils.XBOX_GAMEPAD.LEFT_ANALOGUE_Y = 1;
com.haxepunk.utils.XBOX_GAMEPAD.RIGHT_ANALOGUE_X = 4;
com.haxepunk.utils.XBOX_GAMEPAD.RIGHT_ANALOGUE_Y = 3;
com.haxepunk.utils.XBOX_GAMEPAD.TRIGGER = 2;
com.haxepunk.utils.PS3_GAMEPAD.TRIANGLE_BUTTON = 12;
com.haxepunk.utils.PS3_GAMEPAD.CIRCLE_BUTTON = 13;
com.haxepunk.utils.PS3_GAMEPAD.X_BUTTON = 14;
com.haxepunk.utils.PS3_GAMEPAD.SQUARE_BUTTON = 15;
com.haxepunk.utils.PS3_GAMEPAD.L1_BUTTON = 10;
com.haxepunk.utils.PS3_GAMEPAD.R1_BUTTON = 11;
com.haxepunk.utils.PS3_GAMEPAD.L2_BUTTON = 8;
com.haxepunk.utils.PS3_GAMEPAD.R2_BUTTON = 9;
com.haxepunk.utils.PS3_GAMEPAD.SELECT_BUTTON = 0;
com.haxepunk.utils.PS3_GAMEPAD.START_BUTTON = 3;
com.haxepunk.utils.PS3_GAMEPAD.PS_BUTTON = 16;
com.haxepunk.utils.PS3_GAMEPAD.LEFT_ANALOGUE_BUTTON = 1;
com.haxepunk.utils.PS3_GAMEPAD.RIGHT_ANALOGUE_BUTTON = 2;
com.haxepunk.utils.PS3_GAMEPAD.DPAD_UP = 4;
com.haxepunk.utils.PS3_GAMEPAD.DPAD_DOWN = 6;
com.haxepunk.utils.PS3_GAMEPAD.DPAD_LEFT = 7;
com.haxepunk.utils.PS3_GAMEPAD.DPAD_RIGHT = 5;
com.haxepunk.utils.PS3_GAMEPAD.LEFT_ANALOGUE_X = 0;
com.haxepunk.utils.PS3_GAMEPAD.LEFT_ANALOGUE_Y = 1;
com.haxepunk.utils.PS3_GAMEPAD.TRIANGLE_BUTTON_PRESSURE = 16;
com.haxepunk.utils.PS3_GAMEPAD.CIRCLE_BUTTON_PRESSURE = 17;
com.haxepunk.utils.PS3_GAMEPAD.X_BUTTON_PRESSURE = 18;
com.haxepunk.utils.PS3_GAMEPAD.SQUARE_BUTTON_PRESSURE = 19;
com.haxepunk.utils.Key.ANY = -1;
com.haxepunk.utils.Key.LEFT = 37;
com.haxepunk.utils.Key.UP = 38;
com.haxepunk.utils.Key.RIGHT = 39;
com.haxepunk.utils.Key.DOWN = 40;
com.haxepunk.utils.Key.ENTER = 13;
com.haxepunk.utils.Key.COMMAND = 15;
com.haxepunk.utils.Key.CONTROL = 17;
com.haxepunk.utils.Key.SPACE = 32;
com.haxepunk.utils.Key.SHIFT = 16;
com.haxepunk.utils.Key.BACKSPACE = 8;
com.haxepunk.utils.Key.CAPS_LOCK = 20;
com.haxepunk.utils.Key.DELETE = 46;
com.haxepunk.utils.Key.END = 35;
com.haxepunk.utils.Key.ESCAPE = 27;
com.haxepunk.utils.Key.HOME = 36;
com.haxepunk.utils.Key.INSERT = 45;
com.haxepunk.utils.Key.TAB = 9;
com.haxepunk.utils.Key.PAGE_DOWN = 34;
com.haxepunk.utils.Key.PAGE_UP = 33;
com.haxepunk.utils.Key.LEFT_SQUARE_BRACKET = 219;
com.haxepunk.utils.Key.RIGHT_SQUARE_BRACKET = 221;
com.haxepunk.utils.Key.TILDE = 192;
com.haxepunk.utils.Key.A = 65;
com.haxepunk.utils.Key.B = 66;
com.haxepunk.utils.Key.C = 67;
com.haxepunk.utils.Key.D = 68;
com.haxepunk.utils.Key.E = 69;
com.haxepunk.utils.Key.F = 70;
com.haxepunk.utils.Key.G = 71;
com.haxepunk.utils.Key.H = 72;
com.haxepunk.utils.Key.I = 73;
com.haxepunk.utils.Key.J = 74;
com.haxepunk.utils.Key.K = 75;
com.haxepunk.utils.Key.L = 76;
com.haxepunk.utils.Key.M = 77;
com.haxepunk.utils.Key.N = 78;
com.haxepunk.utils.Key.O = 79;
com.haxepunk.utils.Key.P = 80;
com.haxepunk.utils.Key.Q = 81;
com.haxepunk.utils.Key.R = 82;
com.haxepunk.utils.Key.S = 83;
com.haxepunk.utils.Key.T = 84;
com.haxepunk.utils.Key.U = 85;
com.haxepunk.utils.Key.V = 86;
com.haxepunk.utils.Key.W = 87;
com.haxepunk.utils.Key.X = 88;
com.haxepunk.utils.Key.Y = 89;
com.haxepunk.utils.Key.Z = 90;
com.haxepunk.utils.Key.F1 = 112;
com.haxepunk.utils.Key.F2 = 113;
com.haxepunk.utils.Key.F3 = 114;
com.haxepunk.utils.Key.F4 = 115;
com.haxepunk.utils.Key.F5 = 116;
com.haxepunk.utils.Key.F6 = 117;
com.haxepunk.utils.Key.F7 = 118;
com.haxepunk.utils.Key.F8 = 119;
com.haxepunk.utils.Key.F9 = 120;
com.haxepunk.utils.Key.F10 = 121;
com.haxepunk.utils.Key.F11 = 122;
com.haxepunk.utils.Key.F12 = 123;
com.haxepunk.utils.Key.F13 = 124;
com.haxepunk.utils.Key.F14 = 125;
com.haxepunk.utils.Key.F15 = 126;
com.haxepunk.utils.Key.DIGIT_0 = 48;
com.haxepunk.utils.Key.DIGIT_1 = 49;
com.haxepunk.utils.Key.DIGIT_2 = 50;
com.haxepunk.utils.Key.DIGIT_3 = 51;
com.haxepunk.utils.Key.DIGIT_4 = 52;
com.haxepunk.utils.Key.DIGIT_5 = 53;
com.haxepunk.utils.Key.DIGIT_6 = 54;
com.haxepunk.utils.Key.DIGIT_7 = 55;
com.haxepunk.utils.Key.DIGIT_8 = 56;
com.haxepunk.utils.Key.DIGIT_9 = 57;
com.haxepunk.utils.Key.NUMPAD_0 = 96;
com.haxepunk.utils.Key.NUMPAD_1 = 97;
com.haxepunk.utils.Key.NUMPAD_2 = 98;
com.haxepunk.utils.Key.NUMPAD_3 = 99;
com.haxepunk.utils.Key.NUMPAD_4 = 100;
com.haxepunk.utils.Key.NUMPAD_5 = 101;
com.haxepunk.utils.Key.NUMPAD_6 = 102;
com.haxepunk.utils.Key.NUMPAD_7 = 103;
com.haxepunk.utils.Key.NUMPAD_8 = 104;
com.haxepunk.utils.Key.NUMPAD_9 = 105;
com.haxepunk.utils.Key.NUMPAD_ADD = 107;
com.haxepunk.utils.Key.NUMPAD_DECIMAL = 110;
com.haxepunk.utils.Key.NUMPAD_DIVIDE = 111;
com.haxepunk.utils.Key.NUMPAD_ENTER = 108;
com.haxepunk.utils.Key.NUMPAD_MULTIPLY = 106;
com.haxepunk.utils.Key.NUMPAD_SUBTRACT = 109;
flash.display._BitmapData.MinstdGenerator.a = 16807;
flash.display._BitmapData.MinstdGenerator.m = -2147483648 - 1;
flash.display.BitmapDataChannel.ALPHA = 8;
flash.display.BitmapDataChannel.BLUE = 4;
flash.display.BitmapDataChannel.GREEN = 2;
flash.display.BitmapDataChannel.RED = 1;
flash.display.GraphicsPathCommand.LINE_TO = 2;
flash.display.GraphicsPathCommand.MOVE_TO = 1;
flash.display.GraphicsPathCommand.CURVE_TO = 3;
flash.display.GraphicsPathCommand.WIDE_LINE_TO = 5;
flash.display.GraphicsPathCommand.WIDE_MOVE_TO = 4;
flash.display.GraphicsPathCommand.NO_OP = 0;
flash.display.GraphicsPathCommand.CUBIC_CURVE_TO = 6;
flash.display.StageQuality.BEST = "best";
flash.display.StageQuality.HIGH = "high";
flash.display.StageQuality.MEDIUM = "medium";
flash.display.StageQuality.LOW = "low";
flash.errors.Error.DEFAULT_TO_STRING = "Error";
flash.events.TextEvent.LINK = "link";
flash.events.TextEvent.TEXT_INPUT = "textInput";
flash.events.ErrorEvent.ERROR = "error";
flash.events.Listener.sIDs = 1;
flash.events.EventPhase.CAPTURING_PHASE = 0;
flash.events.EventPhase.AT_TARGET = 1;
flash.events.EventPhase.BUBBLING_PHASE = 2;
flash.events.FocusEvent.FOCUS_IN = "focusIn";
flash.events.FocusEvent.FOCUS_OUT = "focusOut";
flash.events.FocusEvent.KEY_FOCUS_CHANGE = "keyFocusChange";
flash.events.FocusEvent.MOUSE_FOCUS_CHANGE = "mouseFocusChange";
flash.events.HTTPStatusEvent.HTTP_RESPONSE_STATUS = "httpResponseStatus";
flash.events.HTTPStatusEvent.HTTP_STATUS = "httpStatus";
flash.events.IOErrorEvent.IO_ERROR = "ioError";
flash.events.KeyboardEvent.KEY_DOWN = "keyDown";
flash.events.KeyboardEvent.KEY_UP = "keyUp";
flash.events.ProgressEvent.PROGRESS = "progress";
flash.events.ProgressEvent.SOCKET_DATA = "socketData";
flash.events.SecurityErrorEvent.SECURITY_ERROR = "securityError";
flash.events.TouchEvent.TOUCH_BEGIN = "touchBegin";
flash.events.TouchEvent.TOUCH_END = "touchEnd";
flash.events.TouchEvent.TOUCH_MOVE = "touchMove";
flash.events.TouchEvent.TOUCH_OUT = "touchOut";
flash.events.TouchEvent.TOUCH_OVER = "touchOver";
flash.events.TouchEvent.TOUCH_ROLL_OUT = "touchRollOut";
flash.events.TouchEvent.TOUCH_ROLL_OVER = "touchRollOver";
flash.events.TouchEvent.TOUCH_TAP = "touchTap";
flash.filters.DropShadowFilter.DEGREES_FULL_RADIUS = 360.0;
flash.media.Sound.EXTENSION_MP3 = "mp3";
flash.media.Sound.EXTENSION_OGG = "ogg";
flash.media.Sound.EXTENSION_WAV = "wav";
flash.media.Sound.EXTENSION_AAC = "aac";
flash.media.Sound.MEDIA_TYPE_MP3 = "audio/mpeg";
flash.media.Sound.MEDIA_TYPE_OGG = "audio/ogg; codecs=\"vorbis\"";
flash.media.Sound.MEDIA_TYPE_WAV = "audio/wav; codecs=\"1\"";
flash.media.Sound.MEDIA_TYPE_AAC = "audio/mp4; codecs=\"mp4a.40.2\"";
flash.net.URLRequestMethod.DELETE = "DELETE";
flash.net.URLRequestMethod.GET = "GET";
flash.net.URLRequestMethod.HEAD = "HEAD";
flash.net.URLRequestMethod.OPTIONS = "OPTIONS";
flash.net.URLRequestMethod.POST = "POST";
flash.net.URLRequestMethod.PUT = "PUT";
flash.system.SecurityDomain.currentDomain = new flash.system.SecurityDomain();
flash.system.System.useCodePage = false;
flash.text.TextField.mDefaultFont = "Bitstream_Vera_Sans";
flash.text.FontInstance.mSolidFonts = new haxe.ds.StringMap();
flash.text.TextFieldAutoSize.CENTER = "CENTER";
flash.text.TextFieldAutoSize.LEFT = "LEFT";
flash.text.TextFieldAutoSize.NONE = "NONE";
flash.text.TextFieldAutoSize.RIGHT = "RIGHT";
flash.text.TextFieldType.DYNAMIC = "DYNAMIC";
flash.text.TextFieldType.INPUT = "INPUT";
flash.ui.Keyboard.NUMBER_0 = 48;
flash.ui.Keyboard.NUMBER_1 = 49;
flash.ui.Keyboard.NUMBER_2 = 50;
flash.ui.Keyboard.NUMBER_3 = 51;
flash.ui.Keyboard.NUMBER_4 = 52;
flash.ui.Keyboard.NUMBER_5 = 53;
flash.ui.Keyboard.NUMBER_6 = 54;
flash.ui.Keyboard.NUMBER_7 = 55;
flash.ui.Keyboard.NUMBER_8 = 56;
flash.ui.Keyboard.NUMBER_9 = 57;
flash.ui.Keyboard.A = 65;
flash.ui.Keyboard.B = 66;
flash.ui.Keyboard.C = 67;
flash.ui.Keyboard.D = 68;
flash.ui.Keyboard.E = 69;
flash.ui.Keyboard.F = 70;
flash.ui.Keyboard.G = 71;
flash.ui.Keyboard.H = 72;
flash.ui.Keyboard.I = 73;
flash.ui.Keyboard.J = 74;
flash.ui.Keyboard.K = 75;
flash.ui.Keyboard.L = 76;
flash.ui.Keyboard.M = 77;
flash.ui.Keyboard.N = 78;
flash.ui.Keyboard.O = 79;
flash.ui.Keyboard.P = 80;
flash.ui.Keyboard.Q = 81;
flash.ui.Keyboard.R = 82;
flash.ui.Keyboard.S = 83;
flash.ui.Keyboard.T = 84;
flash.ui.Keyboard.U = 85;
flash.ui.Keyboard.V = 86;
flash.ui.Keyboard.W = 87;
flash.ui.Keyboard.X = 88;
flash.ui.Keyboard.Y = 89;
flash.ui.Keyboard.Z = 90;
flash.ui.Keyboard.NUMPAD_0 = 96;
flash.ui.Keyboard.NUMPAD_1 = 97;
flash.ui.Keyboard.NUMPAD_2 = 98;
flash.ui.Keyboard.NUMPAD_3 = 99;
flash.ui.Keyboard.NUMPAD_4 = 100;
flash.ui.Keyboard.NUMPAD_5 = 101;
flash.ui.Keyboard.NUMPAD_6 = 102;
flash.ui.Keyboard.NUMPAD_7 = 103;
flash.ui.Keyboard.NUMPAD_8 = 104;
flash.ui.Keyboard.NUMPAD_9 = 105;
flash.ui.Keyboard.NUMPAD_MULTIPLY = 106;
flash.ui.Keyboard.NUMPAD_ADD = 107;
flash.ui.Keyboard.NUMPAD_ENTER = 108;
flash.ui.Keyboard.NUMPAD_SUBTRACT = 109;
flash.ui.Keyboard.NUMPAD_DECIMAL = 110;
flash.ui.Keyboard.NUMPAD_DIVIDE = 111;
flash.ui.Keyboard.F1 = 112;
flash.ui.Keyboard.F2 = 113;
flash.ui.Keyboard.F3 = 114;
flash.ui.Keyboard.F4 = 115;
flash.ui.Keyboard.F5 = 116;
flash.ui.Keyboard.F6 = 117;
flash.ui.Keyboard.F7 = 118;
flash.ui.Keyboard.F8 = 119;
flash.ui.Keyboard.F9 = 120;
flash.ui.Keyboard.F10 = 121;
flash.ui.Keyboard.F11 = 122;
flash.ui.Keyboard.F12 = 123;
flash.ui.Keyboard.F13 = 124;
flash.ui.Keyboard.F14 = 125;
flash.ui.Keyboard.F15 = 126;
flash.ui.Keyboard.BACKSPACE = 8;
flash.ui.Keyboard.TAB = 9;
flash.ui.Keyboard.ENTER = 13;
flash.ui.Keyboard.SHIFT = 16;
flash.ui.Keyboard.CONTROL = 17;
flash.ui.Keyboard.CAPS_LOCK = 18;
flash.ui.Keyboard.ESCAPE = 27;
flash.ui.Keyboard.SPACE = 32;
flash.ui.Keyboard.PAGE_UP = 33;
flash.ui.Keyboard.PAGE_DOWN = 34;
flash.ui.Keyboard.END = 35;
flash.ui.Keyboard.HOME = 36;
flash.ui.Keyboard.LEFT = 37;
flash.ui.Keyboard.RIGHT = 39;
flash.ui.Keyboard.UP = 38;
flash.ui.Keyboard.DOWN = 40;
flash.ui.Keyboard.INSERT = 45;
flash.ui.Keyboard.DELETE = 46;
flash.ui.Keyboard.NUMLOCK = 144;
flash.ui.Keyboard.BREAK = 19;
flash.ui.Keyboard.SEMICOLON = 186;
flash.ui.Keyboard.EQUAL = 187;
flash.ui.Keyboard.COMMA = 188;
flash.ui.Keyboard.MINUS = 189;
flash.ui.Keyboard.PERIOD = 190;
flash.ui.Keyboard.SLASH = 191;
flash.ui.Keyboard.BACKQUOTE = 192;
flash.ui.Keyboard.LEFTBRACKET = 219;
flash.ui.Keyboard.BACKSLASH = 220;
flash.ui.Keyboard.RIGHTBRACKET = 221;
flash.ui.Keyboard.DOM_VK_CANCEL = 3;
flash.ui.Keyboard.DOM_VK_HELP = 6;
flash.ui.Keyboard.DOM_VK_BACK_SPACE = 8;
flash.ui.Keyboard.DOM_VK_TAB = 9;
flash.ui.Keyboard.DOM_VK_CLEAR = 12;
flash.ui.Keyboard.DOM_VK_RETURN = 13;
flash.ui.Keyboard.DOM_VK_ENTER = 14;
flash.ui.Keyboard.DOM_VK_SHIFT = 16;
flash.ui.Keyboard.DOM_VK_CONTROL = 17;
flash.ui.Keyboard.DOM_VK_ALT = 18;
flash.ui.Keyboard.DOM_VK_PAUSE = 19;
flash.ui.Keyboard.DOM_VK_CAPS_LOCK = 20;
flash.ui.Keyboard.DOM_VK_ESCAPE = 27;
flash.ui.Keyboard.DOM_VK_SPACE = 32;
flash.ui.Keyboard.DOM_VK_PAGE_UP = 33;
flash.ui.Keyboard.DOM_VK_PAGE_DOWN = 34;
flash.ui.Keyboard.DOM_VK_END = 35;
flash.ui.Keyboard.DOM_VK_HOME = 36;
flash.ui.Keyboard.DOM_VK_LEFT = 37;
flash.ui.Keyboard.DOM_VK_UP = 38;
flash.ui.Keyboard.DOM_VK_RIGHT = 39;
flash.ui.Keyboard.DOM_VK_DOWN = 40;
flash.ui.Keyboard.DOM_VK_PRINTSCREEN = 44;
flash.ui.Keyboard.DOM_VK_INSERT = 45;
flash.ui.Keyboard.DOM_VK_DELETE = 46;
flash.ui.Keyboard.DOM_VK_0 = 48;
flash.ui.Keyboard.DOM_VK_1 = 49;
flash.ui.Keyboard.DOM_VK_2 = 50;
flash.ui.Keyboard.DOM_VK_3 = 51;
flash.ui.Keyboard.DOM_VK_4 = 52;
flash.ui.Keyboard.DOM_VK_5 = 53;
flash.ui.Keyboard.DOM_VK_6 = 54;
flash.ui.Keyboard.DOM_VK_7 = 55;
flash.ui.Keyboard.DOM_VK_8 = 56;
flash.ui.Keyboard.DOM_VK_9 = 57;
flash.ui.Keyboard.DOM_VK_SEMICOLON = 59;
flash.ui.Keyboard.DOM_VK_EQUALS = 61;
flash.ui.Keyboard.DOM_VK_A = 65;
flash.ui.Keyboard.DOM_VK_B = 66;
flash.ui.Keyboard.DOM_VK_C = 67;
flash.ui.Keyboard.DOM_VK_D = 68;
flash.ui.Keyboard.DOM_VK_E = 69;
flash.ui.Keyboard.DOM_VK_F = 70;
flash.ui.Keyboard.DOM_VK_G = 71;
flash.ui.Keyboard.DOM_VK_H = 72;
flash.ui.Keyboard.DOM_VK_I = 73;
flash.ui.Keyboard.DOM_VK_J = 74;
flash.ui.Keyboard.DOM_VK_K = 75;
flash.ui.Keyboard.DOM_VK_L = 76;
flash.ui.Keyboard.DOM_VK_M = 77;
flash.ui.Keyboard.DOM_VK_N = 78;
flash.ui.Keyboard.DOM_VK_O = 79;
flash.ui.Keyboard.DOM_VK_P = 80;
flash.ui.Keyboard.DOM_VK_Q = 81;
flash.ui.Keyboard.DOM_VK_R = 82;
flash.ui.Keyboard.DOM_VK_S = 83;
flash.ui.Keyboard.DOM_VK_T = 84;
flash.ui.Keyboard.DOM_VK_U = 85;
flash.ui.Keyboard.DOM_VK_V = 86;
flash.ui.Keyboard.DOM_VK_W = 87;
flash.ui.Keyboard.DOM_VK_X = 88;
flash.ui.Keyboard.DOM_VK_Y = 89;
flash.ui.Keyboard.DOM_VK_Z = 90;
flash.ui.Keyboard.DOM_VK_CONTEXT_MENU = 93;
flash.ui.Keyboard.DOM_VK_NUMPAD0 = 96;
flash.ui.Keyboard.DOM_VK_NUMPAD1 = 97;
flash.ui.Keyboard.DOM_VK_NUMPAD2 = 98;
flash.ui.Keyboard.DOM_VK_NUMPAD3 = 99;
flash.ui.Keyboard.DOM_VK_NUMPAD4 = 100;
flash.ui.Keyboard.DOM_VK_NUMPAD5 = 101;
flash.ui.Keyboard.DOM_VK_NUMPAD6 = 102;
flash.ui.Keyboard.DOM_VK_NUMPAD7 = 103;
flash.ui.Keyboard.DOM_VK_NUMPAD8 = 104;
flash.ui.Keyboard.DOM_VK_NUMPAD9 = 105;
flash.ui.Keyboard.DOM_VK_MULTIPLY = 106;
flash.ui.Keyboard.DOM_VK_ADD = 107;
flash.ui.Keyboard.DOM_VK_SEPARATOR = 108;
flash.ui.Keyboard.DOM_VK_SUBTRACT = 109;
flash.ui.Keyboard.DOM_VK_DECIMAL = 110;
flash.ui.Keyboard.DOM_VK_DIVIDE = 111;
flash.ui.Keyboard.DOM_VK_F1 = 112;
flash.ui.Keyboard.DOM_VK_F2 = 113;
flash.ui.Keyboard.DOM_VK_F3 = 114;
flash.ui.Keyboard.DOM_VK_F4 = 115;
flash.ui.Keyboard.DOM_VK_F5 = 116;
flash.ui.Keyboard.DOM_VK_F6 = 117;
flash.ui.Keyboard.DOM_VK_F7 = 118;
flash.ui.Keyboard.DOM_VK_F8 = 119;
flash.ui.Keyboard.DOM_VK_F9 = 120;
flash.ui.Keyboard.DOM_VK_F10 = 121;
flash.ui.Keyboard.DOM_VK_F11 = 122;
flash.ui.Keyboard.DOM_VK_F12 = 123;
flash.ui.Keyboard.DOM_VK_F13 = 124;
flash.ui.Keyboard.DOM_VK_F14 = 125;
flash.ui.Keyboard.DOM_VK_F15 = 126;
flash.ui.Keyboard.DOM_VK_F16 = 127;
flash.ui.Keyboard.DOM_VK_F17 = 128;
flash.ui.Keyboard.DOM_VK_F18 = 129;
flash.ui.Keyboard.DOM_VK_F19 = 130;
flash.ui.Keyboard.DOM_VK_F20 = 131;
flash.ui.Keyboard.DOM_VK_F21 = 132;
flash.ui.Keyboard.DOM_VK_F22 = 133;
flash.ui.Keyboard.DOM_VK_F23 = 134;
flash.ui.Keyboard.DOM_VK_F24 = 135;
flash.ui.Keyboard.DOM_VK_NUM_LOCK = 144;
flash.ui.Keyboard.DOM_VK_SCROLL_LOCK = 145;
flash.ui.Keyboard.DOM_VK_COMMA = 188;
flash.ui.Keyboard.DOM_VK_PERIOD = 190;
flash.ui.Keyboard.DOM_VK_SLASH = 191;
flash.ui.Keyboard.DOM_VK_BACK_QUOTE = 192;
flash.ui.Keyboard.DOM_VK_OPEN_BRACKET = 219;
flash.ui.Keyboard.DOM_VK_BACK_SLASH = 220;
flash.ui.Keyboard.DOM_VK_CLOSE_BRACKET = 221;
flash.ui.Keyboard.DOM_VK_QUOTE = 222;
flash.ui.Keyboard.DOM_VK_META = 224;
flash.ui.Keyboard.DOM_VK_KANA = 21;
flash.ui.Keyboard.DOM_VK_HANGUL = 21;
flash.ui.Keyboard.DOM_VK_JUNJA = 23;
flash.ui.Keyboard.DOM_VK_FINAL = 24;
flash.ui.Keyboard.DOM_VK_HANJA = 25;
flash.ui.Keyboard.DOM_VK_KANJI = 25;
flash.ui.Keyboard.DOM_VK_CONVERT = 28;
flash.ui.Keyboard.DOM_VK_NONCONVERT = 29;
flash.ui.Keyboard.DOM_VK_ACEPT = 30;
flash.ui.Keyboard.DOM_VK_MODECHANGE = 31;
flash.ui.Keyboard.DOM_VK_SELECT = 41;
flash.ui.Keyboard.DOM_VK_PRINT = 42;
flash.ui.Keyboard.DOM_VK_EXECUTE = 43;
flash.ui.Keyboard.DOM_VK_SLEEP = 95;
flash.utils.Endian.BIG_ENDIAN = "bigEndian";
flash.utils.Endian.LITTLE_ENDIAN = "littleEndian";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.ds.ObjectMap.count = 0;
haxe.xml.Parser.escapes = (function($this) {
	var $r;
	var h = new haxe.ds.StringMap();
	h.set("lt","<");
	h.set("gt",">");
	h.set("amp","&");
	h.set("quot","\"");
	h.set("apos","'");
	h.set("nbsp",String.fromCharCode(160));
	$r = h;
	return $r;
}(this));
openfl.Assets.cache = new openfl.AssetCache();
openfl.Assets.libraries = new haxe.ds.StringMap();
openfl.Assets.initialized = false;
openfl.display.Tilesheet.TILE_SCALE = 1;
openfl.display.Tilesheet.TILE_ROTATION = 2;
openfl.display.Tilesheet.TILE_RGB = 4;
openfl.display.Tilesheet.TILE_ALPHA = 8;
openfl.display.Tilesheet.TILE_TRANS_2x2 = 16;
openfl.display.Tilesheet.TILE_BLEND_NORMAL = 0;
openfl.display.Tilesheet.TILE_BLEND_ADD = 65536;
openfl.display.Tilesheet.TILE_BLEND_MULTIPLY = 131072;
openfl.display.Tilesheet.TILE_BLEND_SCREEN = 262144;
ApplicationMain.main();
})();
