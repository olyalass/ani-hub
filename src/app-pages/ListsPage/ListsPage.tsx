import { ListsContent } from './ListsContent'
import ListsMenu from './ListsMenu'

export function ListsPage() {
  return (
    <div className="lists-page">
      <ListsMenu />
      <ListsContent />
    </div>
  )
}
