HR.appController.addTemplate("backbone/templates/recruit/question-coding",function(obj){{var __p="";Array.prototype.join}with(obj||{})__p+="","database"==question.type&&(__p+="\n<!-- add styles here for hiding codeshell stuff -->\n<style>#show-preferences{display:none;}</style>\n"),__p+='\n<div id="editor" class="codeshell ',fullscreen||(__p+="mlT mlB"),__p+='">Loading code editor... <em style="color: #aaa;font-size: smaller;">(Refresh page if editor does not appear in a moment.)</em>.</div>\n',question.has_samples&&(__p+='\n<div id="dllink" class="mdB"><a id="testcase-dl" aria-label="Download Test Cases" href="javascript:void(0);"><i class="icon--single icon-download"> Download sample testcases</i></a><small class="mlL"><em class="txt-alt-grey-dark">The input/output files have Unix line endings. Do not use Notepad to edit them on windows.</em></small></div>\n'),__p+='\n<div id="runstatus"></div>\n<div class="modal modal-huge" id="faq-modal">\n  <div class="modal-body"></div>\n</div>\n';return __p});