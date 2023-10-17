'use client'

function FormattedString({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
}

function CardUserTenders({ item }) {
  return <FormattedString content={item.description} />;
}

export default CardUserTenders