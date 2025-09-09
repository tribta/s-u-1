// @ts-nocheck
import { Link, router, useForm } from '@inertiajs/react';

export default function Index({ links, q, base }) {
    const { data, setData, post, processing, reset } = useForm({ long_url: '' });

    const submit = (e) => {
        e.preventDefault();
        post('/links', {
            // was: route('links.store')
            onSuccess: () => reset('long_url'),
        });
    };

    const onSearch = (e) => {
        e.preventDefault();
        const val = new FormData(e.currentTarget).get('q') || '';
        router.get(
            '/',
            { q: val },
            {
                // was: route('links.index')
                preserveState: true,
            },
        );
    };

    return (
        <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'system-ui' }}>
            <h1>URL Shortener</h1>

            <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
                <input
                    style={{ flex: 1, padding: 8 }}
                    type="url"
                    placeholder="https://example.com/very/long/url"
                    value={data.long_url}
                    onChange={(e) => setData('long_url', e.target.value)}
                    required
                />
                <button disabled={processing} type="submit">
                    Shorten
                </button>
            </form>

            <form onSubmit={onSearch} style={{ marginTop: 16 }}>
                <input defaultValue={q ?? ''} name="q" placeholder="Search long URL..." />
                <button type="submit" style={{ marginLeft: 8 }}>
                    Search
                </button>
            </form>

            <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left' }}>Short</th>
                        <th style={{ textAlign: 'left' }}>Long URL</th>
                        <th>Clicks</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {links.data.map((l) => (
                        <tr key={l.id}>
                            <td>
                                <a href={`${base}/r/${l.code}`} target="_blank" rel="noreferrer">
                                    {base}/r/{l.code}
                                </a>
                            </td>
                            <td style={{ wordBreak: 'break-all' }}>{l.long_url}</td>
                            <td style={{ textAlign: 'center' }}>{l.clicks}</td>
                            <td style={{ textAlign: 'right' }}>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        router.delete(`/links/${l.id}`); // was: route('links.destroy', l.id)
                                    }}
                                >
                                    <button>Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination đơn giản */}
            <div style={{ marginTop: 12 }}>
                {links.links.map((p, i) =>
                    p.url ? (
                        <Link key={i} href={p.url} preserveScroll>
                            <span style={{ marginRight: 8, fontWeight: p.active ? 'bold' : 'normal' }}>
                                {p.label.replace('&laquo; Previous', '«').replace('Next &raquo;', '»')}
                            </span>
                        </Link>
                    ) : (
                        <span key={i} style={{ marginRight: 8, opacity: 0.5 }}>
                            {p.label}
                        </span>
                    ),
                )}
            </div>
        </div>
    );
}
