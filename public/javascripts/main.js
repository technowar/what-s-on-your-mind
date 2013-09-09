(function(w) {

  w.onload = function() {
    if(document.readyState === "complete") {
      init();
    }
  };

  function init() {
    var diaryInput = document.getElementById('diary');
    var diaryList = document.getElementById('lists');

    form.onsubmit = function(e) {
      e.preventDefault();

      var diaryText = diaryInput.value.trim();
      var x = new XMLHttpRequest();

      x.open('post', '/home');
      x.setRequestHeader('content-type','application/json');
      
      x.onload = function(d) {
        console.log(d.target.responseText);
        var diaryEntry = JSON.parse(d.target.responseText);
        diaryList.innerHTML+='<li>'+diaryEntry.content+'</li><br /><button>Delete</button>';
      };

      x.send('{"content":"'+diaryText+'"}');

      diaryInput.value = '';
      diaryInput.focus();
    };
  }

})(window);
