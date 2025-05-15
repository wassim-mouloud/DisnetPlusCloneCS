async function summary(text){
	const url = 'https://gpt-summarization.p.rapidapi.com/summarize';
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': 'dfcc1b0a06msh657383e95a23476p17fc19jsn4f185dfddce9',
			'X-RapidAPI-Host': 'gpt-summarization.p.rapidapi.com'
		},
		body: JSON.stringify({
			text: text,
			num_sentences: 2
		})
	};


	try {
			const response = await fetch(url, options);
			const result = await response.json();
			console.log(result.summary)
	}catch (error) {
			console.error(error);
	}

}

summary("Doctor Strange, with the help of mystical allies both old and new, traverses the mind-bending and dangerous alternate realities of the Multiverse to confront a mysterious new adversary.")
