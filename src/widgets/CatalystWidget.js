import React, { Component } from 'react'
import { connect } from 'react-redux'
import Widget from '../components/Widget'
import { getSolrSearchPromise } from '../selectors';

const searchCatalyst = (searchParams) => {
  let url = `${ process.env.CATALYST_SOLR }/select`
  return getSolrSearchPromise(searchParams, searchParams.query, url)
}

const CatalystItem = ({ record, index }) => (
    <div className='item'>
      <a href={`${ process.env.CATALYST_URL }/${ record.id }`}>
        <div className='itemTitle' >
          { record.title_display }
        </div>
        <span className='types'>{ record.format.join(', ') }</span>&nbsp;
        <span>({ record.pub_date })</span>
      </a>
    </div>
)

const mapStateToProps = ({ data }) => {
  let initProps = {
    id: 'catalyst-bento',
    title: 'Catalyst'
  }
  if ('response' in data) {
    let { docs, numFound, start } = data.response
    const items = docs.map((record, index) =>
      <CatalystItem key={ record.id } record={ record } index= { index+start }/>
    )
    return {
      ...initProps,
      numFound,
      items,
      url: `${ process.env.CATALYST_URL }?search_field=all_fields&q=`
    }
  } else {
    return initProps
  }
}

export default connect(mapStateToProps)(Widget)
export { searchCatalyst }
