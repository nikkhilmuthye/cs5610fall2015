HR.appController.addTemplate("backbone/templates/recruit/question-coding-codeshellx",function(obj){{var __p="";Array.prototype.join}with(obj||{})__p+="<div id=\"csx-editor\" style='width:100%;min-height:300px;'>Loading codeshellx.... If editor does not appear in a few moments, please refresh the page or contact support at support@hackerrank.com </div>\n","database"==question.type&&(__p+="\n<!-- add styles here for hiding codeshell stuff -->\n<style>#show-preferences{display:none;}</style>\n"),__p+='\n<!--div id="editor" class="codeshell ',fullscreen||(__p+="mlT mlB"),__p+='">Loading code editor... <em style="color: #aaa;font-size: smaller;">(Refresh page if editor does not appear in a moment.)</em>.</div-->\n',question.has_samples&&(__p+='\n<div id="dllink" class="mdB mdT"><a id="testcase-dl" aria-label="Download Test Cases" href="javascript:void(0);"><i class="icon--single icon-download"> Download sample testcases</i></a><small class="mlL"><em class="txt-alt-grey-dark">The input/output files have Unix line endings. Do not use Notepad to edit them on windows.</em></small></div>\n'),__p+='\n<div id="runstatus"></div>\n<button class="btn btn-primary mdT mdB mdR ans-submit pull-right" style="width:225px;">Submit and Continue</button>\n<div class="modal modal-huge" id="faq-modal">\n  <div class="modal-body"></div>\n</div>\n';return __p});