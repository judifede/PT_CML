import PropTypes from 'prop-types'

function PhraseResponse({
  textResponse,
  textStatus,
  phraseResponseLength,
  currentSearch,
}) {
  return (
    <>
      {textResponse.name && textStatus !== 'Error' ? (
        <div>
          <p>
            <span>Mi recomendación sobre</span>
            <span className="font-medium">{" '" + currentSearch + "', "}</span>
            <span>es:</span>
          </p>
          <p>
            <span
              id="maquina_escribir"
              className={`bg-gray-200 p-2 rounded italic maquina_escribir`}
              style={{
                '--length_steps': phraseResponseLength,
                '--length_width': phraseResponseLength + 'ch',
              }}
            >
              {textResponse.name + ' - ' + textResponse.author}
            </span>
          </p>
        </div>
      ) : textStatus == 'Error' ? (
        <div>
          <p className="text-red-400">
            {textResponse.error}, te propongo:
          </p>
          <p
            className="bg-gray-200 p-2 rounded maquina_escribir"
            style={{
              '--length_steps': phraseResponseLength,
              '--length_width': phraseResponseLength + 'ch',
            }}
          >
            {textResponse.name} -{' '}
            <span className="italic">{textResponse.author}</span>
          </p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

PhraseResponse.propTypes = {
  textResponse: PropTypes.object,
  textStatus: PropTypes.string,
  currentSearch: PropTypes.string,
  phraseResponseLength: PropTypes.number,
}

export default PhraseResponse
