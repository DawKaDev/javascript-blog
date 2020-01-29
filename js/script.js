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
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  const generateTitleLinks = function (customSelector = '') {
    /* [DONE] remove contents of titleList */
    let html = '';
    const titles = document.querySelector(optTitleListSelector);
    titles.innerHTML = '';
    /* [DONE] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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
    addClickListenersToLinks();
  };
  
  const calculateTagsParams = (tags) => {
    const params = {min: 999999, max: 0,};
    for(let tag in tags) {
      if(tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if(tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagsClass = (count, params) => {
    const classNumber = Math.floor( ( (count - params.min) / (params.max - params.min) ) * (optCloudClassCount - 1) + 1);
    console.log(classNumber);
    return optCloudClassPrefix+classNumber;
  };
  const generateTags = () => {
    const allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    articles.forEach(article => {
      /* find tags wrapper */
      let wrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const tags = articleTags.split(' ');
      /* START LOOP: for each tag */
      tags.forEach(tag => {
        /* generate HTML of the link */
        let link = '<li><a href="#tag-' + tag + '">' + tag + '</a> </li>';
        /* add generated code to html variable */
        html = html + link;
        /* check if this link is NOT in allTags */
        if(!allTags[tag]) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      /* END LOOP: for each tag */
      });
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;
    /* END LOOP: for every article: */
    });
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    const tagsParams = calculateTagsParams(allTags);
    console.log(tagsParams);
    let tagListHTML = '';
    /* [NEW] add html from allTags to tagList */
    for( let tag in allTags) {
      tagListHTML += '<li><a href="#tag-' + tag +'" class="' + calculateTagsClass(allTags[tag], tagsParams)+ '">' + tag + '</a></li>';
    }
    //tagList.innerHTML = allTags.join(' ');
    
    tagList.innerHTML = tagListHTML; 
  };

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    let href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeLinks);
    /* START LOOP: for each active tag link */
    activeLinks.forEach( activeLink => {
    /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    });
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tags = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    tags.forEach( tag => {
    /* add class active */
      tag.classList.add('active');
    /* END LOOP: for each found tag link */
    });
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const generateAuthor = () => {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    articles.forEach(article => {
      /* find author wrapper */
      let wrapper = article.querySelector(optArticleAuthorSelector);
      /* get author from data-author attribute */
      const author = article.getAttribute('data-author');
      /* insert HTML into author wrapper */
      wrapper.innerHTML = '<a href="#author-' + author + '">' + author + '</a>';
    /* END LOOP: for every article: */
    });
  };

  const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    let href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-','');
    /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
    //console.log(activeLinks);
    /* START LOOP: for each active tag link */
    activeAuthors.forEach( author => {
    /* remove class active */
      author.classList.remove('active');
    /* END LOOP: for each active tag link */
    });
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authors = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found tag link */
    authors.forEach( author => {
    /* add class active */
      author.classList.add('active');
    /* END LOOP: for each found tag link */
    });
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  };

  const addClickListenersToTags = () => {
    const links = document.querySelectorAll('a[href^="#tag-"]');
    links.forEach( link => {
      link.addEventListener('click', tagClickHandler);
    });
  };
  const addClickListenersToAuthors = () => {
    const links = document.querySelectorAll('a[href^="#author-"]');
    links.forEach( link => {
      link.addEventListener('click', authorClickHandler);
    });
  };
  const addClickListenersToLinks = () => {
    const links = document.querySelectorAll('.titles a');
    links.forEach( link => {
      link.addEventListener('click', titleClickHandler);
    });
  };
  
  generateTags();
  generateAuthor();
  generateTitleLinks();
  addClickListenersToTags();
  addClickListenersToAuthors();
  addClickListenersToLinks();
  
}