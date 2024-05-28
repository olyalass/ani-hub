import SearchForm from './SearchForm'
import SearchContent from './SearchContent'

function SearchPage() {
  return (
    <div
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        display: 'flex',
      }}
    >
      <SearchForm />
      <SearchContent />
    </div>
  )
}

export default SearchPage
