import React from 'react';
import GroupListItem from '../components/GroupListItem';
import AddGroupButton from '../components/AddGroupButton'
import AppLogo from '../components/AppLogo'
import GroupSelector from './GroupSelector'
import { SortableContainer } from 'react-sortable-hoc'
import styles from './GroupList.css';

class GroupList extends React.Component {
    state = {
        isSelectingGroups: false
    }
    componentDidMount() {
        const { groupsOrder: groupIds } = this.props
        if (!groupIds || groupIds.length === 0) 
            this.setState({ isSelectingGroups: true })
    }
    render() {
        const { groupsData, groupsOrder, onSelect, onRemove, currentGroupId } = this.props
        return (
            <div className={styles.container}>
                <AppLogo />
                <div className={styles.groupItems}>
                    {groupsOrder.filter(gid => gid in groupsData).map((gid, idx) => (
                        <GroupListItem
                            key={gid}
                            index={idx}
                            group={groupsData[gid]}
                            isBeingSelected={gid === currentGroupId}
                            onSelect={onSelect}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
                <AddGroupButton onClick={() => this.setState({ isSelectingGroups: true })} />
                <GroupSelector 
                    existedGroups={groupsOrder}
                    open={this.state.isSelectingGroups} 
                    onRequestClose={() => this.setState({ isSelectingGroups: false })}
                    onSelect={this.props.onAddGroups}
                    accessToken={this.props.accessToken}
                />
            </div>
        )
    }
}
export default SortableContainer(GroupList)