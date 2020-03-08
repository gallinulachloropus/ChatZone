import React, { useState } from 'react'

const Settings = ({ nickname, setNickname, color, setColor }) => {

    const [nicknameForm, setNicknameForm] = useState('')
    const [settingsToggle, setToggle] = useState(false)
    const [colorForm, setColorForm] = useState(color)

    const colors = ['Black', 'Red', 'Blue', 'Green', 'Teal', 'Purple', 'HotPink', 'Orange']
    const colorOptions = colors.map((color, i) => <option key={i} value={color} style={{ color, fontWeight: 'bold' }}>{color}</option>)
    return settingsToggle ? (
        <div className="settings">
            <button className='settings-button' onClick={e => setToggle(!settingsToggle)}><span role="img" aria-label="close">✖️</span></button>
            <form onSubmit={e => {
                e.preventDefault()
                if (nicknameForm) { setNickname(nicknameForm) }
                setColor(colorForm)
                setNicknameForm('')
                setToggle(!settingsToggle)
            }} >
                <input
                    type="text"
                    placeholder="Nickname"
                    value={nicknameForm}
                    onChange={e => setNicknameForm(e.target.value)} />
                <select
                    onChange={e => setColorForm(e.target.value)}
                    value={colorForm}
                >
                    {colorOptions}
                </select>
                <button><span role="img" aria-label="Save">💾</span> Save Settings</button>
            </form>
        </div >
    ) : <button className='settings-button' onClick={e => setToggle(!settingsToggle)}><span role="img" aria-label="Settings">🔧</span></button>
}

export default Settings
