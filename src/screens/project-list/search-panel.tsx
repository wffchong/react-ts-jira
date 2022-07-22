import { IUser } from './types'
import { Form, Input, Select } from 'antd'

interface ISearchPanelProps {
    users: IUser[]
    params: {
        name: string
        personId: string
    }
    setParams: (params: ISearchPanelProps['params']) => void
}

const SearchPanel = ({ users, params, setParams }: ISearchPanelProps) => {
    return (
        <Form layout="inline" style={{ marginBottom: '2rem' }}>
            <Form.Item>
                <Input
                    type="text"
                    value={params.name}
                    onChange={(ev) =>
                        setParams({
                            ...params,
                            name: ev.target.value
                        })
                    }
                />
            </Form.Item>
            <Form.Item>
                {' '}
                <Select
                    value={params.personId}
                    onChange={(value) =>
                        setParams({
                            ...params,
                            personId: value
                        })
                    }
                >
                    <Select.Option value="">负责人</Select.Option>
                    {users.map((item) => {
                        return (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        )
                    })}
                </Select>
            </Form.Item>
        </Form>
    )
}

export default SearchPanel
