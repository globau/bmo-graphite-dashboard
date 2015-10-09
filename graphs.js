var graphs = [
  {
    title: 'Webheads 1 Min Load',
    target: [
      'stacked(hosts.web[1-9]_bugs_scl3_mozilla_com.load.load.shortterm)',
    ],
    expanded: 'webheads_load'
  },
  {
    title: 'Webheads Memory Usage ',
    target: [
      'stacked(hosts.web[1-9]_bugs_scl3_mozilla_com.memory.memory.used.value)',
    ],
    expanded: 'webheads_memory'
  },
  {
    title: 'Webhead Network',
    target: [
      'sumSeries(hosts.web[1-9]_bugs_scl3_mozilla_com.interface.if_octets.bond0.rx)',
      'sumSeries(hosts.web[1-9]_bugs_scl3_mozilla_com.interface.if_octets.bond0.tx)'
    ],
    lineWidth: 2
  },
  {
    title: 'HTTP Requests',
    target: [
      'hosts.web[1-9]_bugs_scl3_mozilla_com.apache.apache80.apache_requests.count',
    ]
  },
  {
    title: 'HTTP In-Flight Requests',
    target: 'hosts.web[1-9]_bugs_scl3_mozilla_com.apache.apache80.apache_scoreboard.sending.count',
    expanded: 'webheads_in_flight'
  },
  {
    title: 'HTTPd Idle Workers',
    target: 'stacked(hosts.web[1-9]_bugs_scl3_mozilla_com.apache.apache80.apache_idle_workers.count)'
  },
  {
    title: 'DB 1 Min Load',
    target: 'stacked(hosts.bugzilla[1-9]_db_scl3_mozilla_com.load.load.shortterm)',
    expanded: 'db_load'
  },
  {
    title: 'Jobqueue 1 Min Load',
    target: 'stacked(hosts.jobqueue[1-9]_bugs_scl3_mozilla_com.load.load.shortterm)'
  },
  {
    title: 'Jobqueue Memory Usage',
    target: 'stacked(hosts.jobqueue[1-9]_bugs_scl3_mozilla_com.memory.memory.used.value)'
  },
  /*
  {
    title: 'Push 1 Min Load',
    target: 'stacked(hosts.push[1-9]_bugs_scl3_mozilla_com.load.load.shortterm)'
  }
  */
];
