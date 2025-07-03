import PropTypes from 'prop-types'
import React, { Fragment, useState } from 'react'
import { graphql } from 'react-apollo'
import { injectIntl, intlShape } from 'react-intl'
import { IconMenu } from 'vtex.store-icons'
import { useRuntime } from 'vtex.render-runtime'
import { compose, path } from 'ramda'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import CategoryItem from './components/HeaderCategoryMenu/CategoryItem'
import SideBar from './components/HeaderCategoryMenu/SideBar'
import { categoryPropType } from './components/HeaderCategoryMenu/propTypes'
import getCategories from './components/HeaderCategoryMenu/queries/categoriesQuery.gql'
import styles from './components/HeaderCategoryMenu/categoryMenu.css' 
import categoryMenuPosition, {
  getMenuPositionNames,
  getMenuPositionValues,
} from './components/HeaderCategoryMenu/utils/categoryMenuPosition'
import sortSubcategoriesItems, {
  getSortSubcategoriesNames,
  getSortSubcategoriesValues,
} from './components/HeaderCategoryMenu/utils/sortSubcategoriesItems'

const DEFAULT_SUBCATEGORIES_LEVELS = 1

/**
 * Component that represents the menu containing the categories of the store
 */
const HeaderCategoryMenu = ({
  mobileMode = false,
  showAllDepartments = true,
  showSubcategories = true,
  menuPosition = categoryMenuPosition.DISPLAY_CENTER.value,
  sortSubcategories = sortSubcategoriesItems.SORT_DEFAULT.value,
  departments = [],
  data: { categories = [] },
  intl,
}) => {
  const runtime = useRuntime()
  const [sideBarVisible, setSidebarVisible] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarVisible((prevVisible) => !prevVisible)
  }

  const departmentsIds = departments.map((dept) => dept.id)
  const departmentsSelected = categories.filter((category) =>
    departmentsIds.includes(category.id)
  )

  const visibleDepartments =
    (departmentsSelected.length && departmentsSelected) || categories

  if (mobileMode) {
    return (
      <div className={`${styles.sidebarContainer} ${styles.mobile}`}>
        <SideBar
          visible={sideBarVisible}
          title={intl.formatMessage({
            id: 'store/category-menu.departments.title',
          })}
          departments={visibleDepartments}
          onClose={handleSidebarToggle}
          showSubcategories={showSubcategories}
        /> 
      </div>
    )
  }

  const pathName = path(['route', 'params', 'department'], runtime)

  const department = pathName && pathName

  const desktopClasses = classNames(
    `${styles.container} w-100 bg-base dn flex-m`,
    {
      'justify-start': menuPosition === categoryMenuPosition.DISPLAY_LEFT.value,
      'justify-end': menuPosition === categoryMenuPosition.DISPLAY_RIGHT.value,
      'justify-center':
        menuPosition === categoryMenuPosition.DISPLAY_CENTER.value,
    }
  )

  return (
    <nav className={desktopClasses}>
      <Container
        className={`${styles['section--department']} ${styles['custom-header-menu']} justify-center flex`}
      >
        <ul
          className={`${styles.departmentList} pa0 list ma0 flex flex-wrap flex-row t-action overflow-hidden h3`}
        >
          {showAllDepartments && (
            <CategoryItem
              noRedirect
              menuPosition={menuPosition}
              subcategoryLevels={
                DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories
              }
              sortSubcategories={sortSubcategories}
              category={{
                children: categories,
                name: intl.formatMessage({
                  id: 'store/category-menu.departments.title',
                }),
              }}
            />
          )}
          {visibleDepartments.map((category) => (
            <Fragment key={category.id}>
              <CategoryItem
                menuPosition={menuPosition}
                category={category}
                subcategoryLevels={
                  DEFAULT_SUBCATEGORIES_LEVELS + showSubcategories
                }
                isCategorySelected={department === category.slug}
                sortSubcategories={sortSubcategories}
              />
            </Fragment>
          ))}
        </ul>
      </Container>
    </nav>
  )
}

HeaderCategoryMenu.propTypes = {
  /** Categories query data */
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(categoryPropType),
  }),
  /** Set mobile mode */
  mobileMode: PropTypes.bool,
  /** Whether to show the departments category or not */
  showAllDepartments: PropTypes.bool,
  /** Whether to show subcategories or not */
  showSubcategories: PropTypes.bool,
  /** Defines the position of the category menu */
  menuPosition: PropTypes.oneOf(getMenuPositionValues()),
  /** Intl */
  intl: intlShape,
  /** Departments to be shown in the desktop mode. */
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
  sortSubcategories: PropTypes.oneOf(getSortSubcategoriesValues()),
}

HeaderCategoryMenu.schema = {
  title: 'admin/editor.category-menu.title',
  description: 'admin/editor.category-menu.description',
  type: 'object',
  properties: {
    showAllDepartments: {
      type: 'boolean',
      title: 'admin/editor.category-menu.show-departments-category.title',
      default: true,
    },
    menuPosition: {
      title: 'admin/editor.category-menu.disposition-type.title',
      type: 'string',
      enum: getMenuPositionValues(),
      enumNames: getMenuPositionNames(),
      default: categoryMenuPosition.DISPLAY_CENTER.value,
      isLayout: true,
    },
    showSubcategories: {
      type: 'boolean',
      title: 'admin/editor.category-menu.show-subcategories.title',
      default: true,
    },
    sortSubcategories: {
      title: 'admin/editor.category-menu.sort-subcategories.title',
      type: 'string',
      enum: getSortSubcategoriesValues(),
      enumNames: getSortSubcategoriesNames(),
      default: sortSubcategoriesItems.SORT_DEFAULT.value,
    },
    departments: {
      title: 'store/category-menu.departments.title',
      type: 'array',
      minItems: 0,
      items: {
        title: 'admin/editor.category-menu.departments.items.title',
        type: 'object',
        properties: {
          id: {
            title: 'admin/editor.category-menu.departments.items.id',
            type: 'number',
          },
        },
      },
    },
  },
}

export default compose(graphql(getCategories), injectIntl)(HeaderCategoryMenu)
