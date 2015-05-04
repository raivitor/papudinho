"use strict";angular.module("lr.upload",["lr.upload.formdata","lr.upload.iframe","lr.upload.directives"]),angular.module("lr.upload.directives",[]),angular.module("lr.upload.directives").directive("uploadButton",["upload",function(a){return{restrict:"EA",scope:{data:"=?data",url:"@",param:"@",method:"@",onUpload:"&",onSuccess:"&",onError:"&",onComplete:"&"},link:function(b,c,d){var e=angular.element(c),f=angular.element('<input type="file" />');if(e.append(f),f.on("change",function(){if(!f[0].files||0!==f[0].files.length){var c={url:b.url,method:b.method||"POST",forceIFrameUpload:b.$eval(d.forceIframeUpload)||!1,data:b.data||{}};c.data[b.param||"file"]=f,b.$apply(function(){b.onUpload({files:f[0].files})}),a(c).then(function(a){b.onSuccess({response:a}),b.onComplete({response:a})},function(a){b.onError({response:a}),b.onComplete({response:a})})}}),"required"in d&&d.$observe("required",function(a){var d=""===a?!0:b.$eval(a);f.attr("required",d),c.toggleClass("ng-valid",!d),c.toggleClass("ng-invalid ng-invalid-required",d)}),"accept"in d&&d.$observe("accept",function(a){f.attr("accept",a)}),a.support.formData){var g=function(){f.attr("multiple",!(!b.$eval(d.multiple)||b.$eval(d.forceIframeUpload)))};d.$observe("multiple",g),d.$observe("forceIframeUpload",g)}}}}]),angular.module("lr.upload.formdata",[]).factory("formDataTransform",function(){return function(a){var b=new FormData;return angular.forEach(a,function(a,c){if(angular.isElement(a)){var d=[];angular.forEach(a,function(a){angular.forEach(a.files,function(a){d.push(a)})}),0!==d.length&&(d.length>1?angular.forEach(d,function(a,d){b.append(c+"["+d+"]",a)}):b.append(c,d[0]))}else b.append(c,a)}),b}}).factory("formDataUpload",["$http","formDataTransform",function(a,b){return function(c){return c.transformRequest=b,c.headers=angular.extend(c.headers||{},{"Content-Type":void 0}),a(c)}}]),angular.module("lr.upload.iframe",[]).factory("iFrameUpload",["$q","$http","$document","$rootScope",function(a,b,c,d){function e(a,b){if(a.indexOf)return a.indexOf(b);for(var c=0;c<a.length;c++)if(b===a[c])return c;return-1}function f(f){var g=[],h=a.defer(),i=h.promise;angular.forEach(f.data||{},function(a,b){angular.isElement(a)&&(delete f.data[b],a.attr("name",b),g.push(a))});var j=/\?/.test(f.url)?"&":"?";"DELETE"===f.method?(f.url=f.url+j+"_method=DELETE",f.method="POST"):"PUT"===f.method?(f.url=f.url+j+"_method=PUT",f.method="POST"):"PATCH"===f.method&&(f.url=f.url+j+"_method=PATCH",f.method="POST");var k=angular.element(c[0].body),l=d.$new(),m="iframe-transport-"+l.$id;l.$destroy();var n=angular.element("<form></form>");n.attr("target",m),n.attr("action",f.url),n.attr("method",f.method||"POST"),n.css("display","none"),g.length&&(n.attr("enctype","multipart/form-data"),n.attr("encoding","multipart/form-data"));var o=angular.element('<iframe name="'+m+'" src="javascript:false;"></iframe>');return o.on("load",function(){function a(a,b){var c=[];return angular.isFunction(b)?b(a,c):(angular.forEach(b,function(b){a=b(a,c)}),a)}function c(){var a=e(b.pendingRequests,f);-1!==a&&(b.pendingRequests.splice(a,1),f.$iframeTransportForm.remove(),delete f.$iframeTransportForm)}o.off("load").on("load",function(){var c;try{var d=this.contentWindow?this.contentWindow.document:this.contentDocument;if(c=angular.element(d.body).text(),!c.length)throw new Error}catch(e){}n.append(angular.element('<iframe src="javascript:false;"></iframe>'));try{c=a(c,b.defaults.transformResponse)}catch(e){}h.resolve({data:c,status:200,headers:[],config:f})}),angular.forEach(g,function(a){var b=a.clone(!0);a.after(b),n.append(a)}),angular.forEach(f.data,function(a,b){var c=angular.element('<input type="hidden" />');c.attr("name",b),c.val(a),n.append(c)}),f.$iframeTransportForm=n,b.pendingRequests.push(f),n[0].submit(),i.then(c,c)}),n.append(o),k.append(n),i}return f}]),angular.module("lr.upload").factory("upload",["$window","formDataUpload","iFrameUpload",function(a,b,c){function d(a){return e.formData&&!a.forceIFrameUpload?b(a):c(a)}var e={fileInput:!(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(a.navigator.userAgent)||angular.element('<input type="file">').prop("disabled")),fileUpload:!(!a.XMLHttpRequestUpload||!a.FileReader),formData:!!a.FormData};return d.support=e,d}]);