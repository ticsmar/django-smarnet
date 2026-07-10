"""Exception-to-HTTP status mapping types and helpers."""

ExceptionStatusMap = dict[type[Exception], tuple[int, str | None]]


def merge_exception_maps(*maps: ExceptionStatusMap) -> ExceptionStatusMap:
    combined: ExceptionStatusMap = {}
    for mapping in maps:
        combined.update(mapping)
    return combined
