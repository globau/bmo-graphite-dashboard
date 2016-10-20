#!/usr/bin/perl
use strict;

my $graphs = $ENV{QUERY_STRING} || 'graphs';
$graphs =~ s/[^a-z_-]/-/g;
my $is_expanded = $graphs ne 'graphs';

print <<EOF;
content-type: text/html

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard: BMO</title>
    <link rel="shortcut icon" href="favicon.ico">
    <link href="style.css" rel="stylesheet" type="text/css" >
    <script src="$graphs.js?3" type="text/javascript"></script>
    <script src="dashboard.js?4" type="text/javascript"></script>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
</head>
<body onload="init()">
EOF
if ($is_expanded) {
    print <<EOF;
    <div id="title">
        <a href="?">Dashboard: BMO</a> :
        $graphs
    </div>
EOF
} else {
    print <<EOF;
    <div id="title">
        Dashboard: BMO
    </div>
EOF
}
print <<EOF;
    <div id="actions">
        <button onclick="refresh()" title="Automatic refresh: 60 seconds">Refresh Now</button>
        <select id="span" onchange="refresh()">
            <option value="-1hour">Hour</option>
            <option value="-2hours">2 Hours</option>
            <option value="-4hours">4 Hours</option>
            <option value="-8hours">8 Hours</option>
            <option value="-24hours">Day</option>
            <option value="-1weeks">Week</option>
            <option value="-1months">Month</option>
        </select>
    </div>
    <div id="content"></div>
    <div id="source">
        <a href="https://github.com/globau/bmo-graphite-dashboard/">source</a>
    </div>
</body>
</html>
EOF
