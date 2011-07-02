<!DOCTYPE html>

<html>
<head>
    <title>xSeed : results</title>
    <link rel="stylesheet" href="style.css" />
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js"></script>
    <script type="text/javascript" src="xseed.js"></script>
</head>

<body>

  <?php
  
  $query = $_POST["query"];
  $seedLimit = $_POST["seeds"];
  
  ?>
  
  <script type="text/javascript">
    xSeed.seedLimit = <?php echo $seedLimit; ?>;
    xSeed.query = "<?php echo $query; ?>";
  </script>
  
  <h1>xSeed</h1>
  <p id="byline">search torrents by seed</p>
  
  <?php echo "<p>Results for query : \"$query\" with more than $seedLimit seeds.</p>"; ?>
  
  <div id="results"><span class="loading">pondering...</span></div>
  
  
  <!-- YQL Query for The Pirate Bay page 1-->
  <?php echo "<script type='text/javascript' " . "src=\"http://query.yahooapis.com/v1/public/yql?" . "q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fthepiratebay.org%2Fsearch%2F" . rawurlencode(rawurlencode($query)) . "%2F0%2F7%2F0%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Ftable%5B%40id%3D%22searchResult%22%5D%2Ftr'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=xSeed.TPBResponse\"></script>"; ?>
  
  <!-- YQL Query for The Pirate Bay page 2-->
  <?php echo "<script type='text/javascript' " . "src=\"http://query.yahooapis.com/v1/public/yql?" . "q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fthepiratebay.org%2Fsearch%2F" . rawurlencode(rawurlencode($query)) . "%2F1%2F7%2F0%22%20and%0A%20%20%20%20%20%20xpath%3D'%2F%2Ftable%5B%40id%3D%22searchResult%22%5D%2Ftr'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=xSeed.TPBResponse\"></script>"; ?>
  

  
  
  
</body>
</html>
