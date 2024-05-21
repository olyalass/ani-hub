import Form from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import { useContext, useEffect, useState } from 'react'
import { Button, Switch, Input, Select } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import ThemeContext from '../../shared/ThemeContext'
import { ratings } from '../../shared/raitings'
import { FormObjType, StateType } from '../../types'
import { clearMultiFilters, setMultiFilters } from '../../redux/actionCreators'
import parseFormObjToFormData from '../../api/parsers/parseFormObjToFormData'

function SearchForm() {
  const initialFormData = useSelector((state: StateType) => state.multiFilters)
  const dispatch = useDispatch()
  const [formObj, setFormObj] = useState(initialFormData)
  const isLightTheme = useContext(ThemeContext)
  const genres = useSelector((state: StateType) => state.genres)

  useEffect(() => {
    setFormObj(initialFormData)
  }, [initialFormData])

  return (
    <aside
      className={
        isLightTheme ? 'search-sider' : 'search-sider search-sider-dark'
      }
    >
      <Form
        labelAlign="left"
        layout="vertical"
        onFieldsChange={(changedFields) => {
          const formDataObj = { ...formObj }
          const newFormObj: FormObjType = changedFields.reduce((acc, curr) => {
            return { ...acc, [curr.name[0]]: curr.value }
          }, formDataObj)
          setFormObj(newFormObj)
        }}
        onFinish={() => {
          dispatch(setMultiFilters(formObj))
        }}
        fields={parseFormObjToFormData(formObj)}
      >
        <FormItem label="Order by" name="order_by" key="order_by">
          <Select
            options={[
              { value: 'title', label: 'title', key: 'title' },
              { label: 'start date', value: 'start_date', key: 'start' },
              { label: 'end date', value: 'end_date', key: 'end' },
              { label: 'episodes', value: 'episodes', key: 'episodes' },
              { label: 'score', value: 'score', key: 'score' },
            ]}
          />
        </FormItem>
        <FormItem label="Order" name="isAscending" key="isAscending">
          <Switch
            checkedChildren={<ArrowUpOutlined style={{ color: 'navy' }} />}
            unCheckedChildren={<ArrowDownOutlined />}
          ></Switch>
        </FormItem>
        <FormItem label="Title" name="q" key="q">
          <Input name="q" placeholder="input title" allowClear></Input>
        </FormItem>
        <FormItem label="Rating" name="rating" key="rating">
          <Select allowClear placeholder="select one">
            {ratings.map((rating) => (
              <Select.Option value={rating.key} key={rating.key}>
                {rating.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Genres" name="genres" key="genres">
          <Select allowClear mode="multiple" placeholder="select multiple">
            {genres.map((genre) => (
              <Select.Option value={genre.key} key={genre.key}>
                {genre.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          label="Exclude genres"
          name="genres_exclude"
          key="genres_exclude"
        >
          <Select allowClear mode="multiple" placeholder="select multiple">
            {genres.map((genre) => (
              <Select.Option value={genre.key} key={genre.key}>
                {genre.label}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Status" name="status" key="status">
          <Select
            allowClear
            placeholder="select one"
            options={[
              { value: 'airing', label: 'Airing' },
              { value: 'complete', label: 'Complete' },
              { value: 'upcoming', label: 'Upcoming' },
            ]}
          />
        </FormItem>
        <Button
          htmlType="submit"
          style={{
            alignSelf: 'center',
            backgroundColor: '#d29ada',
            color: 'white',
          }}
        >
          Search <SearchOutlined style={{ color: 'white' }} />
        </Button>
        <Button
          onClick={() => {
            dispatch(clearMultiFilters())
          }}
        >
          Clear filters
        </Button>
      </Form>
    </aside>
  )
}

export default SearchForm
