<?php
	if ( !empty($_SERVER['HTTP_ORIGIN'])) {
		header('Access-Control-Allow-Origin: '.$_SERVER['HTTP_ORIGIN']);
		header('Access-Control-Allow-Methods: GET,POST');
		header('Access-Control-Allow-Credentials: true');
		//header('Access-Control-Allow-Headers: Authorization');
		header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	}
	require __DIR__ . '/../vendor/autoload.php';

	$file = 'data.csv';

	$result = [];

	$data = $_REQUEST;

	foreach ($data as $key => $value) {
		$data[$key] = mb_strtolower(trim($value));
	}

	$fileWorker = new \Classes\FileWorker($file);

	$validator = new \Classes\Validator($data, $fileWorker);

	if ($validator->isValid()) {
		$fileWorker->addRecord($data['email'], $data['date']);

		$result['status'] = 'ok';
	} else {
		$result['status'] = 'error';
		$result['errors'] = $validator->getErrors();
	}

	echo json_encode($result);

	return;

	/*for ($i = 0; $i < 1000000; $i++) {
		$email = "test{$i}@test.com";
		$year = rand(1900, 2017);

		$fileWorker->addRecord($email, $year);
	}*/
