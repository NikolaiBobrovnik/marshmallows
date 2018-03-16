<?php
	/**
	 * Created by PhpStorm.
	 * LK: dev_1
	 * Date: 30.08.2017
	 * Time: 14:16
	 */

	namespace Classes;

	class FileWorker {
		const DELIMITER = ';';
		/**
		 * @var string
		 */
		protected $file;

		/**
		 * FileWorker constructor.
		 * @param string $file
		 */
		public function __construct($file) {
			$this->file = $file;
		}

		/**
		 * @param string $email
		 * @param string $date
		 * @return bool
		 */
		public function searchRecord($email, $date) {
			$handle = fopen($this->file, 'r');

			if ($handle === false) return false;

			while (($data = fgetcsv($handle, 1000, self::DELIMITER)) !== FALSE) {
				if ($data[0] == $email && $data[1] == $date) {
					fclose($handle);

					return true;
				}
			}

			fclose($handle);

			return false;
		}

		/**
		 * @param string $email
		 * @param string $date
		 */
		public function addRecord($email, $date) {
			$handle = fopen($this->file, 'a');

			$data = array(
				$email,
				$date,
			);

			fputcsv($handle, $data, self::DELIMITER);

			fclose($handle);
		}
	}
