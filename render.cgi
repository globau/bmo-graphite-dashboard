#!/usr/bin/perl
use strict;
use warnings;

use CGI;
use DateTime;
use Digest::MD5 qw(md5_hex);
use FindBin qw($Bin);
use LWP::UserAgent;

my $query_string = $ENV{QUERY_STRING} || '';
$query_string =~ s/&_uniq=\d+//;
my $prefix = DateTime->now->strftime('%Y%m%d%H%M');
$prefix = $prefix - ($prefix % 2);

my $file = "graphs/${prefix}_" . md5_hex($query_string) . '.png';

if (!-e "$Bin/$file" || !-s "$Bin/$file") {
    $ENV{PERL_LWP_SSL_VERIFY_HOSTNAME} = 0;
    my $url = "https://graphite-scl3.mozilla.org/render?$query_string&_uniq=" . (time);
    my $ua = LWP::UserAgent->new(agent => 'glob.uno/graphite cache');
    $ua->default_header('Referer' => 'http://glob.uno/graphite/');
    my $response = $ua->get($url);
    if (open(my $fh, ">$Bin/$file")) {
        binmode($fh);
        print $fh $response->content;
        close($fh);
    }
}

print "Location: http://glob.uno/graphite/$file\n\n";

my $prefix_q = quotemeta("$Bin/graphs/$prefix");
foreach my $file (grep { !/^$prefix_q/ } glob("$Bin/graphs/*.png")) {
    unlink($file);
}
