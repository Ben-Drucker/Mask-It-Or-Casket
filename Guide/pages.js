function openPage(page){
    if (page != 'intro') {
      document.getElementById('intro').style.display='none';
    }
    if (page != 'gameComponents') {
      document.getElementById('gameComponents').style.display='none';
    }
    if (page != 'policyBtn'){
      document.getElementById('policyBtn').style.display='none';
    }
    if (page != 'riskBar'){
      document.getElementById('riskBar').style.display='none';
    }
    if (page != 'people1'){
      document.getElementById('people1').style.display='none';
    }
    if (page != 'people2'){
      document.getElementById('people2').style.display='none';
    }
    document.getElementById(page).style.display='block';
  }