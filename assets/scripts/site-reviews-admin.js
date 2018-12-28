!function(n){"use strict";GLSR.Ajax=function(t,i,s){this.event=i||null,this.form=s||null,this.notice=null,this.request=t||{}},GLSR.Ajax.prototype={t:function(t){var i={action:GLSR.action,_ajax_request:!0};if(this.form){var s=new GLSR.Serializer(this.form);s[GLSR.nameprefix]&&(this.request=s[GLSR.nameprefix])}return this.i(t),i[GLSR.nameprefix]=this.request,i},i:function(t){this.request._nonce||(GLSR.nonce[this.request._action]?this.request._nonce=GLSR.nonce[this.request._action]:t&&(this.request._nonce=t.closest("form").find("#_wpnonce").val()))},s:function(i,s){n.post(GLSR.ajaxurl,this.t(s)).done(function(t){"function"==typeof i&&i(t.data,t.success),s&&s.prop("disabled",!1)}).always(function(t){t.data?t.data.notices&&GLSR.Notices(t.data.notices):GLSR.Notices('<div class="notice notice-error inline is-dismissible"><p>Unknown error.</p></div>')})},n:function(t){this.event?this.e(t):this.s(t)},e:function(t){this.event.preventDefault();var i=n(this.event.currentTarget);i.is(":disabled")||(i.prop("disabled",!0),this.s(t,i))}}}(jQuery),function(t){"use strict";GLSR.ColorPicker=function(){"object"==typeof t.wp&&"function"==typeof t.wp.wpColorPicker&&t(document).find("input[type=text].color-picker-hex").each(function(){t(this).wpColorPicker(t(this).data("colorpicker")||{})})}}(jQuery),function(){"use strict";GLSR.Forms=function(t){this.el=document.querySelector(t),this.el&&(this.depends=this.el.querySelectorAll("[data-depends]"),this.depends.length&&this.o())},GLSR.Forms.prototype={o:function(){for(var t=this.el.elements,i=0;i<t.length;i++)-1!==["INPUT","SELECT"].indexOf(t[i].nodeName)&&t[i].addEventListener("change",this.h.bind(this))},c:function(t,i){if(Array.isArray(i.value)){if("checkbox"===t.type){var s=!1;return[].map.call(t.closest("form").querySelectorAll('input[name="'+t.name+'"]:checked'),function(t){~i.value.indexOf(t.value)&&(s=!0)}),s}return-1!==this.r(i.value).indexOf(this.u(t.value))}return"checkbox"===t.type?!!t.checked:this.u(i.value)===this.u(t.value)},u:function(t){return-1!==["true","on","yes","1"].indexOf(t)||-1===["false","off","no","0"].indexOf(t)&&t},r:function(t){return t.map(this.u)},h:function(n){this.depends.forEach(function(t){var i,s=t.getAttribute("data-depends");if(s){try{i=JSON.parse(s)}catch(t){return console.log(s),console.error(t)}i.name===n.currentTarget.name&&this.a(t,this.c(n.currentTarget,i))}}.bind(this))},a:function(t,i){var s=t.closest(".glsr-field");s&&s.classList[i?"remove":"add"]("hidden")}}}(),function(i){"use strict";GLSR.Notices=function(t){t&&(i("#glsr-notices").length||(i("#message.notice").remove(),i("form#post").before('<div id="glsr-notices" />')),i("#glsr-notices").html(t),i(document).trigger("wp-updates-notice-added"))}}(jQuery),function(s){"use strict";GLSR.Pinned=function(){this.el=s("#pinned-status-select"),this.el&&(this.cancel=s("a.cancel-pinned-status"),this.cancel.on("click",this.l.bind(this)),this.edit=s("a.edit-pinned-status"),this.edit.on("click",this.d.bind(this)),this.save=s("a.save-pinned-status"),this.save.on("click",this.f.bind(this))),s("table td.pinned i").on("click",this.p.bind(this))},GLSR.Pinned.prototype={v:function(){this.el.slideUp("fast"),this.edit.show().focus()},l:function(t){t.preventDefault(),this.v(),this.el.find("select").val("0"===s("#hidden-pinned-status").val()?1:0)},d:function(t){t.preventDefault(),this.el.is(":hidden")&&(this.el.slideDown("fast",function(){this.el.find("select").focus()}.bind(this)),this.edit.hide())},f:function(t){t.preventDefault(),this.v(),this.target=t.currentTarget;var i={_action:"toggle-pinned",id:s("#post_ID").val(),pinned:s("#pinned-status").val()};new GLSR.Ajax(i).n(this.g.bind(this))},p:function(t){t.preventDefault(),this.target=t.currentTarget;var i={_action:"toggle-pinned",id:t.currentTarget.getAttribute("data-id")};new GLSR.Ajax(i).n(this.S.bind(this))},g:function(t){s("#pinned-status").val(0|!t.pinned),s("#hidden-pinned-status").val(0|t.pinned),s("#pinned-status-text").text(t.pinned?this.target.dataset.yes:this.target.dataset.no),GLSR.Notices(t.notices)},S:function(t){this.target.classList[t.pinned?"add":"remove"]("pinned")}}}(jQuery),function(i){"use strict";GLSR.Pointers=function(){i.each(GLSR.pointers,function(t,i){this.o(i)}.bind(this))},GLSR.Pointers.prototype={m:function(t){i.post(GLSR.ajaxurl,{action:"dismiss-wp-pointer",pointer:t})},o:function(t){i(t.target).pointer({content:t.options.content,position:t.options.position,close:this.m.bind(null,t.id)}).pointer("open").pointer("sendToTop"),i(document).on("wp-window-resized",function(){i(t.target).pointer("reposition")})}}}(jQuery),function(t,s,e){"use strict";GLSR.Search=function(t,i){this.el=e(t),this.options=i,this.searchTerm=null,this.o()},GLSR.Search.prototype={defaults:{action:null,exclude:[],onInit:null,onResultClick:null,results:{},selected:-1,selectedClass:"glsr-selected-result",selectorEntries:".glsr-strings-table tbody",selectorResults:".glsr-search-results",selectorSearch:".glsr-search-input"},o:function(){this.options=e.extend({},this.defaults,this.options),this.el.length&&(this.options.entriesEl=this.el.parent().find(this.options.selectorEntries),this.options.resultsEl=this.el.find(this.options.selectorResults),this.options.searchEl=this.el.find(this.options.selectorSearch),this.options.searchEl.attr("aria-describedby","live-search-desc"),"function"==typeof this.options.onInit&&this.options.onInit.call(this),this.R())},R:function(){this.options.searchEl.on("input",t.debounce(this.L.bind(this),500)),this.options.searchEl.on("keyup",this.G.bind(this)),this.options.searchEl.on("keydown keypress",function(t){GLSR.keys.ENTER===t.which&&t.preventDefault()}),e(document).on("click",this.w.bind(this)),e(document).on("keydown",this.y.bind(this))},b:function(){void 0!==this.searchRequest&&this.searchRequest.abort()},k:function(){this.b(),this.options.resultsEl.empty(),this.el.removeClass("is-active"),e("body").removeClass("glsr-focus")},x:function(t){var i=this.options.entriesEl.children("tr").eq(t),s=this;i.find("td").css({backgroundColor:"#faafaa"}),i.fadeOut(350,function(){e(this).remove(),s.options.results={},s.C(),s.T()})},j:function(t){e("body").addClass("glsr-focus"),this.options.resultsEl.append(t),this.options.resultsEl.children("span").on("click",this.z.bind(this))},Q:function(){this.options.entriesEl.on("click","a.delete",this.P.bind(this)),this.options.entriesEl.sortable({items:"tr",tolerance:"pointer",start:function(t,i){i.placeholder.height(i.helper[0].scrollHeight)},sort:function(t,i){var s=t.pageY-e(this).offsetParent().offset().top-i.helper.outerHeight(!0)/2;i.helper.css({top:s+"px"})}})},D:function(t){this.options.selected+=t,this.options.results.removeClass(this.options.selectedClass),this.options.selected<0&&(this.options.selected=-1,this.options.searchEl.focus()),this.options.selected>=this.options.results.length&&(this.options.selected=this.options.results.length-1),0<=this.options.selected&&this.options.results.eq(this.options.selected).addClass(this.options.selectedClass).focus()},w:function(t){e(t.target).find(this.el).length&&e("body").hasClass("glsr-focus")&&this.k()},y:function(t){if(!e.isEmptyObject(this.options.results)){if(GLSR.keys.ESC===t.which&&this.k(),GLSR.keys.ENTER===t.which||GLSR.keys.SPACE===t.which){var i=this.options.resultsEl.find("."+this.options.selectedClass);i&&i.trigger("click")}GLSR.keys.UP===t.which&&(t.preventDefault(),this.D(-1)),GLSR.keys.DOWN===t.which&&(t.preventDefault(),this.D(1))}},P:function(t){t.preventDefault(),this.x(e(t.currentTarget).closest("tr").index())},z:function(t){t.preventDefault(),"function"==typeof this.options.onResultClick&&this.options.onResultClick.call(this,t),this.k()},L:function(t){if(this.b(),this.searchTerm===t.currentTarget.value&&this.options.results.length)return this.j(this.options.results);if(this.options.resultsEl.empty(),this.options.selected=-1,this.searchTerm=t.currentTarget.value,""===this.searchTerm)return this.I();this.el.addClass("is-active");var i={};i[GLSR.nameprefix]={_action:this.options.action,_nonce:this.el.find("#_search_nonce").val(),exclude:this.options.exclude,search:this.searchTerm},this.searchRequest=s.ajax.post(GLSR.action,i).done(function(t){this.el.removeClass("is-active"),this.j(t.items?t.items:t.empty),this.options.results=this.options.resultsEl.children(),delete this.searchRequest}.bind(this))},G:function(t){GLSR.keys.ESC===t.which&&this.I(),GLSR.keys.ENTER===t.which&&(this.L(t),t.preventDefault())},A:function(t){t.preventDefault();var i=this.el.find(".description");this.el.find("input#assigned_to").val(""),i.find("a").css({color:"#c00"}),i.fadeOut("fast",function(){e(this).html("").show()})},C:function(){var n=this;this.options.exclude=[],this.options.entriesEl.children("tr").each(function(s){e(this).find(".glsr-string-td2").children().filter(":input").each(function(){var t=e(this),i=t.attr("name").replace(/\[\d+\]/i,"["+s+"]");t.attr("name",i),t.is("[data-id]")&&n.options.exclude.push({id:t.val()})})})},I:function(){this.k(),this.options.results={},this.options.searchEl.val("")},T:function(){var t=0<this.options.entriesEl.children().length?"remove":"add";this.options.entriesEl.parent()[t+"Class"]("glsr-hidden")}}}(window._,window.wp,jQuery),function(n){"use strict";GLSR.Serializer=function(t){return this.data={},this.form=n(t),this.pushes={},this.init()},GLSR.Serializer.prototype={patterns:{validate:/^[a-z_-][a-z0-9_-]*(?:\[(?:\d*|[a-z0-9_-]+)\])*$/i,key:/[a-z0-9_-]+|(?=\[\])/gi,named:/^[a-z0-9_-]+$/i,push:/^$/,fixed:/^\d+$/},addPair:function(t){this.patterns.validate.test(t.name)&&(this.data=n.extend(!0,this.data,this.makeObject(t.name,this.encode(t))))},build:function(t,i,s){return t[i]=s,t},encode:function(t){switch(n('[name="'+t.name+'"]',this.form).attr("type")){case"checkbox":return"on"===t.value||t.value;default:return t.value}},incrementPush:function(t){return void 0===this.pushes[t]&&(this.pushes[t]=0),this.pushes[t]++},init:function(){var t=this.form.serializeArray();if(n.isArray(t))for(var i=0,s=t.length;i<s;i++)this.addPair(t[i]);return this.data},makeObject:function(t,i){for(var s,n=t.match(this.patterns.key);void 0!==(s=n.pop());)if(this.patterns.push.test(s)){var e=this.incrementPush(t.replace(/\[\]$/,""));i=this.build([],e,i)}else this.patterns.fixed.test(s)?i=this.build([],s,i):this.patterns.named.test(s)&&(i=this.build({},s,i));return i}}}(jQuery),function(n){"use strict";GLSR.Shortcode=function(t){this.current=null,this.editor=null,this.create=function(t){if(this.editor=tinymce.get(t),this.editor){var i={_action:"mce-shortcode",shortcode:this.current};new GLSR.Ajax(i).n(this.N.bind(this))}},document.querySelectorAll(t).forEach(function(t){var i=t.querySelector("button"),s=t.querySelectorAll(".mce-menu-item");i&&s.length&&this.o(t,i,s)}.bind(this))},GLSR.Shortcode.prototype={V:{},$:[],o:function(i,s,t){document.addEventListener("click",this.U.bind(this,i,s)),s.addEventListener("click",this.F.bind(this,i,s)),t.forEach(function(t){t.addEventListener("click",this.H.bind(this,i,s))}.bind(this))},K:function(){tinymce.execCommand("GLSR_Shortcode")},O:function(){n("#scTemp").length?this.K():(n("body").append('<textarea id="scTemp" style="display:none!important;"/>'),tinymce.init({elements:"scTemp",external_plugins:GLSR.tinymce,mode:"exact",plugins:["glsr_shortcode","wplink"]}),setTimeout(function(){this.K()}.bind(this),200))},m:function(t,i){n(i).removeClass("active"),n(t).find(".glsr-mce-menu").hide()},W:function(){var t=n("#scTemp");t.length&&(tinymce.get("scTemp").remove(),t.remove()),this.V={},this.$=[]},N:function(t){if(t){if(0===t.body.length)return window.send_to_editor("["+t.shortcode+"]"),void this.W();var i=this.q(t);t.ok.constructor===Array&&(i.buttons[0].text=t.ok[0],i.buttons[0].onclick="close",delete i.buttons[1]),this.editor.windowManager.open(i)}},B:function(t){for(var i in this.V=t,this.$=[],t)t.hasOwnProperty(i)&&(this.J(i),this.M(i),this.X(i));this.V.hide=this.$.join(",")},J:function(t){"count"!==t||n.isNumeric(this.V[t])||(this.V[t]="")},M:function(t){if(GLSR.hiddenkeys.hasOwnProperty(this.current)){var i=t.substring("hide_".length);-1!==GLSR.hiddenkeys[this.current].indexOf(i)&&(this.V[t]&&this.$.push(i),delete this.V[t])}},X:function(t){"id"===t&&(this.V[t]=(+new Date).toString(36))},U:function(t,i,s){n(s.target).closest(n(t)).length||this.m(t,i)},F:function(t,i,s){s.preventDefault(),s.currentTarget.classList.contains("active")?this.m(t,i):this.Y(t,i)},H:function(t,i,s){s.preventDefault(),this.current=s.currentTarget.dataset.shortcode,this.current&&(tinymce.get(window.wpActiveEditor)?this.K():this.O(),setTimeout(function(){this.m(t,i)}.bind(this),100))},Y:function(t,i){n(i).addClass("active"),n(t).find(".glsr-mce-menu").show()},Z:function(t){return[{classes:"btn glsr-btn primary",onclick:this.tt.bind(this),text:t.ok},{onclick:"close",text:t.close}]},q:function(t){return{title:t.title,body:t.body,classes:"glsr-mce-popup",minWidth:320,buttons:this.Z(t),onsubmit:this.it.bind(this,t),onclose:this.W.bind(this)}},it:function(t,i){var s="";for(var n in this.B(i.data),this.V)this.V.hasOwnProperty(n)&&""!==this.V[n]&&(s+=" "+n+'="'+this.V[n]+'"');window.send_to_editor("["+t.shortcode+s+"]")},tt:function(){var t=this.editor.windowManager.getWindows()[0];this.st(t)&&t.submit()},st:function(t){var i,s=!0,n=GLSR.shortcodes[this.current];for(var e in n)if(void 0!==(i=t.find("#"+e)[0])&&""===i.state.data.value){s=!1,alert(n[e]);break}return s}}}(jQuery),function(e){"use strict";GLSR.Status=function(t){var i=document.querySelectorAll(t);i.length&&i.forEach(function(t){t.addEventListener("click",this.nt)}.bind(this))},GLSR.Status.prototype={nt:function(s){var t=s.currentTarget.href.match(/post=([0-9]+)/),i=s.currentTarget.href.match(/action=([a-z]+)/);if(null!==t&&null!==i){var n={_action:"change-status",_nonce:GLSR.nonce["change-status"],post_id:t[1],status:i[1]};new GLSR.Ajax(n,s).n(function(t){if(t.class){var i=e(s.target);i.closest("tr").removeClass("status-pending status-publish").addClass(t.class),i.closest("td.column-title").find("strong").html(t.link)}})}}}}(jQuery),function(i){"use strict";GLSR.Sync=function(){this.button=i("button#sync-reviews"),this.progressbar=i(".glsr-progress"),this.service=null,i("form").on("click","#sync-reviews",this.et.bind(this)),i(document).on("wp-window-resized",this.ot),i(window).on("hashchange",this.ot),this.ot()},GLSR.Sync.prototype={ht:function(t){i(".service-"+this.service+" td.column-last_sync").text(t.last_sync),i(".service-"+this.service+" td.column-total_fetched a").text(t.total),this.ct(!1)},et:function(t){t.preventDefault(),this.service=i('[name="'+GLSR.nameprefix+'[service]"]').val(),this.service&&(this.ct(!0),this.rt())},ot:function(){var t=i(".glsr-progress").width();t&&i(".glsr-progress span").width(t)},rt:function(){var t={_action:"sync-reviews",service:this.service,stage:"fetch"};new GLSR.Ajax(t).n(this.ut.bind(this))},ut:function(t){var i={_action:"sync-reviews",job_id:t.job_id,service:this.service,stage:"progress"},s=t.finished?this.at.bind(this,t):this.ut.bind(this);this.lt(t.message),this.dt(t.percent),setTimeout(function(){new GLSR.Ajax(i).n(s)},1500)},at:function(t){var i=0;try{i=t.meta.pagination.current_page}catch(t){}var s={_action:"sync-reviews",page:i+1,service:this.service,stage:"reviews"};this.lt(t.message),t.percent_synced&&100<=t.percent_synced?this.ht(t):new GLSR.Ajax(s).n(this.at.bind(this))},lt:function(t){i(".glsr-progress-status",this.progressbar).text(t)},dt:function(t){t=(t||0)+"%",i(".glsr-progress-bar",this.progressbar).outerWidth(t)},ct:function(t){if(!0===t&&(this.lt(this.progressbar.data("active-text")),this.dt(),this.button.prop("disabled",!0),window.requestAnimationFrame(function(){this.progressbar.addClass("active")}.bind(this))),!1===t)return this.service=null,this.button.prop("disabled",!1),void this.progressbar.removeClass("active");window.requestAnimationFrame(this.ct.bind(this))}}}(jQuery),function(n){"use strict";GLSR.Tabs=function(t){this.options=n.extend({},this.defaults,t),this.active=document.querySelector("input[name=_active_tab]"),this.referrer=document.querySelector("input[name=_wp_http_referer]"),this.tabs=document.querySelectorAll(this.options.tabSelector),this.views=document.querySelectorAll(this.options.viewSelector),this.active&&this.referrer&&this.tabs&&this.views&&this.o()},GLSR.Tabs.prototype={defaults:{tabSelector:".glsr-nav-tab",viewSelector:".glsr-nav-view"},o:function(){var s=this;n(window).on("hashchange",s.ft.bind(s)),[].forEach.call(s.tabs,function(t,i){(location.hash?t.getAttribute("href").slice(1)===location.hash.slice(2):0===i)&&s.pt(t),t.addEventListener("click",s.nt.bind(s)),t.addEventListener("touchend",s.nt.bind(s))}.bind(s)),n(s.options.viewSelector).on("click","a",function(){var t=n(n(this).data("expand")),i=t.parent();i.removeClass("collapsed"),s.vt(i),i.removeClass("collapsed"),t.removeClass("closed").find(".handlediv").attr("aria-expanded",!0)})},_t:function(t){return t?"add":"remove"},nt:function(t){t.preventDefault();var i=t.currentTarget;i.blur(),this.gt(i),this.pt(i),location.hash="!"+i.getAttribute("href").slice(1)},ft:function(){for(var t=location.hash.split("#!")[1],i=0;i<this.views.length;i++)if(t===this.views[i].id){this.pt(this.tabs[i]);break}},St:function(t){var i=this.referrer.value.split("#")[0]+"#!"+this.views[t].id;this.referrer.value=i},pt:function(n){[].forEach.call(this.tabs,function(t,i){var s=this._t(t===n);"add"===s&&(this.active.value=this.views[i].id,this.St(i),this.mt(i)),t.classList[s]("nav-tab-active")}.bind(this))},mt:function(n){[].forEach.call(this.views,function(t,i){var s=this._t(i!==n);t.classList[s]("ui-tabs-hide")}.bind(this))},vt:function(t){var i=t.hasClass("collapsed")?"remove":"add";t[i+"Class"]("collapsed").find(".glsr-card.postbox")[i+"Class"]("closed").find(".handlediv").attr("aria-expanded","add"!==i)},gt:function(t){if(t.classList.contains("nav-tab-active")){var i=n(t.getAttribute("href"));this.vt(i)}}}}(jQuery),function(i){"use strict";GLSR.TextareaResize=function(){var t=document.querySelector("#contentdiv > textarea");t&&(this.Rt(t),i(document).on("wp-window-resized.editor-expand",function(){this.Rt(t)}.bind(this)))},GLSR.TextareaResize.prototype={Rt:function(t){var i=320<t.scrollHeight?t.scrollHeight:320;t.style.height="auto",t.style.height=i+"px"}}}(jQuery),function(s){"use strict";GLSR.Tools=function(){s("form").on("click","#clear-console",this.Lt,this.nt.bind(this)),s("form").on("click","#fetch-console",this.Lt,this.nt.bind(this)),s("form").on("click","#count-reviews",this.nt.bind(this))},GLSR.Tools.prototype={Lt:function(t,i){i&&s("#log-file").val(t.console)},nt:function(s){new GLSR.Ajax({},s,s.currentTarget.closest("form")).n(function(t,i){"function"==typeof s.data&&s.data(t,i)})}}}(jQuery),GLSR.keys={DOWN:40,ENTER:13,ESC:27,SPACE:32,UP:38},jQuery(function(e){GLSR.shortcode=new GLSR.Shortcode(".glsr-mce"),GLSR.ColorPicker(),new GLSR.Forms("form.glsr-form"),new GLSR.Pinned,new GLSR.Pointers,new GLSR.Search("#glsr-search-posts",{action:"search-posts",onInit:function(){this.el.on("click",".glsr-remove-button",this.A.bind(this))},onResultClick:function(t){var i=e(t.currentTarget),s=wp.template("glsr-assigned-post"),n={url:i.data("url"),title:i.text()};s&&(this.el.find("input#assigned_to").val(i.data("id")),this.el.find(".description").html(s(n)),this.el.on("click",".glsr-remove-button",this.A.bind(this)),this.I())}}),new GLSR.Search("#glsr-search-translations",{action:"search-translations",onInit:function(){this.Q()},onResultClick:function(t){var s=e(t.currentTarget),i=s.data("entry"),n=wp.template("glsr-string-"+(i.p1?"plural":"single"));i.index=this.options.entriesEl.children().length,i.prefix=this.options.resultsEl.data("prefix"),n&&(this.options.entriesEl.append(n(i)),this.options.exclude.push({id:i.id}),this.options.results=this.options.results.filter(function(t,i){return i!==s.get(0)})),this.T()}}),new GLSR.Status("a.glsr-change-status"),new GLSR.Tabs,new GLSR.TextareaResize,new GLSR.Tools,new GLSR.Sync,e(".glsr-card.postbox").addClass("closed").find(".handlediv").attr("aria-expanded",!1).closest(".glsr-nav-view").addClass("collapsed"),e(".glsr-card.postbox .glsr-card-header").on("click",function(){var t=e(this).parent(),i=t.closest(".glsr-nav-view"),s=t.hasClass("closed")?"remove":"add";t[s+"Class"]("closed").find(".handlediv").attr("aria-expanded","add"!==s),s=0<i.find(".glsr-card.postbox").not(".closed").length?"remove":"add",i[s+"Class"]("collapsed")}),e(".glsr-support-step").not(":checked").length<1&&e(".glsr-card-result").removeClass("hidden"),e(".glsr-support-step").on("change",function(){var t=0<e(".glsr-support-step").not(":checked").length?"add":"remove";e(".glsr-card-result")[t+"Class"]("hidden")})});