import React, { useState } from 'react'

const Settings = ({ nickname, setNickname }) => {

    const [nicknameForm, setNicknameForm] = useState('')
    return (
        <div className="settings">
            <form onSubmit={e => {
                e.preventDefault()
                setNickname(nicknameForm)
                setNicknameForm('')
            }} >
                <input
                    type="text"
                    value={nicknameForm}
                    onChange={e => setNicknameForm(e.target.value)} />
                <button>Set Nickname</button>
            </form>
        </div>
    )
}

export default Settings
