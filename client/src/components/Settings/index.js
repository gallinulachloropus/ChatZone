import React, { useState } from 'react'

const Settings = ({ nickname, setNickname }) => {

    const [nicknameForm, setNicknameForm] = useState('')
    const [settingsToggle, setToggle] = useState(false)
    return settingsToggle ? (
        <div className="settings">
            <button onClick={e => setToggle(!settingsToggle)}><span role="img" aria-label="close">✖️</span></button>
            <form onSubmit={e => {
                e.preventDefault()
                if (nicknameForm) { setNickname(nicknameForm) }
                setNicknameForm('')
            }} >
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nicknameForm}
                    onChange={e => setNicknameForm(e.target.value)} />
                <button>Save Settings</button>
            </form>
        </div >
    ) : <button className='settings-button' onClick={e => setToggle(!settingsToggle)}><span role="img" aria-label="Settings">🔧</span></button>
}

export default Settings
