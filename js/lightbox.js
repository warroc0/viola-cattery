(function(){
  var links=[].slice.call(document.querySelectorAll('.lb-open'));
  if(!links.length)return;
  var nl=document.documentElement.lang==='nl';
  var T=nl?{close:'Sluiten',prev:'Vorige foto',next:'Volgende foto',dlg:'Foto vergroot'}:{close:'Close',prev:'Previous photo',next:'Next photo',dlg:'Enlarged photo'};
  var box=document.createElement('div');
  box.className='lightbox';box.hidden=true;
  box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-label',T.dlg);
  box.innerHTML='<button type="button" class="lb-close" aria-label="'+T.close+'">&times;</button>'+
    '<button type="button" class="lb-prev" aria-label="'+T.prev+'">&#8249;</button>'+
    '<figure class="lb-fig"><img alt=""><figcaption class="lb-count" aria-live="polite"></figcaption></figure>'+
    '<button type="button" class="lb-next" aria-label="'+T.next+'">&#8250;</button>';
  document.body.appendChild(box);
  var img=box.querySelector('img'),cnt=box.querySelector('.lb-count'),btnClose=box.querySelector('.lb-close'),
      btnPrev=box.querySelector('.lb-prev'),btnNext=box.querySelector('.lb-next'),idx=0,opener=null;
  function show(i){idx=(i+links.length)%links.length;var a=links[idx],t=a.querySelector('img');
    img.src=a.getAttribute('href');img.alt=t.alt;cnt.textContent=(idx+1)+' / '+links.length;}
  function open(i){opener=document.activeElement;show(i);box.hidden=false;document.body.classList.add('lb-lock');btnClose.focus();}
  function close(){box.hidden=true;document.body.classList.remove('lb-lock');if(opener)opener.focus();}
  links.forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();open(i);});});
  btnClose.addEventListener('click',close);
  btnPrev.addEventListener('click',function(){show(idx-1);});
  btnNext.addEventListener('click',function(){show(idx+1);});
  box.addEventListener('click',function(e){if(e.target===box||e.target.classList.contains('lb-fig'))close();});
  document.addEventListener('keydown',function(e){if(box.hidden)return;
    if(e.key==='Escape'){e.preventDefault();close();}
    else if(e.key==='ArrowLeft'){show(idx-1);}
    else if(e.key==='ArrowRight'){show(idx+1);}
    else if(e.key==='Tab'){var f=[btnClose,btnPrev,btnNext],k=f.indexOf(document.activeElement);
      e.preventDefault();f[(k+(e.shiftKey?-1:1)+f.length)%f.length].focus();}});
})();
