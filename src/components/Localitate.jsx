import { Tooltip } from '@chakra-ui/tooltip';

const Localitate = ({ className, fill, onClick, d, strokeWidth }) => {
  return fill === 'red' ? (
    <Tooltip label={className} placement="top" defaultIsOpen>
      <path
        className={className}
        fill={fill}
        onClick={onClick}
        d={d}
        stroke-width={strokeWidth}
      />
    </Tooltip>
  ) : (
    <path
      className={className}
      fill={fill}
      onClick={onClick}
      d={d}
      stroke-width={strokeWidth}
    />
  );
};

export default Localitate;
