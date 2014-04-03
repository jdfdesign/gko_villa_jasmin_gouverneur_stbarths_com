/*
 * jQuery UI Nested Sortable
 * v 1.3.5 / 21 jun 2012
 * http://mjsarfatti.com/code/nestedSortable
 *
 * Depends on:
 *	 jquery.ui.sortable.js 1.8+
 *
 * Copyright (c) 2010-2012 Manuele J Sarfatti
 * Licensed under the MIT License
 * http://www.opensource.org/licenses/mit-license.php
 */
!function(e){e.widget("mjs.nestedSortable",e.extend({},e.ui.sortable.prototype,{options:{tabSize:20,disableNesting:"mjs-nestedSortable-no-nesting",errorClass:"mjs-nestedSortable-error",listType:"ol",maxLevels:0,protectRoot:!1,rootID:null,rtl:!1,isAllowed:function(){return!0}},_create:function(){if(this.element.data("sortable",this.element.data("nestedSortable")),!this.element.is(this.options.listType))throw new Error("nestedSortable: Please check the listType option is set to your actual list type");return e.ui.sortable.prototype._create.apply(this,arguments)},destroy:function(){return this.element.removeData("nestedSortable").unbind(".nestedSortable"),e.ui.sortable.prototype.destroy.apply(this,arguments)},_mouseDrag:function(t){if(this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),this.options.scroll){var r=this.options,i=!1;this.scrollParent[0]!=document&&"HTML"!=this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<r.scrollSensitivity?this.scrollParent[0].scrollTop=i=this.scrollParent[0].scrollTop+r.scrollSpeed:t.pageY-this.overflowOffset.top<r.scrollSensitivity&&(this.scrollParent[0].scrollTop=i=this.scrollParent[0].scrollTop-r.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<r.scrollSensitivity?this.scrollParent[0].scrollLeft=i=this.scrollParent[0].scrollLeft+r.scrollSpeed:t.pageX-this.overflowOffset.left<r.scrollSensitivity&&(this.scrollParent[0].scrollLeft=i=this.scrollParent[0].scrollLeft-r.scrollSpeed)):(t.pageY-e(document).scrollTop()<r.scrollSensitivity?i=e(document).scrollTop(e(document).scrollTop()-r.scrollSpeed):e(window).height()-(t.pageY-e(document).scrollTop())<r.scrollSensitivity&&(i=e(document).scrollTop(e(document).scrollTop()+r.scrollSpeed)),t.pageX-e(document).scrollLeft()<r.scrollSensitivity?i=e(document).scrollLeft(e(document).scrollLeft()-r.scrollSpeed):e(window).width()-(t.pageX-e(document).scrollLeft())<r.scrollSensitivity&&(i=e(document).scrollLeft(e(document).scrollLeft()+r.scrollSpeed))),i!==!1&&e.ui.ddmanager&&!r.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)}this.positionAbs=this._convertPositionTo("absolute");var n=this.placeholder.offset().top;this.options.axis&&"y"==this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"==this.options.axis||(this.helper[0].style.top=this.position.top+"px");for(var o=this.items.length-1;o>=0;o--){var l=this.items[o],a=l.item[0],s=this._intersectsWithPointer(l);if(s&&a!=this.currentItem[0]&&this.placeholder[1==s?"next":"prev"]()[0]!=a&&!e.contains(this.placeholder[0],a)&&("semi-dynamic"==this.options.type?!e.contains(this.element[0],a):!0)){if(e(a).mouseenter(),this.direction=1==s?"down":"up","pointer"!=this.options.tolerance&&!this._intersectsWithSides(l))break;e(a).mouseleave(),this._rearrange(t,l),this._clearEmpty(a),this._trigger("change",t,this._uiHash());break}}var c=this.placeholder[0].parentNode.parentNode&&e(this.placeholder[0].parentNode.parentNode).closest(".ui-sortable").length?e(this.placeholder[0].parentNode.parentNode):null,u=this._getLevel(this.placeholder),d=this._getChildLevels(this.helper),h=this.placeholder[0].previousSibling?e(this.placeholder[0].previousSibling):null;if(null!=h)for(;"li"!=h[0].nodeName.toLowerCase()||h[0]==this.currentItem[0]||h[0]==this.helper[0];){if(!h[0].previousSibling){h=null;break}h=e(h[0].previousSibling)}var f=this.placeholder[0].nextSibling?e(this.placeholder[0].nextSibling):null;if(null!=f)for(;"li"!=f[0].nodeName.toLowerCase()||f[0]==this.currentItem[0]||f[0]==this.helper[0];){if(!f[0].nextSibling){f=null;break}f=e(f[0].nextSibling)}var p=document.createElement(r.listType);return this.beyondMaxLevels=0,null!=c&&null==f&&(r.rtl&&this.positionAbs.left+this.helper.outerWidth()>c.offset().left+c.outerWidth()||!r.rtl&&this.positionAbs.left<c.offset().left)?(c.after(this.placeholder[0]),this._clearEmpty(c[0]),this._trigger("change",t,this._uiHash())):null!=h&&(r.rtl&&this.positionAbs.left+this.helper.outerWidth()<h.offset().left+h.outerWidth()-r.tabSize||!r.rtl&&this.positionAbs.left>h.offset().left+r.tabSize)?(this._isAllowed(h,u,u+d+1),h.children(r.listType).length||h[0].appendChild(p),n&&n<=h.offset().top?h.children(r.listType).prepend(this.placeholder):h.children(r.listType)[0].appendChild(this.placeholder[0]),this._trigger("change",t,this._uiHash())):this._isAllowed(c,u,u+d),this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t){this.beyondMaxLevels&&(this.placeholder.removeClass(this.options.errorClass),this.domPosition.prev?e(this.domPosition.prev).after(this.placeholder):e(this.domPosition.parent).prepend(this.placeholder),this._trigger("revert",t,this._uiHash()));for(var r=this.items.length-1;r>=0;r--){var i=this.items[r].item[0];this._clearEmpty(i)}e.ui.sortable.prototype._mouseStop.apply(this,arguments)},serialize:function(t){var r=e.extend({},this.options,t),i=this._getItemsAsjQuery(r&&r.connected),n=[];return e(i).each(function(){var t=(e(r.item||this).attr(r.attribute||"id")||"").match(r.expression||/(.+)[-=_](.+)/),i=(e(r.item||this).parent(r.listType).parent(r.items).attr(r.attribute||"id")||"").match(r.expression||/(.+)[-=_](.+)/);t&&n.push((r.key||t[1])+"["+(r.key&&r.expression?t[1]:t[2])+"]="+(i?r.key&&r.expression?i[1]:i[2]:r.rootID))}),!n.length&&r.key&&n.push(r.key+"="),n.join("&")},toHierarchy:function(t){function r(t){var n=(e(t).attr(i.attribute||"id")||"").match(i.expression||/(.+)[-=_](.+)/);if(n){var o={id:n[2]};return e(t).children(i.listType).children(i.items).length>0&&(o.children=[],e(t).children(i.listType).children(i.items).each(function(){var e=r(this);o.children.push(e)})),o}}var i=e.extend({},this.options,t),n=(i.startDepthCount||0,[]);return e(this.element).children(i.items).each(function(){var e=r(this);n.push(e)}),n},toArray:function(t){function r(t,l,a){var s,c,u=a+1;if(e(t).children(i.listType).children(i.items).length>0&&(l++,e(t).children(i.listType).children(i.items).each(function(){u=r(e(this),l,u)}),l--),s=e(t).attr(i.attribute||"id").match(i.expression||/(.+)[-=_](.+)/),l===n+1)c=i.rootID;else{var d=e(t).parent(i.listType).parent(i.items).attr(i.attribute||"id").match(i.expression||/(.+)[-=_](.+)/);c=d[2]}return s&&o.push({item_id:s[2],parent_id:c,depth:l,left:a,right:u}),a=u+1}var i=e.extend({},this.options,t),n=i.startDepthCount||0,o=[],l=2;return o.push({item_id:i.rootID,parent_id:"none",depth:n,left:"1",right:2*(e(i.items,this.element).length+1)}),e(this.element).children(i.items).each(function(){l=r(this,n+1,l)}),o=o.sort(function(e,t){return e.left-t.left})},_clearEmpty:function(t){var r=e(t).children(this.options.listType);r.length&&!r.children().length&&r.remove()},_getLevel:function(e){var t=1;if(this.options.listType)for(var r=e.closest(this.options.listType);r&&r.length>0&&!r.is(".ui-sortable");)t++,r=r.parent().closest(this.options.listType);return t},_getChildLevels:function(t,r){var i=this,n=this.options,o=0;return r=r||0,e(t).children(n.listType).children(n.items).each(function(e,t){o=Math.max(i._getChildLevels(t,r+1),o)}),r?o+1:o},_isAllowed:function(t,r,i){var n=this.options,o=e(this.domPosition.parent).hasClass("ui-sortable")?!0:!1,l=this.placeholder.closest(".ui-sortable").nestedSortable("option","maxLevels");!n.isAllowed(t,this.placeholder)||t&&t.hasClass(n.disableNesting)||n.protectRoot&&(null==t&&!o||o&&r>1)?(this.placeholder.addClass(n.errorClass),this.beyondMaxLevels=i>l&&0!=l?i-l:1):i>l&&0!=l?(this.placeholder.addClass(n.errorClass),this.beyondMaxLevels=i-l):(this.placeholder.removeClass(n.errorClass),this.beyondMaxLevels=0)}})),e.mjs.nestedSortable.prototype.options=e.extend({},e.ui.sortable.prototype.options,e.mjs.nestedSortable.prototype.options)}(jQuery);var list_reorder={initialised:!1,init:function(e,t,r){this.element=e,this.url=t,e.nestedSortable({disableNesting:"no-nest",forcePlaceholderSize:!0,handle:"i.icon-move",helper:"clone",items:"li",listType:"ul",maxLevels:r||3,opacity:.6,placeholder:"placeholder",revert:250,tabSize:25,tolerance:"pointer",toleranceElement:"> div",protectRoot:this.element.hasClass("root-protected"),isAllowed:function(){return!0},update:function(e,t){item_id=get_number_from_string(t.item.attr("id"));try{parent_id=t.item.parent().parent().attr("id"),parent_id=void 0==parent_id?0:get_number_from_string(parent_id)}catch(r){parent_id=0}try{prev_id=get_number_from_string(t.item.prev().attr("id"))}catch(r){prev_id=0}try{next_id=get_number_from_string(t.item.next().attr("id"))}catch(r){next_id=0}jQuery.ajax({type:"POST",url:list_reorder.url,data:{node_id:item_id,parent_id:parent_id,prev_id:prev_id,next_id:next_id,authenticity_token:AUTH_TOKEN},dataType:"script",beforeSend:function(){attachLoading("body")},error:function(){},complete:function(){removeLoading("body")}})}}),this.initialised=!0}};