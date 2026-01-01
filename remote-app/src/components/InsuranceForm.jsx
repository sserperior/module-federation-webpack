import React, { useState } from 'react';
import { isAlpha, isInt } from 'validator';

const InsuranceForm = () => {

	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [submitMessage, setSubmitMessage] = useState('');
	const [nameHasError, setNameHasError] = useState(false);
	const [ageHasError, setAgeHasError] = useState(false);

	const validateName = name => {
		if (isAlpha(name)) {
			setNameHasError(false);
			return true;
		} else {
			setNameHasError(true);
			return false;
		}
	};

	const validateAge = age => {
		if (isInt(age)) {
			setAgeHasError(false);
			return true;
		} else {
			setAgeHasError(true);
			return false;
		}
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const isNameValid = validateName(name);
		const isAgeValid = validateAge(age);
		if (!isNameValid || !isAgeValid) {
			return;
		}
		setSubmitMessage('Submitting...');
		const response = await fetch('/api/send', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				age,
			}),
		});

		if (!response.ok) {
			if (response.status === 400) {
				const errorResponse = await response.json();
				const validationErrors = errorResponse.validationErrors || [];
				setSubmitMessage(`Submission failed: ${validationErrors.join(' ')}`);
			} else {
				setSubmitMessage(`Submission failed with status: ${response.status}`);
			}
			return;
		}
		setSubmitMessage(`Form submitted successfully! at ${new Date().toISOString()}`);
	};

	return (
		<form method='post' onSubmit={handleSubmit}>
			<div style={{ marginBottom: '10px' }}>
				<label htmlFor="nameId" style={{ marginRight: '10px' }}>Name:</label>
				<input type='text' id="nameId" value={name} onChange={e => setName(e.target.value)} />
				{
					nameHasError && <span style={{ color: 'red', marginLeft: '10px' }}>Name must contain only letters</span>
				}
			</div>
			<div style={{ marginBottom: '10px' }}>
				<label htmlFor="ageId" style={{ marginRight: '23px' }}>Age:</label>
				<input type='text' id="ageId" value={age} onChange={e => setAge(e.target.value)} />
				{
					ageHasError && <span style={{ color: 'red', marginLeft: '10px' }}>Age must be an integer</span>
				}
			</div>
			<button type='submit'>Submit</button>
			<div style={{ marginTop: '10px' }}>
				{submitMessage}
			</div>
		</form>
	);
};

export default InsuranceForm;