import React, { useEffect, useState, useRef, Fragment } from 'react'
import config from './whirl.config.json'
const whirls = config.whirls.filter(w => w.active)
/**
 * Create rendering groups for the dropdown
 */
const whirlGroups = {
  pseudo: [],
  single: [],
  multi: [],
}
for (let whirl of whirls) {
  const { requiredElements: required } = whirl
  const numberOfElements = required.reduce((t, n) => t + n)
  if (numberOfElements === 0) whirlGroups.pseudo.push(whirl)
  if (numberOfElements === 1) whirlGroups.single.push(whirl)
  if (numberOfElements > 1) whirlGroups.multi.push(whirl)
}
const getSelection = current => {
  const newSelection = whirls[Math.floor(Math.random() * whirls.length)]
  if (current.name === newSelection.name) return getSelection(current)
  return newSelection
}

const Whirl = ({ index, container, requiredElements, className }) => {
  if (index === 0 && requiredElements[index] === 0)
    return <div className={`container ${className}`} />

  const renderElements = () =>
    new Array(requiredElements[index]).fill().map((e, i) => (
      <div key={`whirl--${index}--${i}`} className={container && className}>
        {requiredElements[index + 1] !== undefined && (
          <Whirl
            index={index + 1}
            className={className}
            requiredElements={requiredElements}
          />
        )}
      </div>
    ))

  if (container) return <div className="container">{renderElements()}</div>

  return renderElements()
}

const App = () => {
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(
    whirls[Math.floor(Math.random() * whirls.length)]
  )
  const select = useRef(null)
  const selectRandomWhirl = () => setSelected(getSelection(selected))
  const selectWhirl = () =>
    setSelected(whirls.filter(w => w.name === select.current.value)[0])

  // When the selection changes, update the selected whirl
  useEffect(() => {
    setLoading(true)
    import(`./whirls/${selected.name}.scss`)
      .then(() => setLoading(false))
      .catch(() => setLoading(false))
  }, [selected])

  const { className, name, requiredElements } = selected

  if (!selected) return <h1>No Active Whirls</h1>
  return (
    <Fragment>
      <header>
        <h1>Whirl</h1>
        <h2>CSS loading animations with minimal effort!</h2>
      </header>
      {!loading && (
        <Whirl
          className={className}
          requiredElements={requiredElements}
          index={0}
          container
        />
      )}
      {loading && <div className="container">Loading...</div>}
      <div className="actions">
        <div className="select-wrapper">
          <select
            ref={select}
            disabled={loading}
            value={name}
            onChange={selectWhirl}>
            {Object.keys(whirlGroups).map((g, i) => (
              <Fragment key={`whirl-group--${i}`}>
                {whirlGroups[g].length !== 0 && (
                  <optgroup
                    label={`--- ${g.charAt(0).toUpperCase()}${g.slice(
                      1
                    )} Element ---`}>
                    {whirlGroups[g].map((w, idx) => (
                      <option key={`whirl--${idx}`} value={w.name}>
                        {w.name}
                      </option>
                    ))}
                  </optgroup>
                )}
              </Fragment>
            ))}
          </select>
        </div>
        <button disabled={loading} onClick={selectRandomWhirl}>
          Lucky Dip!
        </button>
      </div>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={`https://github.com/jh3y/whirl/blob/v${
          process.env.REACT_APP_VERSION
        }/css/${className}.css`}>
        Grab the CSS on Github!
      </a>
      <footer>{whirls.length} whirls and counting!</footer>
    </Fragment>
  )
}

export default App
