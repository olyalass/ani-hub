import Form from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import { useContext, useMemo, useState, useEffect } from 'react'
import { Button, Switch, Input, Select } from 'antd'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  SearchOutlined,
} from '@ant-design/icons'

import { ThemeContext, initialSearchFormData, ratings } from '../../shared'
import { FiltersType } from '../../types'
import {
  parseFormObjToFormData,
  parseObjFiltersToUrl,
  parseUrlFiltersToObj,
} from '../../api'
import { useTypedSelector } from '../../hooks'
import { useNavigate, useParams } from 'react-router'

function SearchForm() {
  const { filters } = useParams()
  const urlFormData = useMemo(() => parseUrlFiltersToObj(filters), [filters])
  const [formObj, setFormObj] = useState(urlFormData)
  const isLightTheme = useContext(ThemeContext)
  const genres = useTypedSelector((state) => state.genres.genres)
  const navigate = useNavigate()

  useEffect(() => {
    setFormObj(urlFormData)
  }, [urlFormData])

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
          const newFormObj: FiltersType = changedFields.reduce(
            (acc, curr) => ({ ...acc, [curr.name[0]]: curr.value }),
            { ...formObj },
          )
          setFormObj(newFormObj)
        }}
        onFinish={() => {
          const path = parseObjFiltersToUrl(formObj)
          navigate('/search/' + path)
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
          />
        </FormItem>
        <FormItem label="Title" name="searchword" key="searchword">
          <Input name="searchword" placeholder="input title" allowClear />
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
            setFormObj(initialSearchFormData)
            navigate('/search')
          }}
        >
          Clear filters
        </Button>
      </Form>
    </aside>
  )
}

export default SearchForm
