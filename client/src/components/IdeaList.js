import ideasApi from '../services/ideasApi';

class IdeaList {
  constructor() {
    this._ideaListEl = document.querySelector('#idea-list');
    this._ideas = [];
    this.getIdeas();
    this._validation = new Set();
    this._validation.add('technology');
    this._validation.add('software');
    this._validation.add('business');
    this._validation.add('education');
    this._validation.add('health');
    this._validation.add('inventions');
  }

  addEventListenrs() {
    this._ideaListEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-times')) {
        e.stopImmediatePropagation();
        const ideaId = e.target.parentElement.parentElement.dataset.id;
        this.deleteIdea(ideaId);
      }
    });
  }

  _validTags(tag) {
    tag = tag.toLowerCase();
    let tagClass = ``;
    if (this._validation.has(tag)) {
      tagClass = `tag-${tag}`;
    } else {
      tagClass = '';
    }

    return tagClass;
  }

  async getIdeas() {
    try {
      const res = await ideasApi.getIdeas();
      this._ideas = res.data.data;
      this.render();
    } catch (error) {}
  }

  async deleteIdea(ideaId) {
    try {
      const res = await ideasApi.deleteIdea(ideaId);
      this.getIdeas();
    } catch (error) {
      alert('You cannot delete this post');
    }
  }

  addIdeaToList(idea) {
    this._ideas.push(idea);
    this.render();
  }

  render() {
    this._ideaListEl.innerHTML = this._ideas
      .map((idea) => {
        return `
      <div class="card" data-id = "${idea._id}">
        ${
          idea.username === localStorage.getItem('username')
            ? '<button class="delete"><i class="fas fa-times"></i></button>'
            : ''
        }
        <h3>
          ${idea.text}
        </h3>
        <p class="tag ${this._validTags(
          idea.tag
        )}">${idea.tag.toUpperCase()}</p>
        <p>
          Posted on <span class="date">${idea.date}</span> by
          <span class="author">${idea.username}</span>
        </p>
      </div>      
      `;
      })
      .join('');
    this.addEventListenrs();
  }
}

export default IdeaList;
