export const useFormatDuration = (value: number, format: Boolean = false) => {
		if (!format) return value;

		const minutes = Math.floor(value / 60);
		const seconds = Math.floor(value % 60)
			.toString()
			.padStart(2, "0")
			.replace("-", "");

		return `${minutes}m ${seconds}s`;
	};