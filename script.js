document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById('filter-title').addEventListener('input', filterCards);
    document.getElementById('filter-description').addEventListener('input', filterCards);
});

let fetchedData = [];

async function fetchData() {
    try {
        const response = await fetch(' https://mocki.io/v1/866bbef0-5397-4dfb-8925-af4aed3486c5 ');
        fetchedData = await response.json();
        renderCards(fetchedData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderCards(data) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    data.slice(0, 55).forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const image = document.createElement('img');
        image.src = `https://picsum.photos/300/200?random=${item.id}`;
        card.appendChild(image);

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('h2');
        title.classList.add('card-title');
        title.textContent = item.title;
        cardContent.appendChild(title);

        const description = document.createElement('p');
        description.classList.add('card-description');
        description.textContent = item.body;
        cardContent.appendChild(description);

        card.appendChild(cardContent);
        container.appendChild(card);
    });
}

function filterCards() {
    const titleQuery = document.getElementById('filter-title').value.toLowerCase();
    const descriptionQuery = document.getElementById('filter-description').value.toLowerCase();

    const filteredData = fetchedData.filter(item => 
        item.title.toLowerCase().includes(titleQuery) &&
        item.body.toLowerCase().includes(descriptionQuery)
    );

    renderCards(filteredData);
}
