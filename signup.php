

<?php

if (isset($_POST['email'])) {
  $emailaddress = $_POST['email'];
  $hash = md5("xseed" . $emailaddress);
  echo "200";
} else {
  echo "500";
}

?>