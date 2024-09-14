export interface UseCaseCommand<InputDto, OutputDto> {
  execute(input: InputDto): Promise<OutputDto>;
}
