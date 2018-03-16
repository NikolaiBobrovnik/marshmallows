<?php
	/**
	 * Created by PhpStorm.
	 * LK: dev_1
	 * Date: 30.08.2017
	 * Time: 13:56
	 */

	namespace Classes;

	class Validator {
		/**
		 * @var array
		 */
		protected $data = array();

		/**
		 * @var array
		 */
		protected $years = array(
			'min' => 1900,
			'max' => 2017,
		);

		/**
		 * @var array
		 */
		protected $errors = array();

		/**
		 * @var FileWorker
		 */
		protected $fileWorker;

		public function __construct($data = array(), $fileWorker) {
			$this->data = $data;
			$this->fileWorker = $fileWorker;

			$this->validate();
		}

		/**
		 * @return void
		 */
		public function validate() {
			$this->validateEmail();
			$this->validateDate();
			$this->validateUnique();
		}

		/**
		 * @return bool
		 */
		public function isValid() {
			return empty($this->errors);
		}

		/**
		 * @return array
		 */
		public function getErrors() {
			return $this->errors;
		}

		/**
		 * @return void
		 */
		protected function validateEmail() {
			if (!isset($this->data['email'])) {
				$this->errors['email'][] = 'No email field';

				return;
			}

			if (filter_var($this->data['email'], FILTER_VALIDATE_EMAIL) === false) {
				$this->errors['email'][] = 'Value is not email';

				return;
			}
		}

		/**
		 * @return void
		 */
		protected function validateDate() {
			if (!isset($this->data['date'])) {
				$this->errors['date'][] = 'No date field';

				return;
			}

			$date = date_parse($this->data['date']);

			if (!checkdate($date['month'], $date['day'], $date['year'])) {
				$this->errors['date'][] = "Неправильно введена дата";

				return;
			}
		}

		/**
		 * @return void
		 */
		protected function validateUnique() {
			if (isset($this->errors['email']) || isset($this->errors['date'])) return;

			if ($this->fileWorker->searchRecord($this->data['email'], $this->data['date'])) {
				$this->errors['unique'][] = "Ой, в нашей базе уже есть такой e-mail. Не волнуйтесь, вы обязательно получите письмо.";

				return;
			}
		}
	}
