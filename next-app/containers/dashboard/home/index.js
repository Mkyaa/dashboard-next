import React from 'react'

//styles
import styles from './index.module.css'

//components
import Bookmark from '@/components/bookmark'

//utils bookmark data
import { dashAbs } from '@/utils/dashAbs'

const HomeContainer = () => {

  //dash bookmarks list 
  const dashBookmarks = dashAbs.map((dash, index) => {
    return <Bookmark key={index} dash={dash} />
  })

  return (
      <section id='bookmark-box' className={styles.bookmarkBox}>
        {dashBookmarks}
      </section>
  )
}

export default HomeContainer