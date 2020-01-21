{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('Clicked element: ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    let link = clickedElement.getAttribute('href');
    console.log(link);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    let article = document.querySelector(link);

    /* [DONE] add class 'active' to the correct article */
    article.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  const generateTitleLinks = function () {
    /* [DONE] remove contents of titleList */
    let html = '';
    const titles = document.querySelector(optTitleListSelector);
    titles.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    articles.forEach(article => {
      /* [DONE] get article id */
      const id = article.getAttribute('id');
      /* [DONE] find title element */
      /* [DONE] get title from title element */
      const title = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] create HTML link */
      const link = '<li><a href="#' + id + '"><span>' + title + '</span></a></li>';
      html = html + link;
      /* [DONE] insert link into titleList */
      titles.innerHTML = html;
    });
  };
  
  generateTitleLinks();
  
  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}