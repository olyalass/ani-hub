import { ListsContent } from './ListsContent'
import ListsMenu from './ListsMenu'

export function ListsPage() {
  return (
    <div
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'start',
        display: 'flex',
        width: '100%',
      }}
    >
      <ListsMenu />
      <ListsContent />
    </div>
  )
}
