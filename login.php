<?php

if (isset($_POST['email'])) {
  $emailaddress = $_POST['email'];
  $hash = md5("xseed" . $emailaddress);
 if ($emailaddress == "christopherdebeer@gmail.com") { echo '{"status":"200","notifications":["A torrent", "Another torrent"]}';}
 else { echo '{"status":"404","message":"User with that email address does not exist."}';}
} else {
  echo '{"status":"200","message":"An unknown error has occured, we\'re very sorry."}';
}

?>