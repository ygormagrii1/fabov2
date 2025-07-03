import PropTypes from 'prop-types'

function lazyFunction(f) {
  return function (...rest) {
    return f.apply(this, ...rest)
  }
}

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(lazyFunction(() => categoryPropType)),
})

export const categoryItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  slug: PropTypes.string,
  children: PropTypes.arrayOf(lazyFunction(() => categoryPropType)),
})
