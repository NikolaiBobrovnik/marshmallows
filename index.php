<?
require_once $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';
$detect = new Mobile_Detect;

$mobile = $detect->isMobile() && !$detect->isTablet();

if(isset($_COOKIE['MobileFail']) && $_COOKIE['MobileFail'] == 1){
	$mobile = false;
	setcookie("MobileFail", -1, 0, '/');
}
$distPath = '/dist-production/';
$viewType = $mobile ? 'mobile' : 'desktop';
$data = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'].$distPath.'manifest.json'), true);
?>
<!DOCTYPE html>
<html>
<head>
	<? if (!isset($_GET['_escaped_fragment_'])): ?>
      <meta name="fragment" content="!">
	<? endif; ?>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Калашников</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Merriweather|Rubik">
  <link rel="stylesheet" type="text/css" href="/fonts/stylesheet.css?t=<?= filemtime('fonts/stylesheet.css') ?>">
  <link rel="stylesheet" type="text/css" href="<?=$distPath.$data['vendor-'.$viewType.'.css']?>">
  <link rel="stylesheet" type="text/css" href="<?=$distPath.$data[$viewType.'.css']?>">
</head>
<body id="body">
<div id="root"></div>

<noscript><div><img src="https://mc.yandex.ru/watch/47894105" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<script>
	<? echo file_get_contents($_SERVER['DOCUMENT_ROOT'].$distPath.$data['manifest.js'])?>
</script>
<script src="<?=$distPath.$data['vendor-'.$viewType.'.js']?>"></script>
<script src="<?=$distPath.$data[$viewType.'.js']?>"></script>
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114991779-1"></script>
<script>
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());

	gtag('config', 'UA-114991779-1');
</script>
<!-- /Google Analytics -->
<!-- Yandex.Metrika -->
<script type="text/javascript" > (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter47894105 = new Ya.Metrika({ id:47894105, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script>
<!-- /Yandex.Metrika -->

</body>
</html>