import { useContext, useEffect, useState } from 'react'
import { Input } from 'antd'
import { MdSearch } from 'react-icons/md'
import { debounce } from 'lodash'
import { useQuery } from '@tanstack/react-query'
import { ColorModeContext } from '@/contexts/colorMode'
import http from '@/utils/http'

interface SearchProps {
  endpoint: string
  keysearch: string
  onChangeInput: (value: string) => void
}

const UseSearchQuery = (endpoint: string, keysearch?: string) => {
  return useQuery({
    queryKey: [`${endpoint}`, keysearch],
    queryFn: async () => {
      const res = await http.get(`/${endpoint}`, {
        params: {
          search: keysearch,
        },
      })
      return res.data.data
    },
    enabled: !!keysearch,
    staleTime: 2000,
    refetchInterval: 2000,
  })
}

const AdminSearch: React.FC<SearchProps> = ({ endpoint, keysearch, onChangeInput }) => {
  const { mode } = useContext(ColorModeContext)
  const [searched, setSearched] = useState<boolean>(false)
  const [keySearch, setKeySearch] = useState<string>(keysearch)

  const searchQuery = UseSearchQuery(endpoint, keySearch)

  useEffect(() => {
    if (searched) {
      debounce(() => {
        searchQuery.refetch()
      }, 1000)
    }
  }, [searchQuery, searched])

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeySearch(event.target.value)
    setSearched(false)
    onChangeInput(event.target.value)
  }

  const handleSearch = () => {
    setSearched(true)
    debounce(() => {
      searchQuery.refetch()
    }, 1000)
  }

  return (
    <Input.Search
      placeholder='Search...'
      allowClear
      enterButton={<MdSearch className={`text-${mode === 'light' ? 'black' : 'white'} align-middle text-[24px]`} />}
      size='large'
      value={keySearch || ''}
      onPressEnter={handleSearch}
      onSearch={handleSearch}
      onChange={onChange}
    />
  )
}

export default AdminSearch
