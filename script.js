document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    document.getElementById('filter-title').addEventListener('input', filterCards);
    document.getElementById('filter-description').addEventListener('input', filterCards);
});

let fetchedData = [];
let currentPage = 1;
const itemsPerPage = 4;

async function fetchData() {
    try {
        const response = await fetch(' https://mocki.io/v1/866bbef0-5397-4dfb-8925-af4aed3486c5 ');
        fetchedData = await response.json();
        renderCards();
        renderPagination();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function renderCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    const filteredData = getFilteredData();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    paginatedData.forEach(item => {
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

function renderPagination() {
    const paginationControls = document.getElementById('pagination-controls');
    paginationControls.innerHTML = '';

    const filteredData = getFilteredData();
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    if (totalPages > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => {
            currentPage--;
            renderCards();
            renderPagination();
        });
        paginationControls.appendChild(prevButton);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.disabled = i === currentPage;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderCards();
                renderPagination();
            });
            paginationControls.appendChild(pageButton);
        }

        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => {
            currentPage++;
            renderCards();
            renderPagination();
        });
        paginationControls.appendChild(nextButton);
    }
}

function filterCards() {
    currentPage = 1; 
    renderCards();
    renderPagination();
}

function getFilteredData() {
    const titleQuery = document.getElementById('filter-title').value.toLowerCase();
    const descriptionQuery = document.getElementById('filter-description').value.toLowerCase();

    return fetchedData.filter(item => 
        item.title.toLowerCase().includes(titleQuery) &&
        item.body.toLowerCase().includes(descriptionQuery)
    );
}
