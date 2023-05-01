<?php

$config = array(
    'admin' => array(
        'core:AdminPassword',
    ),
    'example-userpass' => array(
        'exampleauth:UserPass',
        'user1:user1pass' => array(
            'uid' => array('1'),
            'eduPersonAffiliation' => array('group1'),
            'email' => 'user1@example.com',
        ),
        'user2:user2pass' => array(
            'uid' => array('2'),
            'eduPersonAffiliation' => array('group2'),
            'email' => 'user2@example.com',
        ),
        'user3:user3pass' => array(
            'uid' => array('3'),
            'eduPersonAffiliation' => array('group3'),
            'email' => 'user3@example.com',
        ),
        'user4:user4pass' => array(
            'uid' => array('4'),
            'eduPersonAffiliation' => array('group4'),
            'email' => 'user4@example.com',
        ),
        'admin:adminpass' => array(
            'uid' => array('5'),
            'eduPersonAffiliation' => array('group_admin'),
            'email' => 'admin@example.com',
        ),
    ),
);
echo json_encode($config);
?>