const searchClient = algoliasearch('MFQXTR0GGX', '5573a3939ea4c23f85417380050d7153');

const search = instantsearch({
  indexName: 'prod_DOCS',
  searchClient,
});

search.addWidgets([
  instantsearch.widgets.searchBox({
    container: '#searchbox',
    placeholder: 'Search for docs...',
    searchAsYouType: true,
    // showReset: false,
    // showSubmit: false,
    showLoadingIndicator: false
  }),

  instantsearch.widgets.hits({
    container: '#hits',
    transformItems: items => items.map(item => ({ ...item,
      content: function() {
        if(item.content.length > 90){
          return item.content.slice(0, 150) + '...';
        }  else {
          return item.content;
        }
      }
    })),
    templates: {
      item: `
        <div class="result_item">
          <a href="{{ href }}" class="result_item--link"></a>
          <ul class="breadcrumbs">
            <li>
              {{ category }}
            </li>
          </ul>
          <div class="result_item--content">
            <div class="result_item--title">
              <h2>
                {{#helpers.highlight}}{ "attribute": "title" }{{/helpers.highlight}}
              </h2>
            </div>
            <div class="result_item--text">
              <p>{{ content }}</p>
            </div>
          </div>
        </div>
      `,

      empty: `<h2 class="text-center">No results</h2><p class="emty-contact">If you can't find what you are looking for email us at <a href="mailto:support@container-registry.com">support@container-registry.com</a></p>`,
    },
  })
]);

search.addWidget({
  render: function(helper) {
    if (helper.state.query === '') {
      $('.search_parent').removeClass('active');
     } else {
      $('.search_parent').addClass('active');
    }
  }
});

search.start();
