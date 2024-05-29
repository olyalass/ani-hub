import SearchForm from './SearchForm'
import SearchContent from './SearchContent'

export function SearchPage() {
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
